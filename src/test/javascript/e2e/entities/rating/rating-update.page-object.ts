import { element, by, ElementFinder } from 'protractor';

export default class RatingUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.rating.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#rating-userCode'));
  valueInput: ElementFinder = element(by.css('input#rating-value'));
  remarksInput: ElementFinder = element(by.css('input#rating-remarks'));
  dateCreatedInput: ElementFinder = element(by.css('input#rating-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#rating-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
