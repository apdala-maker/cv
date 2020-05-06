import { element, by, ElementFinder } from 'protractor';

export default class ThirdPartyChargeDistributionScheduleUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-code'));
  partyCodeInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-partyCode'));
  transactionCodeInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-transactionCode'));
  chargeModeInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-chargeMode'));
  valueInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-value'));
  statusInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-status'));
  areaCodeInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-areaCode'));
  dateCreatedInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-dateCreated'));
  createdByInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-createdBy'));
  creatorUserEmailInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-creatorUserEmail'));
  dateModifiedInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-dateModified'));
  modifiedByInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-modifiedBy'));
  modifierUserEmailInput: ElementFinder = element(by.css('input#third-party-charge-distribution-schedule-modifierUserEmail'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setPartyCodeInput(partyCode) {
    await this.partyCodeInput.sendKeys(partyCode);
  }

  async getPartyCodeInput() {
    return this.partyCodeInput.getAttribute('value');
  }

  async setTransactionCodeInput(transactionCode) {
    await this.transactionCodeInput.sendKeys(transactionCode);
  }

  async getTransactionCodeInput() {
    return this.transactionCodeInput.getAttribute('value');
  }

  async setChargeModeInput(chargeMode) {
    await this.chargeModeInput.sendKeys(chargeMode);
  }

  async getChargeModeInput() {
    return this.chargeModeInput.getAttribute('value');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
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
