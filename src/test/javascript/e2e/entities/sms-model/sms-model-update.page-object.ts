import { element, by, ElementFinder } from 'protractor';

export default class SmsModelUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.smsModel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  phoneNumberInput: ElementFinder = element(by.css('input#sms-model-phoneNumber'));
  messageInput: ElementFinder = element(by.css('input#sms-model-message'));
  isSendInput: ElementFinder = element(by.css('input#sms-model-isSend'));
  dateCreatedInput: ElementFinder = element(by.css('input#sms-model-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#sms-model-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#sms-model-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#sms-model-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#sms-model-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#sms-model-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
  }

  getIsSendInput() {
    return this.isSendInput;
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
