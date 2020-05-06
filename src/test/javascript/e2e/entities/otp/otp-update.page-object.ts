import { element, by, ElementFinder } from 'protractor';

export default class OTPUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.oTP.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  phoneNumberInput: ElementFinder = element(by.css('input#otp-phoneNumber'));
  userCodeInput: ElementFinder = element(by.css('input#otp-userCode'));
  areaCodeInput: ElementFinder = element(by.css('input#otp-areaCode'));
  oTPCodeInput: ElementFinder = element(by.css('input#otp-oTPCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#otp-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#otp-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
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

  async setOTPCodeInput(oTPCode) {
    await this.oTPCodeInput.sendKeys(oTPCode);
  }

  async getOTPCodeInput() {
    return this.oTPCodeInput.getAttribute('value');
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
