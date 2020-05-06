import { element, by, ElementFinder } from 'protractor';

export default class VehicleDriverUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.vehicleDriver.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  modelCodeInput: ElementFinder = element(by.css('input#vehicle-driver-modelCode'));
  makeCodeInput: ElementFinder = element(by.css('input#vehicle-driver-makeCode'));
  vehicleTypeCodeInput: ElementFinder = element(by.css('input#vehicle-driver-vehicleTypeCode'));
  yearInput: ElementFinder = element(by.css('input#vehicle-driver-year'));
  registrationNumberInput: ElementFinder = element(by.css('input#vehicle-driver-registrationNumber'));
  colorInput: ElementFinder = element(by.css('input#vehicle-driver-color'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setModelCodeInput(modelCode) {
    await this.modelCodeInput.sendKeys(modelCode);
  }

  async getModelCodeInput() {
    return this.modelCodeInput.getAttribute('value');
  }

  async setMakeCodeInput(makeCode) {
    await this.makeCodeInput.sendKeys(makeCode);
  }

  async getMakeCodeInput() {
    return this.makeCodeInput.getAttribute('value');
  }

  async setVehicleTypeCodeInput(vehicleTypeCode) {
    await this.vehicleTypeCodeInput.sendKeys(vehicleTypeCode);
  }

  async getVehicleTypeCodeInput() {
    return this.vehicleTypeCodeInput.getAttribute('value');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return this.yearInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber) {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput() {
    return this.registrationNumberInput.getAttribute('value');
  }

  async setColorInput(color) {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput() {
    return this.colorInput.getAttribute('value');
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
