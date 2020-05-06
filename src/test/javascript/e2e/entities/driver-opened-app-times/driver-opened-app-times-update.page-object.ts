import { element, by, ElementFinder } from 'protractor';

export default class DriverOpenedAppTimesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.driverOpenedAppTimes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  driverCodeInput: ElementFinder = element(by.css('input#driver-opened-app-times-driverCode'));
  dateOpenedInput: ElementFinder = element(by.css('input#driver-opened-app-times-dateOpened'));
  tripCountInput: ElementFinder = element(by.css('input#driver-opened-app-times-tripCount'));
  areaCodeInput: ElementFinder = element(by.css('input#driver-opened-app-times-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#driver-opened-app-times-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#driver-opened-app-times-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setDateOpenedInput(dateOpened) {
    await this.dateOpenedInput.sendKeys(dateOpened);
  }

  async getDateOpenedInput() {
    return this.dateOpenedInput.getAttribute('value');
  }

  async setTripCountInput(tripCount) {
    await this.tripCountInput.sendKeys(tripCount);
  }

  async getTripCountInput() {
    return this.tripCountInput.getAttribute('value');
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
