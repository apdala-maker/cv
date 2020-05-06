import { element, by, ElementFinder } from 'protractor';

export default class ChartOfAccountsGroupUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.chartOfAccountsGroup.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#chart-of-accounts-group-code'));
  accountTypeInput: ElementFinder = element(by.css('input#chart-of-accounts-group-accountType'));
  descriptionInput: ElementFinder = element(by.css('input#chart-of-accounts-group-description'));
  dateCreatedInput: ElementFinder = element(by.css('input#chart-of-accounts-group-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#chart-of-accounts-group-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#chart-of-accounts-group-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#chart-of-accounts-group-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#chart-of-accounts-group-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#chart-of-accounts-group-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setAccountTypeInput(accountType) {
    await this.accountTypeInput.sendKeys(accountType);
  }

  async getAccountTypeInput() {
    return this.accountTypeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
