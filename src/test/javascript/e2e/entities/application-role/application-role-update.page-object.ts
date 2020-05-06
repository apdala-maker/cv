import { element, by, ElementFinder } from 'protractor';

export default class ApplicationRoleUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.applicationRole.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accessInput: ElementFinder = element(by.css('input#application-role-access'));
  dateCreatedInput: ElementFinder = element(by.css('input#application-role-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#application-role-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#application-role-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#application-role-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#application-role-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#application-role-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccessInput(access) {
    await this.accessInput.sendKeys(access);
  }

  async getAccessInput() {
    return this.accessInput.getAttribute('value');
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
