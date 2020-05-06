import { element, by, ElementFinder } from 'protractor';

export default class PromoCodesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.promoCodes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#promo-codes-code'));
  startHourInput: ElementFinder = element(by.css('input#promo-codes-startHour'));
  endHourInput: ElementFinder = element(by.css('input#promo-codes-endHour'));
  dateCreatedInput: ElementFinder = element(by.css('input#promo-codes-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#promo-codes-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#promo-codes-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#promo-codes-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#promo-codes-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#promo-codes-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setStartHourInput(startHour) {
    await this.startHourInput.sendKeys(startHour);
  }

  async getStartHourInput() {
    return this.startHourInput.getAttribute('value');
  }

  async setEndHourInput(endHour) {
    await this.endHourInput.sendKeys(endHour);
  }

  async getEndHourInput() {
    return this.endHourInput.getAttribute('value');
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
