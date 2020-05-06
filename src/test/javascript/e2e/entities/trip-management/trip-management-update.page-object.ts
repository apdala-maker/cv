import { element, by, ElementFinder } from 'protractor';

export default class TripManagementUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.tripManagement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#trip-management-areaCode'));
  startimeInput: ElementFinder = element(by.css('input#trip-management-startime'));
  endtimeInput: ElementFinder = element(by.css('input#trip-management-endtime'));
  startLongitudeInput: ElementFinder = element(by.css('input#trip-management-startLongitude'));
  startLatitudeInput: ElementFinder = element(by.css('input#trip-management-startLatitude'));
  distanceInput: ElementFinder = element(by.css('input#trip-management-distance'));
  tripCostInput: ElementFinder = element(by.css('input#trip-management-tripCost'));
  driverCodeInput: ElementFinder = element(by.css('input#trip-management-driverCode'));
  passengerCodeInput: ElementFinder = element(by.css('input#trip-management-passengerCode'));
  statusInput: ElementFinder = element(by.css('input#trip-management-status'));
  tripCodeInput: ElementFinder = element(by.css('input#trip-management-tripCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#trip-management-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#trip-management-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#trip-management-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#trip-management-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#trip-management-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#trip-management-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setStartimeInput(startime) {
    await this.startimeInput.sendKeys(startime);
  }

  async getStartimeInput() {
    return this.startimeInput.getAttribute('value');
  }

  async setEndtimeInput(endtime) {
    await this.endtimeInput.sendKeys(endtime);
  }

  async getEndtimeInput() {
    return this.endtimeInput.getAttribute('value');
  }

  async setStartLongitudeInput(startLongitude) {
    await this.startLongitudeInput.sendKeys(startLongitude);
  }

  async getStartLongitudeInput() {
    return this.startLongitudeInput.getAttribute('value');
  }

  async setStartLatitudeInput(startLatitude) {
    await this.startLatitudeInput.sendKeys(startLatitude);
  }

  async getStartLatitudeInput() {
    return this.startLatitudeInput.getAttribute('value');
  }

  async setDistanceInput(distance) {
    await this.distanceInput.sendKeys(distance);
  }

  async getDistanceInput() {
    return this.distanceInput.getAttribute('value');
  }

  async setTripCostInput(tripCost) {
    await this.tripCostInput.sendKeys(tripCost);
  }

  async getTripCostInput() {
    return this.tripCostInput.getAttribute('value');
  }

  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setPassengerCodeInput(passengerCode) {
    await this.passengerCodeInput.sendKeys(passengerCode);
  }

  async getPassengerCodeInput() {
    return this.passengerCodeInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated) {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput() {
    return this.dateCreatedInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  async setCreatorUserEmailInput(creatorUserEmail) {
    await this.creatorUserEmailInput.sendKeys(creatorUserEmail);
  }

  async getCreatorUserEmailInput() {
    return this.creatorUserEmailInput.getAttribute('value');
  }

  async setDateModifiedInput(dateModified) {
    await this.dateModifiedInput.sendKeys(dateModified);
  }

  async getDateModifiedInput() {
    return this.dateModifiedInput.getAttribute('value');
  }

  async setModifiedByInput(modifiedBy) {
    await this.modifiedByInput.sendKeys(modifiedBy);
  }

  async getModifiedByInput() {
    return this.modifiedByInput.getAttribute('value');
  }

  async setModifierUserEmailInput(modifierUserEmail) {
    await this.modifierUserEmailInput.sendKeys(modifierUserEmail);
  }

  async getModifierUserEmailInput() {
    return this.modifierUserEmailInput.getAttribute('value');
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
