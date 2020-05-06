import { element, by, ElementFinder } from 'protractor';

export default class TripUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.trip.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tripCodeInput: ElementFinder = element(by.css('input#trip-tripCode'));
  driverCodeInput: ElementFinder = element(by.css('input#trip-driverCode'));
  vehicleCodeInput: ElementFinder = element(by.css('input#trip-vehicleCode'));
  tripStatusSelect: ElementFinder = element(by.css('select#trip-tripStatus'));
  dateEndedInput: ElementFinder = element(by.css('input#trip-dateEnded'));
  tripStartDateInput: ElementFinder = element(by.css('input#trip-tripStartDate'));
  arrivedDateInput: ElementFinder = element(by.css('input#trip-arrivedDate'));
  tripInitiatedDateInput: ElementFinder = element(by.css('input#trip-tripInitiatedDate'));
  passengerCodeInput: ElementFinder = element(by.css('input#trip-passengerCode'));
  pickUpLongitudeInput: ElementFinder = element(by.css('input#trip-pickUpLongitude'));
  pickUpLatitudeInput: ElementFinder = element(by.css('input#trip-pickUpLatitude'));
  dropOfLatitudeInput: ElementFinder = element(by.css('input#trip-dropOfLatitude'));
  dropOfLongitudeInput: ElementFinder = element(by.css('input#trip-dropOfLongitude'));
  projectedAmountInput: ElementFinder = element(by.css('input#trip-projectedAmount'));
  totalDistanceInMetresCoverdInput: ElementFinder = element(by.css('input#trip-totalDistanceInMetresCoverd'));
  actualAmountPaidInput: ElementFinder = element(by.css('input#trip-actualAmountPaid'));
  cancelledByInput: ElementFinder = element(by.css('input#trip-cancelledBy'));
  tripTypeSelect: ElementFinder = element(by.css('select#trip-tripType'));
  areaCodeInput: ElementFinder = element(by.css('input#trip-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#trip-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#trip-dateModified'));
  priceMongoModelSelect: ElementFinder = element(by.css('select#trip-priceMongoModel'));
  ratingSelect: ElementFinder = element(by.css('select#trip-rating'));
  stopsSelect: ElementFinder = element(by.css('select#trip-stops'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setVehicleCodeInput(vehicleCode) {
    await this.vehicleCodeInput.sendKeys(vehicleCode);
  }

  async getVehicleCodeInput() {
    return this.vehicleCodeInput.getAttribute('value');
  }

  async setTripStatusSelect(tripStatus) {
    await this.tripStatusSelect.sendKeys(tripStatus);
  }

  async getTripStatusSelect() {
    return this.tripStatusSelect.element(by.css('option:checked')).getText();
  }

  async tripStatusSelectLastOption() {
    await this.tripStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDateEndedInput(dateEnded) {
    await this.dateEndedInput.sendKeys(dateEnded);
  }

  async getDateEndedInput() {
    return this.dateEndedInput.getAttribute('value');
  }

  async setTripStartDateInput(tripStartDate) {
    await this.tripStartDateInput.sendKeys(tripStartDate);
  }

  async getTripStartDateInput() {
    return this.tripStartDateInput.getAttribute('value');
  }

  async setArrivedDateInput(arrivedDate) {
    await this.arrivedDateInput.sendKeys(arrivedDate);
  }

  async getArrivedDateInput() {
    return this.arrivedDateInput.getAttribute('value');
  }

  async setTripInitiatedDateInput(tripInitiatedDate) {
    await this.tripInitiatedDateInput.sendKeys(tripInitiatedDate);
  }

  async getTripInitiatedDateInput() {
    return this.tripInitiatedDateInput.getAttribute('value');
  }

  async setPassengerCodeInput(passengerCode) {
    await this.passengerCodeInput.sendKeys(passengerCode);
  }

  async getPassengerCodeInput() {
    return this.passengerCodeInput.getAttribute('value');
  }

  async setPickUpLongitudeInput(pickUpLongitude) {
    await this.pickUpLongitudeInput.sendKeys(pickUpLongitude);
  }

  async getPickUpLongitudeInput() {
    return this.pickUpLongitudeInput.getAttribute('value');
  }

  async setPickUpLatitudeInput(pickUpLatitude) {
    await this.pickUpLatitudeInput.sendKeys(pickUpLatitude);
  }

  async getPickUpLatitudeInput() {
    return this.pickUpLatitudeInput.getAttribute('value');
  }

  async setDropOfLatitudeInput(dropOfLatitude) {
    await this.dropOfLatitudeInput.sendKeys(dropOfLatitude);
  }

  async getDropOfLatitudeInput() {
    return this.dropOfLatitudeInput.getAttribute('value');
  }

  async setDropOfLongitudeInput(dropOfLongitude) {
    await this.dropOfLongitudeInput.sendKeys(dropOfLongitude);
  }

  async getDropOfLongitudeInput() {
    return this.dropOfLongitudeInput.getAttribute('value');
  }

  async setProjectedAmountInput(projectedAmount) {
    await this.projectedAmountInput.sendKeys(projectedAmount);
  }

  async getProjectedAmountInput() {
    return this.projectedAmountInput.getAttribute('value');
  }

  async setTotalDistanceInMetresCoverdInput(totalDistanceInMetresCoverd) {
    await this.totalDistanceInMetresCoverdInput.sendKeys(totalDistanceInMetresCoverd);
  }

  async getTotalDistanceInMetresCoverdInput() {
    return this.totalDistanceInMetresCoverdInput.getAttribute('value');
  }

  async setActualAmountPaidInput(actualAmountPaid) {
    await this.actualAmountPaidInput.sendKeys(actualAmountPaid);
  }

  async getActualAmountPaidInput() {
    return this.actualAmountPaidInput.getAttribute('value');
  }

  async setCancelledByInput(cancelledBy) {
    await this.cancelledByInput.sendKeys(cancelledBy);
  }

  async getCancelledByInput() {
    return this.cancelledByInput.getAttribute('value');
  }

  async setTripTypeSelect(tripType) {
    await this.tripTypeSelect.sendKeys(tripType);
  }

  async getTripTypeSelect() {
    return this.tripTypeSelect.element(by.css('option:checked')).getText();
  }

  async tripTypeSelectLastOption() {
    await this.tripTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated) {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput() {
    return this.dateCreatedInput.getAttribute('value');
  }

  async setDateModifiedInput(dateModified) {
    await this.dateModifiedInput.sendKeys(dateModified);
  }

  async getDateModifiedInput() {
    return this.dateModifiedInput.getAttribute('value');
  }

  async priceMongoModelSelectLastOption() {
    await this.priceMongoModelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async priceMongoModelSelectOption(option) {
    await this.priceMongoModelSelect.sendKeys(option);
  }

  getPriceMongoModelSelect() {
    return this.priceMongoModelSelect;
  }

  async getPriceMongoModelSelectedOption() {
    return this.priceMongoModelSelect.element(by.css('option:checked')).getText();
  }

  async ratingSelectLastOption() {
    await this.ratingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ratingSelectOption(option) {
    await this.ratingSelect.sendKeys(option);
  }

  getRatingSelect() {
    return this.ratingSelect;
  }

  async getRatingSelectedOption() {
    return this.ratingSelect.element(by.css('option:checked')).getText();
  }

  async stopsSelectLastOption() {
    await this.stopsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stopsSelectOption(option) {
    await this.stopsSelect.sendKeys(option);
  }

  getStopsSelect() {
    return this.stopsSelect;
  }

  async getStopsSelectedOption() {
    return this.stopsSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
