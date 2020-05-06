import { element, by, ElementFinder } from 'protractor';

export default class ReviewUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.review.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tripCodeInput: ElementFinder = element(by.css('input#review-tripCode'));
  userCodeInput: ElementFinder = element(by.css('input#review-userCode'));
  ratingInput: ElementFinder = element(by.css('input#review-rating'));
  areaCodeInput: ElementFinder = element(by.css('input#review-areaCode'));
  remarksInput: ElementFinder = element(by.css('input#review-remarks'));
  dateCreatedInput: ElementFinder = element(by.css('input#review-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#review-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#review-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#review-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#review-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#review-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return this.ratingInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
