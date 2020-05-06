import { element, by, ElementFinder } from 'protractor';

export default class ComplaintsCategoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.complaintsCategory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  categoryCodeInput: ElementFinder = element(by.css('input#complaints-category-categoryCode'));
  descriptionInput: ElementFinder = element(by.css('input#complaints-category-description'));
  audienceSelect: ElementFinder = element(by.css('select#complaints-category-audience'));
  urgencyScaleInput: ElementFinder = element(by.css('input#complaints-category-urgencyScale'));
  areaCodeInput: ElementFinder = element(by.css('input#complaints-category-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#complaints-category-dateCreated'));
  dateModifiedInput: ElementFinder = element(by.css('input#complaints-category-dateModified'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCategoryCodeInput(categoryCode) {
    await this.categoryCodeInput.sendKeys(categoryCode);
  }

  async getCategoryCodeInput() {
    return this.categoryCodeInput.getAttribute('value');
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
  async setUrgencyScaleInput(urgencyScale) {
    await this.urgencyScaleInput.sendKeys(urgencyScale);
  }

  async getUrgencyScaleInput() {
    return this.urgencyScaleInput.getAttribute('value');
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
