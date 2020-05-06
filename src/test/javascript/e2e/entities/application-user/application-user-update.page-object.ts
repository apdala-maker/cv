import { element, by, ElementFinder } from 'protractor';

export default class ApplicationUserUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.applicationUser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#application-user-userCode'));
  nameInput: ElementFinder = element(by.css('input#application-user-name'));
  countryCodeInput: ElementFinder = element(by.css('input#application-user-countryCode'));
  areaCodeInput: ElementFinder = element(by.css('input#application-user-areaCode'));
  genderInput: ElementFinder = element(by.css('input#application-user-gender'));
  companyCodeInput: ElementFinder = element(by.css('input#application-user-companyCode'));
  currentRatingInput: ElementFinder = element(by.css('input#application-user-currentRating'));
  userTypeInput: ElementFinder = element(by.css('input#application-user-userType'));
  isActiveInput: ElementFinder = element(by.css('input#application-user-isActive'));
  isApprovedInput: ElementFinder = element(by.css('input#application-user-isApproved'));
  approvedByInput: ElementFinder = element(by.css('input#application-user-approvedBy'));
  activatedByInput: ElementFinder = element(by.css('input#application-user-activatedBy'));
  imageUrlInput: ElementFinder = element(by.css('input#application-user-imageUrl'));
  dateCreatedInput: ElementFinder = element(by.css('input#application-user-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#application-user-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#application-user-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#application-user-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#application-user-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#application-user-modifierUserEmail'));

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

  async setImageUrlInput(imageUrl) {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
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
