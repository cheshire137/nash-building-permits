import Util from './Util';

const categoryIcons = {
  Commercial: 'briefcase',
  Residential: 'home',
  Other: 'more',
  Repair: 'hammer',
  Demolition: 'trash-a',
  Tree: 'leaf',
  Pool: 'waterdrop',
  Restaurant: 'pizza'
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

  typeContains(word) {
    return this.type.toLowerCase().split(/\s+/).indexOf(word) > -1;
  }

  subtypeContains(word) {
    return this.subtype.toLowerCase().split(/\s+/).indexOf(word) > -1;
  }

  isRepair() {
    return this.typeContains('rehab') || this.typeContains('addition') ||
      this.typeContains('roofing') || this.typeContains('fire') ||
      this.typeContains('siding');
  }

  isDemolition() {
    return this.typeContains('demolition');
  }

  isTree() {
    return this.typeContains('tree');
  }

  isPool() {
    return this.subtypeContains('pool') || this.subtypeContains('pools');
  }

  isRestaurant() {
    return this.subtypeContains('restaurant');
  }

  isCar() {
    return this.subtypeContains('carport') || this.subtypeContains('garage');
  }

  icon() {
    if (this.isRestaurant()) {
      return categoryIcons.Restaurant;
    }
    if (this.isTree()) {
      return categoryIcons.Tree;
    }
    if (this.isPool()) {
      return categoryIcons.Pool;
    }
    if (this.isRepair()) {
      return categoryIcons.Repair;
    }
    if (this.isDemolition()) {
      return categoryIcons.Demolition;
    }
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
