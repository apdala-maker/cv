import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PriceMongoModelComponentsPage, { PriceMongoModelDeleteDialog } from './price-mongo-model.page-object';
import PriceMongoModelUpdatePage from './price-mongo-model-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('PriceMongoModel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let priceMongoModelComponentsPage: PriceMongoModelComponentsPage;
  let priceMongoModelUpdatePage: PriceMongoModelUpdatePage;
  let priceMongoModelDeleteDialog: PriceMongoModelDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load PriceMongoModels', async () => {
    await navBarPage.getEntityPage('price-mongo-model');
    priceMongoModelComponentsPage = new PriceMongoModelComponentsPage();
    expect(await priceMongoModelComponentsPage.title.getText()).to.match(/Price Mongo Models/);

    expect(await priceMongoModelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([priceMongoModelComponentsPage.noRecords, priceMongoModelComponentsPage.table]);

    beforeRecordsCount = (await isVisible(priceMongoModelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(priceMongoModelComponentsPage.table);
  });

  it('should load create PriceMongoModel page', async () => {
    await priceMongoModelComponentsPage.createButton.click();
    priceMongoModelUpdatePage = new PriceMongoModelUpdatePage();
    expect(await priceMongoModelUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.priceMongoModel.home.createOrEditLabel/
    );
    await priceMongoModelUpdatePage.cancel();
  });

  it('should create and save PriceMongoModels', async () => {
    await priceMongoModelComponentsPage.createButton.click();
    await priceMongoModelUpdatePage.setAmountToBePaidInput('5');
    expect(await priceMongoModelUpdatePage.getAmountToBePaidInput()).to.eq('5');
    const selectedIsPaid = await priceMongoModelUpdatePage.getIsPaidInput().isSelected();
    if (selectedIsPaid) {
      await priceMongoModelUpdatePage.getIsPaidInput().click();
      expect(await priceMongoModelUpdatePage.getIsPaidInput().isSelected()).to.be.false;
    } else {
      await priceMongoModelUpdatePage.getIsPaidInput().click();
      expect(await priceMongoModelUpdatePage.getIsPaidInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(priceMongoModelUpdatePage.saveButton);
    await priceMongoModelUpdatePage.save();
    await waitUntilHidden(priceMongoModelUpdatePage.saveButton);
    expect(await isVisible(priceMongoModelUpdatePage.saveButton)).to.be.false;

    expect(await priceMongoModelComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(priceMongoModelComponentsPage.table);

    await waitUntilCount(priceMongoModelComponentsPage.records, beforeRecordsCount + 1);
    expect(await priceMongoModelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PriceMongoModel', async () => {
    const deleteButton = priceMongoModelComponentsPage.getDeleteButton(priceMongoModelComponentsPage.records.last());
    await click(deleteButton);

    priceMongoModelDeleteDialog = new PriceMongoModelDeleteDialog();
    await waitUntilDisplayed(priceMongoModelDeleteDialog.deleteModal);
    expect(await priceMongoModelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.priceMongoModel.delete.question/
    );
    await priceMongoModelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(priceMongoModelDeleteDialog.deleteModal);

    expect(await isVisible(priceMongoModelDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([priceMongoModelComponentsPage.noRecords, priceMongoModelComponentsPage.table]);

    const afterCount = (await isVisible(priceMongoModelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(priceMongoModelComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
