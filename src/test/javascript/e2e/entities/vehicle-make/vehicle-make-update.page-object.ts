import { element, by, ElementFinder } from 'protractor';

export default class VehicleMakeUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.vehicleMake.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-make-description'));
  makeCodeInput: ElementFinder = element(by.css('input#vehicle-make-makeCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#vehicle-make-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#vehicle-make-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#vehicle-make-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#vehicle-make-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#vehicle-make-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#vehicle-make-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
