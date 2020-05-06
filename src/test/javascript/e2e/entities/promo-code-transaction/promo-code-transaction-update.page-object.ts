import { element, by, ElementFinder } from 'protractor';

export default class PromoCodeTransactionUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.promoCodeTransaction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#promo-code-transaction-code'));
  recordNumberInput: ElementFinder = element(by.css('input#promo-code-transaction-recordNumber'));
  customerCodeInput: ElementFinder = element(by.css('input#promo-code-transaction-customerCode'));
  driverCodeInput: ElementFinder = element(by.css('input#promo-code-transaction-driverCode'));
  debitInput: ElementFinder = element(by.css('input#promo-code-transaction-debit'));
  creditInput: ElementFinder = element(by.css('input#promo-code-transaction-credit'));
  narrationInput: ElementFinder = element(by.css('input#promo-code-transaction-narration'));
  transactionReferenceInput: ElementFinder = element(by.css('input#promo-code-transaction-transactionReference'));
  transactionCodeInput: ElementFinder = element(by.css('input#promo-code-transaction-transactionCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#promo-code-transaction-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#promo-code-transaction-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#promo-code-transaction-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#promo-code-transaction-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#promo-code-transaction-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#promo-code-transaction-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setRecordNumberInput(recordNumber) {
    await this.recordNumberInput.sendKeys(recordNumber);
  }

  async getRecordNumberInput() {
    return this.recordNumberInput.getAttribute('value');
  }

  async setCustomerCodeInput(customerCode) {
    await this.customerCodeInput.sendKeys(customerCode);
  }

  async getCustomerCodeInput() {
    return this.customerCodeInput.getAttribute('value');
  }

  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setDebitInput(debit) {
    await this.debitInput.sendKeys(debit);
  }

  async getDebitInput() {
    return this.debitInput.getAttribute('value');
  }

  async setCreditInput(credit) {
    await this.creditInput.sendKeys(credit);
  }

  async getCreditInput() {
    return this.creditInput.getAttribute('value');
  }

  async setNarrationInput(narration) {
    await this.narrationInput.sendKeys(narration);
  }

  async getNarrationInput() {
    return this.narrationInput.getAttribute('value');
  }

  async setTransactionReferenceInput(transactionReference) {
    await this.transactionReferenceInput.sendKeys(transactionReference);
  }

  async getTransactionReferenceInput() {
    return this.transactionReferenceInput.getAttribute('value');
  }

  async setTransactionCodeInput(transactionCode) {
    await this.transactionCodeInput.sendKeys(transactionCode);
  }

  async getTransactionCodeInput() {
    return this.transactionCodeInput.getAttribute('value');
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
