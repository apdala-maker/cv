import { element, by, ElementFinder } from 'protractor';

export default class PassengerUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.passenger.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusInput: ElementFinder = element(by.css('input#passenger-status'));
  passengerCodeInput: ElementFinder = element(by.css('input#passenger-passengerCode'));
  areaCodeInput: ElementFinder = element(by.css('input#passenger-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#passenger-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#passenger-dateModified'));
  latestLocationSelect: ElementFinder = element(by.css('select#passenger-latestLocation'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setPassengerCodeInput(passengerCode) {
    await this.passengerCodeInput.sendKeys(passengerCode);
  }

  async getPassengerCodeInput() {
    return this.passengerCodeInput.getAttribute('value');
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

  async latestLocationSelectLastOption() {
    await this.latestLocationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async latestLocationSelectOption(option) {
    await this.latestLocationSelect.sendKeys(option);
  }

  getLatestLocationSelect() {
    return this.latestLocationSelect;
  }

  async getLatestLocationSelectedOption() {
    return this.latestLocationSelect.element(by.css('option:checked')).getText();
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
