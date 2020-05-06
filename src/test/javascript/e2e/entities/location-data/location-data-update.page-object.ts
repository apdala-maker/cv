import { element, by, ElementFinder } from 'protractor';

export default class LocationDataUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.locationData.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  latitudeInput: ElementFinder = element(by.css('input#location-data-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#location-data-longitude'));
  bearingInput: ElementFinder = element(by.css('input#location-data-bearing'));

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

  async setBearingInput(bearing) {
    await this.bearingInput.sendKeys(bearing);
  }

  async getBearingInput() {
    return this.bearingInput.getAttribute('value');
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
