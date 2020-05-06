import { element, by, ElementFinder } from 'protractor';

export default class ComplaintsUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.complaints.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userCodeInput: ElementFinder = element(by.css('input#complaints-userCode'));
  categoryInput: ElementFinder = element(by.css('input#complaints-category'));
  descriptionInput: ElementFinder = element(by.css('input#complaints-description'));
  audienceSelect: ElementFinder = element(by.css('select#complaints-audience'));
  statusSelect: ElementFinder = element(by.css('select#complaints-status'));
  feedBackInput: ElementFinder = element(by.css('input#complaints-feedBack'));
  referenceCodeInput: ElementFinder = element(by.css('input#complaints-referenceCode'));
  areaCodeInput: ElementFinder = element(by.css('input#complaints-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#complaints-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#complaints-dateModified'));
  complaintsCategorySelect: ElementFinder = element(by.css('select#complaints-complaintsCategory'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserCodeInput(userCode) {
    await this.userCodeInput.sendKeys(userCode);
  }

  async getUserCodeInput() {
    return this.userCodeInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return this.categoryInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setAudienceSelect(audience) {
    await this.audienceSelect.sendKeys(audience);
  }

  async getAudienceSelect() {
    return this.audienceSelect.element(by.css('option:checked')).getText();
  }

  async audienceSelectLastOption() {
    await this.audienceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setFeedBackInput(feedBack) {
    await this.feedBackInput.sendKeys(feedBack);
  }

  async getFeedBackInput() {
    return this.feedBackInput.getAttribute('value');
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

  async complaintsCategorySelectLastOption() {
    await this.complaintsCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async complaintsCategorySelectOption(option) {
    await this.complaintsCategorySelect.sendKeys(option);
  }

  getComplaintsCategorySelect() {
    return this.complaintsCategorySelect;
  }

  async getComplaintsCategorySelectedOption() {
    return this.complaintsCategorySelect.element(by.css('option:checked')).getText();
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
