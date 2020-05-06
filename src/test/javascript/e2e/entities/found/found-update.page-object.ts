import { element, by, ElementFinder } from 'protractor';

export default class FoundUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.found.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tripCodeInput: ElementFinder = element(by.css('input#found-tripCode'));
  dateFoundInput: ElementFinder = element(by.css('input#found-dateFound'));
  userCodeInput: ElementFinder = element(by.css('input#found-userCode'));
  descriptionInput: ElementFinder = element(by.css('input#found-description'));
  itemNameInput: ElementFinder = element(by.css('input#found-itemName'));
  isReturnedInput: ElementFinder = element(by.css('input#found-isReturned'));
  referenceCodeInput: ElementFinder = element(by.css('input#found-referenceCode'));
  areaCodeInput: ElementFinder = element(by.css('input#found-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#found-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#found-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setDateFoundInput(dateFound) {
    await this.dateFoundInput.sendKeys(dateFound);
  }

  async getDateFoundInput() {
    return this.dateFoundInput.getAttribute('value');
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setItemNameInput(itemName) {
    await this.itemNameInput.sendKeys(itemName);
  }

  async getItemNameInput() {
    return this.itemNameInput.getAttribute('value');
  }

  getIsReturnedInput() {
    return this.isReturnedInput;
  }
  async setReferenceCodeInput(referenceCode) {
    await this.referenceCodeInput.sendKeys(referenceCode);
  }

  async getReferenceCodeInput() {
    return this.referenceCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated) {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput() {
    return this.dateCreatedInput.getAttribute('value');
  }

  async setDateModifiedInput(dateModified) {
    await this.dateModifiedInput.sendKeys(dateModified);
  }

  async getDateModifiedInput() {
    return this.dateModifiedInput.getAttribute('value');
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
