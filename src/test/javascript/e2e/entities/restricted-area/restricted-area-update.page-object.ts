import { element, by, ElementFinder } from 'protractor';

export default class RestrictedAreaUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.restrictedArea.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#restricted-area-areaCode'));
  nameInput: ElementFinder = element(by.css('input#restricted-area-name'));
  northEastLatitudeInput: ElementFinder = element(by.css('input#restricted-area-northEastLatitude'));
  southWestLatitudeInput: ElementFinder = element(by.css('input#restricted-area-southWestLatitude'));
  northEastLongitudeInput: ElementFinder = element(by.css('input#restricted-area-northEastLongitude'));
  southWestLongitudeInput: ElementFinder = element(by.css('input#restricted-area-southWestLongitude'));
  vehicleTypeCodeInput: ElementFinder = element(by.css('input#restricted-area-vehicleTypeCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#restricted-area-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#restricted-area-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#restricted-area-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#restricted-area-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#restricted-area-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#restricted-area-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setNorthEastLatitudeInput(northEastLatitude) {
    await this.northEastLatitudeInput.sendKeys(northEastLatitude);
  }

  async getNorthEastLatitudeInput() {
    return this.northEastLatitudeInput.getAttribute('value');
  }

  async setSouthWestLatitudeInput(southWestLatitude) {
    await this.southWestLatitudeInput.sendKeys(southWestLatitude);
  }

  async getSouthWestLatitudeInput() {
    return this.southWestLatitudeInput.getAttribute('value');
  }

  async setNorthEastLongitudeInput(northEastLongitude) {
    await this.northEastLongitudeInput.sendKeys(northEastLongitude);
  }

  async getNorthEastLongitudeInput() {
    return this.northEastLongitudeInput.getAttribute('value');
  }

  async setSouthWestLongitudeInput(southWestLongitude) {
    await this.southWestLongitudeInput.sendKeys(southWestLongitude);
  }

  async getSouthWestLongitudeInput() {
    return this.southWestLongitudeInput.getAttribute('value');
  }

  async setVehicleTypeCodeInput(vehicleTypeCode) {
    await this.vehicleTypeCodeInput.sendKeys(vehicleTypeCode);
  }

  async getVehicleTypeCodeInput() {
    return this.vehicleTypeCodeInput.getAttribute('value');
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
