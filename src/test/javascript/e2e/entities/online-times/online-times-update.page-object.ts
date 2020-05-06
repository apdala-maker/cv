import { element, by, ElementFinder } from 'protractor';

export default class OnlineTimesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.onlineTimes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startInput: ElementFinder = element(by.css('input#online-times-start'));
  finishInput: ElementFinder = element(by.css('input#online-times-finish'));
  driverCodeInput: ElementFinder = element(by.css('input#online-times-driverCode'));
  areaCodeInput: ElementFinder = element(by.css('input#online-times-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#online-times-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#online-times-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async setFinishInput(finish) {
    await this.finishInput.sendKeys(finish);
  }

  async getFinishInput() {
    return this.finishInput.getAttribute('value');
  }

  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
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
