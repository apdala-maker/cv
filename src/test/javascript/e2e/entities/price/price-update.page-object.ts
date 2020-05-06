import { element, by, ElementFinder } from 'protractor';

export default class PriceUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.price.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  priceCodeInput: ElementFinder = element(by.css('input#price-priceCode'));
  startTimeInput: ElementFinder = element(by.css('input#price-startTime'));
  endTimeInput: ElementFinder = element(by.css('input#price-endTime'));
  pricePerMinuteInput: ElementFinder = element(by.css('input#price-pricePerMinute'));
  pricePerDistantUnitInput: ElementFinder = element(by.css('input#price-pricePerDistantUnit'));
  minimumSpeedForPricePerMinuteInput: ElementFinder = element(by.css('input#price-minimumSpeedForPricePerMinute'));
  areaCodeInput: ElementFinder = element(by.css('input#price-areaCode'));
  vehicleTypeCodeInput: ElementFinder = element(by.css('input#price-vehicleTypeCode'));
  cancellationFeeInput: ElementFinder = element(by.css('input#price-cancellationFee'));
  dateCreatedInput: ElementFinder = element(by.css('input#price-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#price-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#price-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#price-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#price-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#price-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPriceCodeInput(priceCode) {
    await this.priceCodeInput.sendKeys(priceCode);
  }

  async getPriceCodeInput() {
    return this.priceCodeInput.getAttribute('value');
  }

  async setStartTimeInput(startTime) {
    await this.startTimeInput.sendKeys(startTime);
  }

  async getStartTimeInput() {
    return this.startTimeInput.getAttribute('value');
  }

  async setEndTimeInput(endTime) {
    await this.endTimeInput.sendKeys(endTime);
  }

  async getEndTimeInput() {
    return this.endTimeInput.getAttribute('value');
  }

  async setPricePerMinuteInput(pricePerMinute) {
    await this.pricePerMinuteInput.sendKeys(pricePerMinute);
  }

  async getPricePerMinuteInput() {
    return this.pricePerMinuteInput.getAttribute('value');
  }

  async setPricePerDistantUnitInput(pricePerDistantUnit) {
    await this.pricePerDistantUnitInput.sendKeys(pricePerDistantUnit);
  }

  async getPricePerDistantUnitInput() {
    return this.pricePerDistantUnitInput.getAttribute('value');
  }

  async setMinimumSpeedForPricePerMinuteInput(minimumSpeedForPricePerMinute) {
    await this.minimumSpeedForPricePerMinuteInput.sendKeys(minimumSpeedForPricePerMinute);
  }

  async getMinimumSpeedForPricePerMinuteInput() {
    return this.minimumSpeedForPricePerMinuteInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setVehicleTypeCodeInput(vehicleTypeCode) {
    await this.vehicleTypeCodeInput.sendKeys(vehicleTypeCode);
  }

  async getVehicleTypeCodeInput() {
    return this.vehicleTypeCodeInput.getAttribute('value');
  }

  async setCancellationFeeInput(cancellationFee) {
    await this.cancellationFeeInput.sendKeys(cancellationFee);
  }

  async getCancellationFeeInput() {
    return this.cancellationFeeInput.getAttribute('value');
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
