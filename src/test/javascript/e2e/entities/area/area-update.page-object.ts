import { element, by, ElementFinder } from 'protractor';

export default class AreaUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.area.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryCodeInput: ElementFinder = element(by.css('input#area-countryCode'));
  areaCodeInput: ElementFinder = element(by.css('input#area-areaCode'));
  addressInput: ElementFinder = element(by.css('input#area-address'));
  nameInput: ElementFinder = element(by.css('input#area-name'));
  northEastLatitudeInput: ElementFinder = element(by.css('input#area-northEastLatitude'));
  southWestLatitudeInput: ElementFinder = element(by.css('input#area-southWestLatitude'));
  northEastLongitudeInput: ElementFinder = element(by.css('input#area-northEastLongitude'));
  southWestLongitudeInput: ElementFinder = element(by.css('input#area-southWestLongitude'));
  isActiveInput: ElementFinder = element(by.css('input#area-isActive'));
  isApprovedInput: ElementFinder = element(by.css('input#area-isApproved'));
  approvedByInput: ElementFinder = element(by.css('input#area-approvedBy'));
  activatedByInput: ElementFinder = element(by.css('input#area-activatedBy'));
  dateCreatedInput: ElementFinder = element(by.css('input#area-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#area-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#area-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#area-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#area-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#area-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
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

  getIsActiveInput() {
    return this.isActiveInput;
  }
  getIsApprovedInput() {
    return this.isApprovedInput;
  }
  async setApprovedByInput(approvedBy) {
    await this.approvedByInput.sendKeys(approvedBy);
  }

  async getApprovedByInput() {
    return this.approvedByInput.getAttribute('value');
  }

  async setActivatedByInput(activatedBy) {
    await this.activatedByInput.sendKeys(activatedBy);
  }

  async getActivatedByInput() {
    return this.activatedByInput.getAttribute('value');
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
