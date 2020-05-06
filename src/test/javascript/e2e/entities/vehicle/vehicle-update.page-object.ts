import { element, by, ElementFinder } from 'protractor';

export default class VehicleUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.vehicle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  modelNameInput: ElementFinder = element(by.css('input#vehicle-modelName'));
  modelCodeInput: ElementFinder = element(by.css('input#vehicle-modelCode'));
  makeCodeInput: ElementFinder = element(by.css('input#vehicle-makeCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#vehicle-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#vehicle-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#vehicle-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#vehicle-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#vehicle-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#vehicle-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setModelNameInput(modelName) {
    await this.modelNameInput.sendKeys(modelName);
  }

  async getModelNameInput() {
    return this.modelNameInput.getAttribute('value');
  }

  async setModelCodeInput(modelCode) {
    await this.modelCodeInput.sendKeys(modelCode);
  }

  async getModelCodeInput() {
    return this.modelCodeInput.getAttribute('value');
  }

  async setMakeCodeInput(makeCode) {
    await this.makeCodeInput.sendKeys(makeCode);
  }

  async getMakeCodeInput() {
    return this.makeCodeInput.getAttribute('value');
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
