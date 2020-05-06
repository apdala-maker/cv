import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryNameInput: ElementFinder = element(by.css('input#country-countryName'));
  countryCodeInput: ElementFinder = element(by.css('input#country-countryCode'));
  currencyNameInput: ElementFinder = element(by.css('input#country-currencyName'));
  currencyCodeInput: ElementFinder = element(by.css('input#country-currencyCode'));
  currencySymbolInput: ElementFinder = element(by.css('input#country-currencySymbol'));
  languageInput: ElementFinder = element(by.css('input#country-language'));
  timeZoneInput: ElementFinder = element(by.css('input#country-timeZone'));
  dateCreatedInput: ElementFinder = element(by.css('input#country-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#country-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#country-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#country-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#country-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#country-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryNameInput(countryName) {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput() {
    return this.countryNameInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setCurrencyNameInput(currencyName) {
    await this.currencyNameInput.sendKeys(currencyName);
  }

  async getCurrencyNameInput() {
    return this.currencyNameInput.getAttribute('value');
  }

  async setCurrencyCodeInput(currencyCode) {
    await this.currencyCodeInput.sendKeys(currencyCode);
  }

  async getCurrencyCodeInput() {
    return this.currencyCodeInput.getAttribute('value');
  }

  async setCurrencySymbolInput(currencySymbol) {
    await this.currencySymbolInput.sendKeys(currencySymbol);
  }

  async getCurrencySymbolInput() {
    return this.currencySymbolInput.getAttribute('value');
  }

  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return this.languageInput.getAttribute('value');
  }

  async setTimeZoneInput(timeZone) {
    await this.timeZoneInput.sendKeys(timeZone);
  }

  async getTimeZoneInput() {
    return this.timeZoneInput.getAttribute('value');
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
