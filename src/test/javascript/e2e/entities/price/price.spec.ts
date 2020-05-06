import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PriceComponentsPage, { PriceDeleteDialog } from './price.page-object';
import PriceUpdatePage from './price-update.page-object';
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

describe('Price e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let priceComponentsPage: PriceComponentsPage;
  let priceUpdatePage: PriceUpdatePage;
  let priceDeleteDialog: PriceDeleteDialog;
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

  it('should load Prices', async () => {
    await navBarPage.getEntityPage('price');
    priceComponentsPage = new PriceComponentsPage();
    expect(await priceComponentsPage.title.getText()).to.match(/Prices/);

    expect(await priceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([priceComponentsPage.noRecords, priceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(priceComponentsPage.noRecords)) ? 0 : await getRecordsCount(priceComponentsPage.table);
  });

  it('should load create Price page', async () => {
    await priceComponentsPage.createButton.click();
    priceUpdatePage = new PriceUpdatePage();
    expect(await priceUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.price.home.createOrEditLabel/);
    await priceUpdatePage.cancel();
  });

  it('should create and save Prices', async () => {
    await priceComponentsPage.createButton.click();
    await priceUpdatePage.setPriceCodeInput('priceCode');
    expect(await priceUpdatePage.getPriceCodeInput()).to.match(/priceCode/);
    await priceUpdatePage.setStartTimeInput('01-01-2001');
    expect(await priceUpdatePage.getStartTimeInput()).to.eq('2001-01-01');
    await priceUpdatePage.setEndTimeInput('01-01-2001');
    expect(await priceUpdatePage.getEndTimeInput()).to.eq('2001-01-01');
    await priceUpdatePage.setPricePerMinuteInput('5');
    expect(await priceUpdatePage.getPricePerMinuteInput()).to.eq('5');
    await priceUpdatePage.setPricePerDistantUnitInput('5');
    expect(await priceUpdatePage.getPricePerDistantUnitInput()).to.eq('5');
    await priceUpdatePage.setMinimumSpeedForPricePerMinuteInput('5');
    expect(await priceUpdatePage.getMinimumSpeedForPricePerMinuteInput()).to.eq('5');
    await priceUpdatePage.setAreaCodeInput('areaCode');
    expect(await priceUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await priceUpdatePage.setVehicleTypeCodeInput('vehicleTypeCode');
    expect(await priceUpdatePage.getVehicleTypeCodeInput()).to.match(/vehicleTypeCode/);
    await priceUpdatePage.setCancellationFeeInput('5');
    expect(await priceUpdatePage.getCancellationFeeInput()).to.eq('5');
    await priceUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await priceUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await priceUpdatePage.setCreatedByInput('createdBy');
    expect(await priceUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await priceUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await priceUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await priceUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await priceUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await priceUpdatePage.setModifiedByInput('modifiedBy');
    expect(await priceUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await priceUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await priceUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(priceUpdatePage.saveButton);
    await priceUpdatePage.save();
    await waitUntilHidden(priceUpdatePage.saveButton);
    expect(await isVisible(priceUpdatePage.saveButton)).to.be.false;

    expect(await priceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(priceComponentsPage.table);

    await waitUntilCount(priceComponentsPage.records, beforeRecordsCount + 1);
    expect(await priceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Price', async () => {
    const deleteButton = priceComponentsPage.getDeleteButton(priceComponentsPage.records.last());
    await click(deleteButton);

    priceDeleteDialog = new PriceDeleteDialog();
    await waitUntilDisplayed(priceDeleteDialog.deleteModal);
    expect(await priceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.price.delete.question/);
    await priceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(priceDeleteDialog.deleteModal);

    expect(await isVisible(priceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([priceComponentsPage.noRecords, priceComponentsPage.table]);

    const afterCount = (await isVisible(priceComponentsPage.noRecords)) ? 0 : await getRecordsCount(priceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
