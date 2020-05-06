import { element, by, ElementFinder } from 'protractor';

export default class TripQueueUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.tripQueue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tripCodeInput: ElementFinder = element(by.css('input#trip-queue-tripCode'));
  driverCodeInput: ElementFinder = element(by.css('input#trip-queue-driverCode'));
  passengerCodeInput: ElementFinder = element(by.css('input#trip-queue-passengerCode'));
  statusInput: ElementFinder = element(by.css('input#trip-queue-status'));
  areaCodeInput: ElementFinder = element(by.css('input#trip-queue-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#trip-queue-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#trip-queue-dateModified'));

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
