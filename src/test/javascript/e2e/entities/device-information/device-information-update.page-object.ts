import { element, by, ElementFinder } from 'protractor';

export default class DeviceInformationUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.deviceInformation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#device-information-userCode'));
  userTypeInput: ElementFinder = element(by.css('input#device-information-userType'));
  modelInput: ElementFinder = element(by.css('input#device-information-model'));
  nameInput: ElementFinder = element(by.css('input#device-information-name'));
  widthInput: ElementFinder = element(by.css('input#device-information-width'));
  lengthInput: ElementFinder = element(by.css('input#device-information-length'));
  oSInput: ElementFinder = element(by.css('input#device-information-oS'));
  manufacturerInput: ElementFinder = element(by.css('input#device-information-manufacturer'));
  deviceIdInput: ElementFinder = element(by.css('input#device-information-deviceId'));
  osVersionInput: ElementFinder = element(by.css('input#device-information-osVersion'));
  brandInput: ElementFinder = element(by.css('input#device-information-brand'));
  screenSizeInput: ElementFinder = element(by.css('input#device-information-screenSize'));
  serialInput: ElementFinder = element(by.css('input#device-information-serial'));
  areaCodeInput: ElementFinder = element(by.css('input#device-information-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#device-information-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#device-information-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setUserTypeInput(userType) {
    await this.userTypeInput.sendKeys(userType);
  }

  async getUserTypeInput() {
    return this.userTypeInput.getAttribute('value');
  }

  async setModelInput(model) {
    await this.modelInput.sendKeys(model);
  }

  async getModelInput() {
    return this.modelInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setWidthInput(width) {
    await this.widthInput.sendKeys(width);
  }

  async getWidthInput() {
    return this.widthInput.getAttribute('value');
  }

  async setLengthInput(length) {
    await this.lengthInput.sendKeys(length);
  }

  async getLengthInput() {
    return this.lengthInput.getAttribute('value');
  }

  async setOSInput(oS) {
    await this.oSInput.sendKeys(oS);
  }

  async getOSInput() {
    return this.oSInput.getAttribute('value');
  }

  async setManufacturerInput(manufacturer) {
    await this.manufacturerInput.sendKeys(manufacturer);
  }

  async getManufacturerInput() {
    return this.manufacturerInput.getAttribute('value');
  }

  async setDeviceIdInput(deviceId) {
    await this.deviceIdInput.sendKeys(deviceId);
  }

  async getDeviceIdInput() {
    return this.deviceIdInput.getAttribute('value');
  }

  async setOsVersionInput(osVersion) {
    await this.osVersionInput.sendKeys(osVersion);
  }

  async getOsVersionInput() {
    return this.osVersionInput.getAttribute('value');
  }

  async setBrandInput(brand) {
    await this.brandInput.sendKeys(brand);
  }

  async getBrandInput() {
    return this.brandInput.getAttribute('value');
  }

  async setScreenSizeInput(screenSize) {
    await this.screenSizeInput.sendKeys(screenSize);
  }

  async getScreenSizeInput() {
    return this.screenSizeInput.getAttribute('value');
  }

  async setSerialInput(serial) {
    await this.serialInput.sendKeys(serial);
  }

  async getSerialInput() {
    return this.serialInput.getAttribute('value');
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
