import Util from './Util';

class BuildingPermit {
  constructor(data) {
    this.type = (data.permit_type_description || '').replace(/^Building /i, '');
    if (this.type.indexOf(Util.categorySeparator) > -1) {
      this.category = this.type.split(Util.categorySeparator)[0];
    } else {
      this.category = 'Other';
    }
    this.subtype = data.permit_subtype_description;
    this.address = data.address || data.mapped_location_address;
    this.city = data.city || data.mapped_location_city;
    this.state = data.state || data.mapped_location_state;
    this.zipCode = data.zip || data.mapped_location_zip;
    this.contact = data.contact;
    this.councilDistrict = data.council_dist;
    this.dateIssued = new Date(data.date_issued);
    if (data.mapped_location) {
      this.latitude = data.mapped_location.coordinates[1];
      this.longitude = data.mapped_location.coordinates[0];
      this.position = [this.latitude, this.longitude];
    }
    this.permit = data.permit;
    this.subdivisionLot = data.subdivision_lot;
    this.purpose = data.purpose;
    this.key = `${this.permit}${this.address}${this.type}`;
  }

  matches(criteria) {
    const { zipCode, type } = criteria;
    return this.matchesZipCode(zipCode) && this.matchesType(type);
  }

  matchesType(type) {
    if (type.indexOf('all-') === 0) {
      const category = type.split('all-')[1];
      return this.category === category;
    }
    return this.type === type || type === 'all';
  }

  matchesZipCode(zipCode) {
    return this.zipCode === zipCode || zipCode === 'all';
  }
}

export default BuildingPermit;
