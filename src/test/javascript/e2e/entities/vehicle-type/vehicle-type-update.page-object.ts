import { element, by, ElementFinder } from 'protractor';

export default class VehicleTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.vehicleType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#vehicle-type-areaCode'));
  isMotorBikeInput: ElementFinder = element(by.css('input#vehicle-type-isMotorBike'));
  descriptionInput: ElementFinder = element(by.css('input#vehicle-type-description'));
  codeInput: ElementFinder = element(by.css('input#vehicle-type-code'));
  numberOfSeatsInput: ElementFinder = element(by.css('input#vehicle-type-numberOfSeats'));
  minimumCCInput: ElementFinder = element(by.css('input#vehicle-type-minimumCC'));
  maximumCCInput: ElementFinder = element(by.css('input#vehicle-type-maximumCC'));
  dateCreatedInput: ElementFinder = element(by.css('input#vehicle-type-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#vehicle-type-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#vehicle-type-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#vehicle-type-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#vehicle-type-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#vehicle-type-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  getIsMotorBikeInput() {
    return this.isMotorBikeInput;
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setNumberOfSeatsInput(numberOfSeats) {
    await this.numberOfSeatsInput.sendKeys(numberOfSeats);
  }

  async getNumberOfSeatsInput() {
    return this.numberOfSeatsInput.getAttribute('value');
  }

  async setMinimumCCInput(minimumCC) {
    await this.minimumCCInput.sendKeys(minimumCC);
  }

  async getMinimumCCInput() {
    return this.minimumCCInput.getAttribute('value');
  }

  async setMaximumCCInput(maximumCC) {
    await this.maximumCCInput.sendKeys(maximumCC);
  }

  async getMaximumCCInput() {
    return this.maximumCCInput.getAttribute('value');
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
