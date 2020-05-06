import { element, by, ElementFinder } from 'protractor';

export default class IdentityUserUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.identityUser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#identity-user-userCode'));
  nameInput: ElementFinder = element(by.css('input#identity-user-name'));
  countryCodeInput: ElementFinder = element(by.css('input#identity-user-countryCode'));
  areaCodeInput: ElementFinder = element(by.css('input#identity-user-areaCode'));
  genderInput: ElementFinder = element(by.css('input#identity-user-gender'));
  companyCodeInput: ElementFinder = element(by.css('input#identity-user-companyCode'));
  affliateCodeInput: ElementFinder = element(by.css('input#identity-user-affliateCode'));
  currentRatingInput: ElementFinder = element(by.css('input#identity-user-currentRating'));
  userTypeInput: ElementFinder = element(by.css('input#identity-user-userType'));
  isActiveInput: ElementFinder = element(by.css('input#identity-user-isActive'));
  registrationStepInput: ElementFinder = element(by.css('input#identity-user-registrationStep'));
  isApprovedInput: ElementFinder = element(by.css('input#identity-user-isApproved'));
  approvedByInput: ElementFinder = element(by.css('input#identity-user-approvedBy'));
  activatedByInput: ElementFinder = element(by.css('input#identity-user-activatedBy'));
  dateCreatedInput: ElementFinder = element(by.css('input#identity-user-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#identity-user-dateModified'));
  userProfileFileTypesSelect: ElementFinder = element(by.css('select#identity-user-userProfileFileTypes'));

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

  async setAffliateCodeInput(affliateCode) {
    await this.affliateCodeInput.sendKeys(affliateCode);
  }

  async getAffliateCodeInput() {
    return this.affliateCodeInput.getAttribute('value');
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

  getIsActiveInput() {
    return this.isActiveInput;
  }
  async setRegistrationStepInput(registrationStep) {
    await this.registrationStepInput.sendKeys(registrationStep);
  }

  async getRegistrationStepInput() {
    return this.registrationStepInput.getAttribute('value');
  }

  getIsApprovedInput() {
    return this.isApprovedInput;
  }
  async setApprovedByInput(approvedBy) {
    await this.approvedByInput.sendKeys(approvedBy);
  }

  async getApprovedByInput() {
    return this.approvedByInput.getAttribute('value');
  }

  async setActivatedByInput(activatedBy) {
    await this.activatedByInput.sendKeys(activatedBy);
  }

  async getActivatedByInput() {
    return this.activatedByInput.getAttribute('value');
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
