import { element, by, ElementFinder } from 'protractor';

export default class PriceMongoModelUpdatePage {
  pageTitle: ElementFinder = element(by.id('catchControlPanelApp.priceMongoModel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  amountToBePaidInput: ElementFinder = element(by.css('input#price-mongo-model-amountToBePaid'));
  isPaidInput: ElementFinder = element(by.css('input#price-mongo-model-isPaid'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAmountToBePaidInput(amountToBePaid) {
    await this.amountToBePaidInput.sendKeys(amountToBePaid);
  }

  async getAmountToBePaidInput() {
    return this.amountToBePaidInput.getAttribute('value');
  }

  getIsPaidInput() {
    return this.isPaidInput;
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
