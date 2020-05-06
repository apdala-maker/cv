import { element, by, ElementFinder } from 'protractor';

export default class TransactionThirdPartyUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.transactionThirdParty.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#transaction-third-party-areaCode'));
  partyCategorySelect: ElementFinder = element(by.css('select#transaction-third-party-partyCategory'));
  codeInput: ElementFinder = element(by.css('input#transaction-third-party-code'));
  nameInput: ElementFinder = element(by.css('input#transaction-third-party-name'));
  countryInput: ElementFinder = element(by.css('input#transaction-third-party-country'));
  countyOrStateInput: ElementFinder = element(by.css('input#transaction-third-party-countyOrState'));
  postalCodeInput: ElementFinder = element(by.css('input#transaction-third-party-postalCode'));
  postalAddressInput: ElementFinder = element(by.css('input#transaction-third-party-postalAddress'));
  townInput: ElementFinder = element(by.css('input#transaction-third-party-town'));
  streetInput: ElementFinder = element(by.css('input#transaction-third-party-street'));
  buildingNameOrNumberInput: ElementFinder = element(by.css('input#transaction-third-party-buildingNameOrNumber'));
  primaryPhoneNumberInput: ElementFinder = element(by.css('input#transaction-third-party-primaryPhoneNumber'));
  secondayPhoneNumberInput: ElementFinder = element(by.css('input#transaction-third-party-secondayPhoneNumber'));
  emailAddressInput: ElementFinder = element(by.css('input#transaction-third-party-emailAddress'));
  dateCreatedInput: ElementFinder = element(by.css('input#transaction-third-party-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#transaction-third-party-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#transaction-third-party-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#transaction-third-party-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#transaction-third-party-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#transaction-third-party-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setPartyCategorySelect(partyCategory) {
    await this.partyCategorySelect.sendKeys(partyCategory);
  }

  async getPartyCategorySelect() {
    return this.partyCategorySelect.element(by.css('option:checked')).getText();
  }

  async partyCategorySelectLastOption() {
    await this.partyCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
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

  async setTownInput(town) {
    await this.townInput.sendKeys(town);
  }

  async getTownInput() {
    return this.townInput.getAttribute('value');
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

  async setSecondayPhoneNumberInput(secondayPhoneNumber) {
    await this.secondayPhoneNumberInput.sendKeys(secondayPhoneNumber);
  }

  async getSecondayPhoneNumberInput() {
    return this.secondayPhoneNumberInput.getAttribute('value');
  }

  async setEmailAddressInput(emailAddress) {
    await this.emailAddressInput.sendKeys(emailAddress);
  }

  async getEmailAddressInput() {
    return this.emailAddressInput.getAttribute('value');
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
