import { element, by, ElementFinder } from 'protractor';

export default class DriverUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.driver.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusInput: ElementFinder = element(by.css('input#driver-status'));
  iSDrivingInput: ElementFinder = element(by.css('input#driver-iSDriving'));
  ontripInput: ElementFinder = element(by.css('input#driver-ontrip'));
  iSApprovedInput: ElementFinder = element(by.css('input#driver-iSApproved'));
  driverCodeInput: ElementFinder = element(by.css('input#driver-driverCode'));
  tripCountInput: ElementFinder = element(by.css('input#driver-tripCount'));
  areaCodeInput: ElementFinder = element(by.css('input#driver-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#driver-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#driver-dateModified'));
  latestLocationSelect: ElementFinder = element(by.css('select#driver-latestLocation'));
  myVehicleSelect: ElementFinder = element(by.css('select#driver-myVehicle'));
  mongoFileTypesSelect: ElementFinder = element(by.css('select#driver-mongoFileTypes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  getISDrivingInput() {
    return this.iSDrivingInput;
  }
  async setOntripInput(ontrip) {
    await this.ontripInput.sendKeys(ontrip);
  }

  async getOntripInput() {
    return this.ontripInput.getAttribute('value');
  }

  getISApprovedInput() {
    return this.iSApprovedInput;
  }
  async setDriverCodeInput(driverCode) {
    await this.driverCodeInput.sendKeys(driverCode);
  }

  async getDriverCodeInput() {
    return this.driverCodeInput.getAttribute('value');
  }

  async setTripCountInput(tripCount) {
    await this.tripCountInput.sendKeys(tripCount);
  }

  async getTripCountInput() {
    return this.tripCountInput.getAttribute('value');
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

  async myVehicleSelectLastOption() {
    await this.myVehicleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async myVehicleSelectOption(option) {
    await this.myVehicleSelect.sendKeys(option);
  }

  getMyVehicleSelect() {
    return this.myVehicleSelect;
  }

  async getMyVehicleSelectedOption() {
    return this.myVehicleSelect.element(by.css('option:checked')).getText();
  }

  async mongoFileTypesSelectLastOption() {
    await this.mongoFileTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mongoFileTypesSelectOption(option) {
    await this.mongoFileTypesSelect.sendKeys(option);
  }

  getMongoFileTypesSelect() {
    return this.mongoFileTypesSelect;
  }

  async getMongoFileTypesSelectedOption() {
    return this.mongoFileTypesSelect.element(by.css('option:checked')).getText();
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
