import { element, by, ElementFinder } from 'protractor';

export default class UserLocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.userLocation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  latitudeInput: ElementFinder = element(by.css('input#user-location-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#user-location-longitude'));
  tripCodeInput: ElementFinder = element(by.css('input#user-location-tripCode'));
  userCodeInput: ElementFinder = element(by.css('input#user-location-userCode'));
  areaCodeInput: ElementFinder = element(by.css('input#user-location-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#user-location-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#user-location-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return this.longitudeInput.getAttribute('value');
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
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
