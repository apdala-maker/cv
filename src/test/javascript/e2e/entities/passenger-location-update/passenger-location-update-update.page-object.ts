import { element, by, ElementFinder } from 'protractor';

export default class PassengerLocationUpdateUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.passengerLocationUpdate.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  passengerCodeInput: ElementFinder = element(by.css('input#passenger-location-update-passengerCode'));
  startTimeInput: ElementFinder = element(by.css('input#passenger-location-update-startTime'));
  areaCodeInput: ElementFinder = element(by.css('input#passenger-location-update-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#passenger-location-update-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#passenger-location-update-dateModified'));
  locationDataSelect: ElementFinder = element(by.css('select#passenger-location-update-locationData'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPassengerCodeInput(passengerCode) {
    await this.passengerCodeInput.sendKeys(passengerCode);
  }

  async getPassengerCodeInput() {
    return this.passengerCodeInput.getAttribute('value');
  }

  async setStartTimeInput(startTime) {
    await this.startTimeInput.sendKeys(startTime);
  }

  async getStartTimeInput() {
    return this.startTimeInput.getAttribute('value');
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

  async locationDataSelectLastOption() {
    await this.locationDataSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locationDataSelectOption(option) {
    await this.locationDataSelect.sendKeys(option);
  }

  getLocationDataSelect() {
    return this.locationDataSelect;
  }

  async getLocationDataSelectedOption() {
    return this.locationDataSelect.element(by.css('option:checked')).getText();
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
