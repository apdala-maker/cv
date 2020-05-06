import { element, by, ElementFinder } from 'protractor';

export default class AreaFileTypesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.areaFileTypes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#area-file-types-code'));
  areaCodeInput: ElementFinder = element(by.css('input#area-file-types-areaCode'));
  isManadatoryInput: ElementFinder = element(by.css('input#area-file-types-isManadatory'));
  descriptionInput: ElementFinder = element(by.css('input#area-file-types-description'));
  hasExpiryInput: ElementFinder = element(by.css('input#area-file-types-hasExpiry'));
  dateCreatedInput: ElementFinder = element(by.css('input#area-file-types-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#area-file-types-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#area-file-types-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#area-file-types-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#area-file-types-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#area-file-types-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  getIsManadatoryInput() {
    return this.isManadatoryInput;
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  getHasExpiryInput() {
    return this.hasExpiryInput;
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
