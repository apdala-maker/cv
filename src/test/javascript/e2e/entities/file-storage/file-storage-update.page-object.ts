import { element, by, ElementFinder } from 'protractor';

export default class FileStorageUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.fileStorage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fileNameInput: ElementFinder = element(by.css('input#file-storage-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#file-storage-fileType'));
  referenceCodeInput: ElementFinder = element(by.css('input#file-storage-referenceCode'));
  narrationInput: ElementFinder = element(by.css('input#file-storage-narration'));
  areaFileTypeCodeInput: ElementFinder = element(by.css('input#file-storage-areaFileTypeCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#file-storage-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#file-storage-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#file-storage-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#file-storage-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#file-storage-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#file-storage-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFileNameInput(fileName) {
    await this.fileNameInput.sendKeys(fileName);
  }

  async getFileNameInput() {
    return this.fileNameInput.getAttribute('value');
  }

  async setFileTypeInput(fileType) {
    await this.fileTypeInput.sendKeys(fileType);
  }

  async getFileTypeInput() {
    return this.fileTypeInput.getAttribute('value');
  }

  async setReferenceCodeInput(referenceCode) {
    await this.referenceCodeInput.sendKeys(referenceCode);
  }

  async getReferenceCodeInput() {
    return this.referenceCodeInput.getAttribute('value');
  }

  async setNarrationInput(narration) {
    await this.narrationInput.sendKeys(narration);
  }

  async getNarrationInput() {
    return this.narrationInput.getAttribute('value');
  }

  async setAreaFileTypeCodeInput(areaFileTypeCode) {
    await this.areaFileTypeCodeInput.sendKeys(areaFileTypeCode);
  }

  async getAreaFileTypeCodeInput() {
    return this.areaFileTypeCodeInput.getAttribute('value');
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
