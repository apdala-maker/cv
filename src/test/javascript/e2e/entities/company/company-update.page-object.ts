import { element, by, ElementFinder } from 'protractor';

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  displayNameInput: ElementFinder = element(by.css('input#company-displayName'));
  legalOrTradingNameInput: ElementFinder = element(by.css('input#company-legalOrTradingName'));
  registrationNumberInput: ElementFinder = element(by.css('input#company-registrationNumber'));
  registrationDateInput: ElementFinder = element(by.css('input#company-registrationDate'));
  companyCodeInput: ElementFinder = element(by.css('input#company-companyCode'));
  areaCodeInput: ElementFinder = element(by.css('input#company-areaCode'));
  countyOrStateInput: ElementFinder = element(by.css('input#company-countyOrState'));
  postalCodeInput: ElementFinder = element(by.css('input#company-postalCode'));
  postalAddressInput: ElementFinder = element(by.css('input#company-postalAddress'));
  cityOrTownInput: ElementFinder = element(by.css('input#company-cityOrTown'));
  streetInput: ElementFinder = element(by.css('input#company-street'));
  buildingNameOrNumberInput: ElementFinder = element(by.css('input#company-buildingNameOrNumber'));
  primaryPhoneNumberInput: ElementFinder = element(by.css('input#company-primaryPhoneNumber'));
  secondaryPhoneNumberInput: ElementFinder = element(by.css('input#company-secondaryPhoneNumber'));
  emailAddressInput: ElementFinder = element(by.css('input#company-emailAddress'));
  websiteInput: ElementFinder = element(by.css('input#company-website'));
  dateCreatedInput: ElementFinder = element(by.css('input#company-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#company-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#company-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#company-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#company-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#company-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDisplayNameInput(displayName) {
    await this.displayNameInput.sendKeys(displayName);
  }

  async getDisplayNameInput() {
    return this.displayNameInput.getAttribute('value');
  }

  async setLegalOrTradingNameInput(legalOrTradingName) {
    await this.legalOrTradingNameInput.sendKeys(legalOrTradingName);
  }

  async getLegalOrTradingNameInput() {
    return this.legalOrTradingNameInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber) {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput() {
    return this.registrationNumberInput.getAttribute('value');
  }

  async setRegistrationDateInput(registrationDate) {
    await this.registrationDateInput.sendKeys(registrationDate);
  }

  async getRegistrationDateInput() {
    return this.registrationDateInput.getAttribute('value');
  }

  async setCompanyCodeInput(companyCode) {
    await this.companyCodeInput.sendKeys(companyCode);
  }

  async getCompanyCodeInput() {
    return this.companyCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setCountyOrStateInput(countyOrState) {
    await this.countyOrStateInput.sendKeys(countyOrState);
  }

  async getCountyOrStateInput() {
    return this.countyOrStateInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return this.postalCodeInput.getAttribute('value');
  }

  async setPostalAddressInput(postalAddress) {
    await this.postalAddressInput.sendKeys(postalAddress);
  }

  async getPostalAddressInput() {
    return this.postalAddressInput.getAttribute('value');
  }

  async setCityOrTownInput(cityOrTown) {
    await this.cityOrTownInput.sendKeys(cityOrTown);
  }

  async getCityOrTownInput() {
    return this.cityOrTownInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setBuildingNameOrNumberInput(buildingNameOrNumber) {
    await this.buildingNameOrNumberInput.sendKeys(buildingNameOrNumber);
  }

  async getBuildingNameOrNumberInput() {
    return this.buildingNameOrNumberInput.getAttribute('value');
  }

  async setPrimaryPhoneNumberInput(primaryPhoneNumber) {
    await this.primaryPhoneNumberInput.sendKeys(primaryPhoneNumber);
  }

  async getPrimaryPhoneNumberInput() {
    return this.primaryPhoneNumberInput.getAttribute('value');
  }

  async setSecondaryPhoneNumberInput(secondaryPhoneNumber) {
    await this.secondaryPhoneNumberInput.sendKeys(secondaryPhoneNumber);
  }

  async getSecondaryPhoneNumberInput() {
    return this.secondaryPhoneNumberInput.getAttribute('value');
  }

  async setEmailAddressInput(emailAddress) {
    await this.emailAddressInput.sendKeys(emailAddress);
  }

  async getEmailAddressInput() {
    return this.emailAddressInput.getAttribute('value');
  }

  async setWebsiteInput(website) {
    await this.websiteInput.sendKeys(website);
  }

  async getWebsiteInput() {
    return this.websiteInput.getAttribute('value');
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
