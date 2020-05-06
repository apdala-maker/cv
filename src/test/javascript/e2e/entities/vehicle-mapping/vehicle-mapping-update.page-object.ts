import { element, by, ElementFinder } from 'protractor';

export default class VehicleMappingUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.vehicleMapping.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  makeCodeInput: ElementFinder = element(by.css('input#vehicle-mapping-makeCode'));
  userCodeInput: ElementFinder = element(by.css('input#vehicle-mapping-userCode'));
  modelCodeInput: ElementFinder = element(by.css('input#vehicle-mapping-modelCode'));
  yearInput: ElementFinder = element(by.css('input#vehicle-mapping-year'));
  registrationNumberInput: ElementFinder = element(by.css('input#vehicle-mapping-registrationNumber'));
  vehicleTypeCodeInput: ElementFinder = element(by.css('input#vehicle-mapping-vehicleTypeCode'));
  areaCodeInput: ElementFinder = element(by.css('input#vehicle-mapping-areaCode'));
  isApprovedInput: ElementFinder = element(by.css('input#vehicle-mapping-isApproved'));
  approvedByInput: ElementFinder = element(by.css('input#vehicle-mapping-approvedBy'));
  dateCreatedInput: ElementFinder = element(by.css('input#vehicle-mapping-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#vehicle-mapping-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#vehicle-mapping-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#vehicle-mapping-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#vehicle-mapping-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#vehicle-mapping-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMakeCodeInput(makeCode) {
    await this.makeCodeInput.sendKeys(makeCode);
  }

  async getMakeCodeInput() {
    return this.makeCodeInput.getAttribute('value');
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setModelCodeInput(modelCode) {
    await this.modelCodeInput.sendKeys(modelCode);
  }

  async getModelCodeInput() {
    return this.modelCodeInput.getAttribute('value');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return this.yearInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber) {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput() {
    return this.registrationNumberInput.getAttribute('value');
  }

  async setVehicleTypeCodeInput(vehicleTypeCode) {
    await this.vehicleTypeCodeInput.sendKeys(vehicleTypeCode);
  }

  async getVehicleTypeCodeInput() {
    return this.vehicleTypeCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
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
