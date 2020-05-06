import { element, by, ElementFinder } from 'protractor';

export default class LostUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.lost.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tripCodeInput: ElementFinder = element(by.css('input#lost-tripCode'));
  dateLostInput: ElementFinder = element(by.css('input#lost-dateLost'));
  userCodeInput: ElementFinder = element(by.css('input#lost-userCode'));
  descriptionInput: ElementFinder = element(by.css('input#lost-description'));
  itemNameInput: ElementFinder = element(by.css('input#lost-itemName'));
  isFoundInput: ElementFinder = element(by.css('input#lost-isFound'));
  referenceCodeInput: ElementFinder = element(by.css('input#lost-referenceCode'));
  areaCodeInput: ElementFinder = element(by.css('input#lost-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#lost-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#lost-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTripCodeInput(tripCode) {
    await this.tripCodeInput.sendKeys(tripCode);
  }

  async getTripCodeInput() {
    return this.tripCodeInput.getAttribute('value');
  }

  async setDateLostInput(dateLost) {
    await this.dateLostInput.sendKeys(dateLost);
  }

  async getDateLostInput() {
    return this.dateLostInput.getAttribute('value');
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

  getIsFoundInput() {
    return this.isFoundInput;
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
