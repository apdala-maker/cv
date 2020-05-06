import { element, by, ElementFinder } from 'protractor';

export default class TimeLimitsUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.timeLimits.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#time-limits-areaCode'));
  descriptionInput: ElementFinder = element(by.css('input#time-limits-description'));
  codeInput: ElementFinder = element(by.css('input#time-limits-code'));
  categoryInput: ElementFinder = element(by.css('input#time-limits-category'));
  startHourInput: ElementFinder = element(by.css('input#time-limits-startHour'));
  startMinuteInput: ElementFinder = element(by.css('input#time-limits-startMinute'));
  endHourInput: ElementFinder = element(by.css('input#time-limits-endHour'));
  endMinuteInput: ElementFinder = element(by.css('input#time-limits-endMinute'));
  dateCreatedInput: ElementFinder = element(by.css('input#time-limits-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#time-limits-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#time-limits-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#time-limits-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#time-limits-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#time-limits-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return this.categoryInput.getAttribute('value');
  }

  async setStartHourInput(startHour) {
    await this.startHourInput.sendKeys(startHour);
  }

  async getStartHourInput() {
    return this.startHourInput.getAttribute('value');
  }

  async setStartMinuteInput(startMinute) {
    await this.startMinuteInput.sendKeys(startMinute);
  }

  async getStartMinuteInput() {
    return this.startMinuteInput.getAttribute('value');
  }

  async setEndHourInput(endHour) {
    await this.endHourInput.sendKeys(endHour);
  }

  async getEndHourInput() {
    return this.endHourInput.getAttribute('value');
  }

  async setEndMinuteInput(endMinute) {
    await this.endMinuteInput.sendKeys(endMinute);
  }

  async getEndMinuteInput() {
    return this.endMinuteInput.getAttribute('value');
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
