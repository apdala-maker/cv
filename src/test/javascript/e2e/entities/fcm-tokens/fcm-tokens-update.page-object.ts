import { element, by, ElementFinder } from 'protractor';

export default class FcmTokensUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.fcmTokens.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#fcm-tokens-userCode'));
  tokenInput: ElementFinder = element(by.css('input#fcm-tokens-token'));
  isActiveInput: ElementFinder = element(by.css('input#fcm-tokens-isActive'));
  dateCreatedInput: ElementFinder = element(by.css('input#fcm-tokens-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#fcm-tokens-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#fcm-tokens-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#fcm-tokens-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#fcm-tokens-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#fcm-tokens-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setTokenInput(token) {
    await this.tokenInput.sendKeys(token);
  }

  async getTokenInput() {
    return this.tokenInput.getAttribute('value');
  }

  getIsActiveInput() {
    return this.isActiveInput;
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
