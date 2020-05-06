import { element, by, ElementFinder } from 'protractor';

export default class MongoFileTypesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.mongoFileTypes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fileNameInput: ElementFinder = element(by.css('input#mongo-file-types-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#mongo-file-types-fileType'));
  narrationInput: ElementFinder = element(by.css('input#mongo-file-types-narration'));
  areaFileTypeCodeInput: ElementFinder = element(by.css('input#mongo-file-types-areaFileTypeCode'));
  expiryDateInput: ElementFinder = element(by.css('input#mongo-file-types-expiryDate'));

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

  async setExpiryDateInput(expiryDate) {
    await this.expiryDateInput.sendKeys(expiryDate);
  }

  async getExpiryDateInput() {
    return this.expiryDateInput.getAttribute('value');
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
