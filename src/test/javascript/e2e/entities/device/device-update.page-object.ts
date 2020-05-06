import { element, by, ElementFinder } from 'protractor';

export default class DeviceUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.device.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#device-userCode'));
  deviceIdInput: ElementFinder = element(by.css('input#device-deviceId'));
  versionInput: ElementFinder = element(by.css('input#device-version'));
  modelInput: ElementFinder = element(by.css('input#device-model'));
  screenSizeInput: ElementFinder = element(by.css('input#device-screenSize'));
  manufactureInput: ElementFinder = element(by.css('input#device-manufacture'));
  macAddressesInput: ElementFinder = element(by.css('input#device-macAddresses'));
  dateCreatedInput: ElementFinder = element(by.css('input#device-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#device-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#device-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#device-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#device-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#device-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setDeviceIdInput(deviceId) {
    await this.deviceIdInput.sendKeys(deviceId);
  }

  async getDeviceIdInput() {
    return this.deviceIdInput.getAttribute('value');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return this.versionInput.getAttribute('value');
  }

  async setModelInput(model) {
    await this.modelInput.sendKeys(model);
  }

  async getModelInput() {
    return this.modelInput.getAttribute('value');
  }

  async setScreenSizeInput(screenSize) {
    await this.screenSizeInput.sendKeys(screenSize);
  }

  async getScreenSizeInput() {
    return this.screenSizeInput.getAttribute('value');
  }

  async setManufactureInput(manufacture) {
    await this.manufactureInput.sendKeys(manufacture);
  }

  async getManufactureInput() {
    return this.manufactureInput.getAttribute('value');
  }

  async setMacAddressesInput(macAddresses) {
    await this.macAddressesInput.sendKeys(macAddresses);
  }

  async getMacAddressesInput() {
    return this.macAddressesInput.getAttribute('value');
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
