import Util from './Util';

const categoryIcons = {
  Commercial: 'briefcase',
  Residential: 'home',
  Other: 'more'
};

const categoryMarkerColors = {
  Commercial: 'green',
  Residential: 'blue',
  Other: 'orange'
};

class BuildingPermit {
  constructor(data) {
    this.type = data.type || (data.permit_type_description || '').replace(/^Building /i, '');
    this.subtype = data.subtype || data.permit_subtype_description;
    this.address = data.address || data.mapped_location_address;
    this.city = data.city || data.mapped_location_city;
    this.state = data.state || data.mapped_location_state;
    this.zipCode = data.zipCode || data.zip || data.mapped_location_zip;
    this.contact = data.contact;
    this.councilDistrict = data.councilDistrict || data.council_dist;
    this.dateIssued = new Date(data.dateIssued || data.date_issued);
    if (data.latitude && data.longitude) {
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    } else if (data.mapped_location) {
      this.latitude = data.mapped_location.coordinates[1];
      this.longitude = data.mapped_location.coordinates[0];
    }
    this.permit = data.permit;
    this.subdivisionLot = data.subdivisionLot || data.subdivision_lot;
    this.purpose = data.purpose;
  }

  key() {
    return `${this.permit}${this.address}${this.type}${this.latitude}${this.longitude}${this.dateIssued}${this.purpose}${this.contact}${this.subtype}`;
  }

  category() {
    if (this.type.indexOf(Util.categorySeparator) > -1) {
      return this.type.split(Util.categorySeparator)[0];
    }
    return 'Other';
  }

  position() {
    if (this.latitude && this.longitude) {
      return [this.latitude, this.longitude];
    }
  }

  hasCoordinates() {
    return this.position();
  }

  icon() {
    return categoryIcons[this.category()];
  }

  year() {
    return this.dateIssued.getFullYear();
  }

  markerColor() {
    return categoryMarkerColors[this.category()];
  }

  matches(criteria) {
    const { zipCode, type, year } = criteria;
    return this.matchesZipCode(zipCode) && this.matchesType(type) && this.matchesYear(year);
  }

  matchesYear(year) {
    return (year && this.year().toString() === year) || year === 'all';
  }

  matchesType(type) {
    if (type.indexOf('all-') === 0) {
      const category = type.split('all-')[1];
      return this.category() === category;
    }
    return this.type === type || type === 'all';
  }

  matchesZipCode(zipCode) {
    return this.zipCode === zipCode || zipCode === 'all';
  }
}

export default BuildingPermit;
