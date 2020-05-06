import { element, by, ElementFinder } from 'protractor';

export default class UserProfileFileTypesUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.userProfileFileTypes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  iSActiveInput: ElementFinder = element(by.css('input#user-profile-file-types-iSActive'));
  profileImageInput: ElementFinder = element(by.css('input#user-profile-file-types-profileImage'));
  dateCreatedInput: ElementFinder = element(by.css('input#user-profile-file-types-dateCreated'));

  getPageTitle() {
    return this.pageTitle;
  }

  getISActiveInput() {
    return this.iSActiveInput;
  }
  async setProfileImageInput(profileImage) {
    await this.profileImageInput.sendKeys(profileImage);
  }

  async getProfileImageInput() {
    return this.profileImageInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated) {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput() {
    return this.dateCreatedInput.getAttribute('value');
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
