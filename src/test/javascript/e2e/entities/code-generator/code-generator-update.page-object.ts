import { element, by, ElementFinder } from 'protractor';

export default class CodeGeneratorUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.codeGenerator.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  seedInput: ElementFinder = element(by.css('input#code-generator-seed'));
  currentNumberInput: ElementFinder = element(by.css('input#code-generator-currentNumber'));
  numberCategoryInput: ElementFinder = element(by.css('input#code-generator-numberCategory'));
  prefixInput: ElementFinder = element(by.css('input#code-generator-prefix'));
  characterCountInput: ElementFinder = element(by.css('input#code-generator-characterCount'));
  dateCreatedInput: ElementFinder = element(by.css('input#code-generator-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#code-generator-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#code-generator-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#code-generator-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#code-generator-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#code-generator-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSeedInput(seed) {
    await this.seedInput.sendKeys(seed);
  }

  async getSeedInput() {
    return this.seedInput.getAttribute('value');
  }

  async setCurrentNumberInput(currentNumber) {
    await this.currentNumberInput.sendKeys(currentNumber);
  }

  async getCurrentNumberInput() {
    return this.currentNumberInput.getAttribute('value');
  }

  async setNumberCategoryInput(numberCategory) {
    await this.numberCategoryInput.sendKeys(numberCategory);
  }

  async getNumberCategoryInput() {
    return this.numberCategoryInput.getAttribute('value');
  }

  async setPrefixInput(prefix) {
    await this.prefixInput.sendKeys(prefix);
  }

  async getPrefixInput() {
    return this.prefixInput.getAttribute('value');
  }

  async setCharacterCountInput(characterCount) {
    await this.characterCountInput.sendKeys(characterCount);
  }

  async getCharacterCountInput() {
    return this.characterCountInput.getAttribute('value');
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
