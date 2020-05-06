import { element, by, ElementFinder } from 'protractor';

export default class JournalTransactionUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.journalTransaction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#journal-transaction-areaCode'));
  recordNumberInput: ElementFinder = element(by.css('input#journal-transaction-recordNumber'));
  driverCodeInput: ElementFinder = element(by.css('input#journal-transaction-driverCode'));
  debitInput: ElementFinder = element(by.css('input#journal-transaction-debit'));
  creditInput: ElementFinder = element(by.css('input#journal-transaction-credit'));
  transactionReferenceInput: ElementFinder = element(by.css('input#journal-transaction-transactionReference'));
  narrationInput: ElementFinder = element(by.css('input#journal-transaction-narration'));
  transactionDateInput: ElementFinder = element(by.css('input#journal-transaction-transactionDate'));
  batchNumberInput: ElementFinder = element(by.css('input#journal-transaction-batchNumber'));
  transactionCodeInput: ElementFinder = element(by.css('input#journal-transaction-transactionCode'));
  folioInput: ElementFinder = element(by.css('input#journal-transaction-folio'));
  hashCodeInput: ElementFinder = element(by.css('input#journal-transaction-hashCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#journal-transaction-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#journal-transaction-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#journal-transaction-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#journal-transaction-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#journal-transaction-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#journal-transaction-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setRecordNumberInput(recordNumber) {
    await this.recordNumberInput.sendKeys(recordNumber);
  }

  async getRecordNumberInput() {
    return this.recordNumberInput.getAttribute('value');
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

  async setTransactionReferenceInput(transactionReference) {
    await this.transactionReferenceInput.sendKeys(transactionReference);
  }

  async getTransactionReferenceInput() {
    return this.transactionReferenceInput.getAttribute('value');
  }

  async setNarrationInput(narration) {
    await this.narrationInput.sendKeys(narration);
  }

  async getNarrationInput() {
    return this.narrationInput.getAttribute('value');
  }

  async setTransactionDateInput(transactionDate) {
    await this.transactionDateInput.sendKeys(transactionDate);
  }

  async getTransactionDateInput() {
    return this.transactionDateInput.getAttribute('value');
  }

  async setBatchNumberInput(batchNumber) {
    await this.batchNumberInput.sendKeys(batchNumber);
  }

  async getBatchNumberInput() {
    return this.batchNumberInput.getAttribute('value');
  }

  async setTransactionCodeInput(transactionCode) {
    await this.transactionCodeInput.sendKeys(transactionCode);
  }

  async getTransactionCodeInput() {
    return this.transactionCodeInput.getAttribute('value');
  }

  async setFolioInput(folio) {
    await this.folioInput.sendKeys(folio);
  }

  async getFolioInput() {
    return this.folioInput.getAttribute('value');
  }

  async setHashCodeInput(hashCode) {
    await this.hashCodeInput.sendKeys(hashCode);
  }

  async getHashCodeInput() {
    return this.hashCodeInput.getAttribute('value');
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
