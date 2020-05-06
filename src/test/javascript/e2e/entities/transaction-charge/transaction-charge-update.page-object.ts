import { element, by, ElementFinder } from 'protractor';

export default class TransactionChargeUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.transactionCharge.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaCodeInput: ElementFinder = element(by.css('input#transaction-charge-areaCode'));
  codeInput: ElementFinder = element(by.css('input#transaction-charge-code'));
  categorySelect: ElementFinder = element(by.css('select#transaction-charge-category'));
  descriptionInput: ElementFinder = element(by.css('input#transaction-charge-description'));
  timeLimitCodeInput: ElementFinder = element(by.css('input#transaction-charge-timeLimitCode'));
  constantChargeInput: ElementFinder = element(by.css('input#transaction-charge-constantCharge'));
  chargePerKilometerInput: ElementFinder = element(by.css('input#transaction-charge-chargePerKilometer'));
  chargePerMinuteInput: ElementFinder = element(by.css('input#transaction-charge-chargePerMinute'));
  statusInput: ElementFinder = element(by.css('input#transaction-charge-status'));
  vehicleCodeInput: ElementFinder = element(by.css('input#transaction-charge-vehicleCode'));
  totalMinimumChargeInput: ElementFinder = element(by.css('input#transaction-charge-totalMinimumCharge'));
  totalMaximumChargeInput: ElementFinder = element(by.css('input#transaction-charge-totalMaximumCharge'));
  minimumSpeedInput: ElementFinder = element(by.css('input#transaction-charge-minimumSpeed'));
  dateCreatedInput: ElementFinder = element(by.css('input#transaction-charge-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#transaction-charge-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#transaction-charge-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#transaction-charge-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#transaction-charge-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#transaction-charge-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setTimeLimitCodeInput(timeLimitCode) {
    await this.timeLimitCodeInput.sendKeys(timeLimitCode);
  }

  async getTimeLimitCodeInput() {
    return this.timeLimitCodeInput.getAttribute('value');
  }

  async setConstantChargeInput(constantCharge) {
    await this.constantChargeInput.sendKeys(constantCharge);
  }

  async getConstantChargeInput() {
    return this.constantChargeInput.getAttribute('value');
  }

  async setChargePerKilometerInput(chargePerKilometer) {
    await this.chargePerKilometerInput.sendKeys(chargePerKilometer);
  }

  async getChargePerKilometerInput() {
    return this.chargePerKilometerInput.getAttribute('value');
  }

  async setChargePerMinuteInput(chargePerMinute) {
    await this.chargePerMinuteInput.sendKeys(chargePerMinute);
  }

  async getChargePerMinuteInput() {
    return this.chargePerMinuteInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setVehicleCodeInput(vehicleCode) {
    await this.vehicleCodeInput.sendKeys(vehicleCode);
  }

  async getVehicleCodeInput() {
    return this.vehicleCodeInput.getAttribute('value');
  }

  async setTotalMinimumChargeInput(totalMinimumCharge) {
    await this.totalMinimumChargeInput.sendKeys(totalMinimumCharge);
  }

  async getTotalMinimumChargeInput() {
    return this.totalMinimumChargeInput.getAttribute('value');
  }

  async setTotalMaximumChargeInput(totalMaximumCharge) {
    await this.totalMaximumChargeInput.sendKeys(totalMaximumCharge);
  }

  async getTotalMaximumChargeInput() {
    return this.totalMaximumChargeInput.getAttribute('value');
  }

  async setMinimumSpeedInput(minimumSpeed) {
    await this.minimumSpeedInput.sendKeys(minimumSpeed);
  }

  async getMinimumSpeedInput() {
    return this.minimumSpeedInput.getAttribute('value');
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
