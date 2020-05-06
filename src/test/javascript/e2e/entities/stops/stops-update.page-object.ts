import { element, by, ElementFinder } from 'protractor';

export default class StopsUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.stops.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  latitudeInput: ElementFinder = element(by.css('input#stops-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#stops-longitude'));
  orderInput: ElementFinder = element(by.css('input#stops-order'));

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

  async setOrderInput(order) {
    await this.orderInput.sendKeys(order);
  }

  async getOrderInput() {
    return this.orderInput.getAttribute('value');
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
