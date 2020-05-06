import { element, by, ElementFinder } from 'protractor';

export default class PassengerIdentityUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.passengerIdentity.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#passenger-identity-userCode'));
  nameInput: ElementFinder = element(by.css('input#passenger-identity-name'));
  countryCodeInput: ElementFinder = element(by.css('input#passenger-identity-countryCode'));
  areaCodeInput: ElementFinder = element(by.css('input#passenger-identity-areaCode'));
  referralCodeInput: ElementFinder = element(by.css('input#passenger-identity-referralCode'));
  genderInput: ElementFinder = element(by.css('input#passenger-identity-gender'));
  companyCodeInput: ElementFinder = element(by.css('input#passenger-identity-companyCode'));
  currentRatingInput: ElementFinder = element(by.css('input#passenger-identity-currentRating'));
  userTypeInput: ElementFinder = element(by.css('input#passenger-identity-userType'));
  dateCreatedInput: ElementFinder = element(by.css('input#passenger-identity-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#passenger-identity-dateModified'));
  userProfileFileTypesSelect: ElementFinder = element(by.css('select#passenger-identity-userProfileFileTypes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setReferralCodeInput(referralCode) {
    await this.referralCodeInput.sendKeys(referralCode);
  }

  async getReferralCodeInput() {
    return this.referralCodeInput.getAttribute('value');
  }

  async setGenderInput(gender) {
    await this.genderInput.sendKeys(gender);
  }

  async getGenderInput() {
    return this.genderInput.getAttribute('value');
  }

  async setCompanyCodeInput(companyCode) {
    await this.companyCodeInput.sendKeys(companyCode);
  }

  async getCompanyCodeInput() {
    return this.companyCodeInput.getAttribute('value');
  }

  async setCurrentRatingInput(currentRating) {
    await this.currentRatingInput.sendKeys(currentRating);
  }

  async getCurrentRatingInput() {
    return this.currentRatingInput.getAttribute('value');
  }

  async setUserTypeInput(userType) {
    await this.userTypeInput.sendKeys(userType);
  }

  async getUserTypeInput() {
    return this.userTypeInput.getAttribute('value');
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

  async userProfileFileTypesSelectLastOption() {
    await this.userProfileFileTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userProfileFileTypesSelectOption(option) {
    await this.userProfileFileTypesSelect.sendKeys(option);
  }

  getUserProfileFileTypesSelect() {
    return this.userProfileFileTypesSelect;
  }

  async getUserProfileFileTypesSelectedOption() {
    return this.userProfileFileTypesSelect.element(by.css('option:checked')).getText();
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
