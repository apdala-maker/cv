import { element, by, ElementFinder } from 'protractor';

export default class ChartOfAccountsUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.chartOfAccounts.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#chart-of-accounts-areaCode'));
  accountCodeInput: ElementFinder = element(by.css('input#chart-of-accounts-accountCode'));
  accountNameInput: ElementFinder = element(by.css('input#chart-of-accounts-accountName'));
  isCJAccountInput: ElementFinder = element(by.css('input#chart-of-accounts-isCJAccount'));
  cOAGroupCodeInput: ElementFinder = element(by.css('input#chart-of-accounts-cOAGroupCode'));
  systemPostedInput: ElementFinder = element(by.css('input#chart-of-accounts-systemPosted'));
  dateCreatedInput: ElementFinder = element(by.css('input#chart-of-accounts-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#chart-of-accounts-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#chart-of-accounts-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#chart-of-accounts-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#chart-of-accounts-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#chart-of-accounts-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setAccountCodeInput(accountCode) {
    await this.accountCodeInput.sendKeys(accountCode);
  }

  async getAccountCodeInput() {
    return this.accountCodeInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setIsCJAccountInput(isCJAccount) {
    await this.isCJAccountInput.sendKeys(isCJAccount);
  }

  async getIsCJAccountInput() {
    return this.isCJAccountInput.getAttribute('value');
  }

  async setCOAGroupCodeInput(cOAGroupCode) {
    await this.cOAGroupCodeInput.sendKeys(cOAGroupCode);
  }

  async getCOAGroupCodeInput() {
    return this.cOAGroupCodeInput.getAttribute('value');
  }

  async setSystemPostedInput(systemPosted) {
    await this.systemPostedInput.sendKeys(systemPosted);
  }

  async getSystemPostedInput() {
    return this.systemPostedInput.getAttribute('value');
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
