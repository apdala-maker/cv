import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverTransactionComponentsPage, { DriverTransactionDeleteDialog } from './driver-transaction.page-object';
import DriverTransactionUpdatePage from './driver-transaction-update.page-object';
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

describe('DriverTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverTransactionComponentsPage: DriverTransactionComponentsPage;
  let driverTransactionUpdatePage: DriverTransactionUpdatePage;
  let driverTransactionDeleteDialog: DriverTransactionDeleteDialog;
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

  it('should load DriverTransactions', async () => {
    await navBarPage.getEntityPage('driver-transaction');
    driverTransactionComponentsPage = new DriverTransactionComponentsPage();
    expect(await driverTransactionComponentsPage.title.getText()).to.match(/Driver Transactions/);

    expect(await driverTransactionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverTransactionComponentsPage.noRecords, driverTransactionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverTransactionComponentsPage.table);
  });

  it('should load create DriverTransaction page', async () => {
    await driverTransactionComponentsPage.createButton.click();
    driverTransactionUpdatePage = new DriverTransactionUpdatePage();
    expect(await driverTransactionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverTransaction.home.createOrEditLabel/
    );
    await driverTransactionUpdatePage.cancel();
  });

  it('should create and save DriverTransactions', async () => {
    await driverTransactionComponentsPage.createButton.click();
    await driverTransactionUpdatePage.setAreaCodeInput('areaCode');
    expect(await driverTransactionUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await driverTransactionUpdatePage.setRecordNumberInput('5');
    expect(await driverTransactionUpdatePage.getRecordNumberInput()).to.eq('5');
    await driverTransactionUpdatePage.setCustomerCodeInput('customerCode');
    expect(await driverTransactionUpdatePage.getCustomerCodeInput()).to.match(/customerCode/);
    await driverTransactionUpdatePage.setDriverCodeInput('driverCode');
    expect(await driverTransactionUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await driverTransactionUpdatePage.setDebitInput('5');
    expect(await driverTransactionUpdatePage.getDebitInput()).to.eq('5');
    await driverTransactionUpdatePage.setCreditInput('5');
    expect(await driverTransactionUpdatePage.getCreditInput()).to.eq('5');
    await driverTransactionUpdatePage.setNarrationInput('narration');
    expect(await driverTransactionUpdatePage.getNarrationInput()).to.match(/narration/);
    await driverTransactionUpdatePage.setTransactionReferenceInput('transactionReference');
    expect(await driverTransactionUpdatePage.getTransactionReferenceInput()).to.match(/transactionReference/);
    await driverTransactionUpdatePage.setTransactionCodeInput('transactionCode');
    expect(await driverTransactionUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
    await driverTransactionUpdatePage.paymentChannelSelectLastOption();
    await driverTransactionUpdatePage.setIsReversedInput('isReversed');
    expect(await driverTransactionUpdatePage.getIsReversedInput()).to.match(/isReversed/);
    await driverTransactionUpdatePage.setHashCodeInput('hashCode');
    expect(await driverTransactionUpdatePage.getHashCodeInput()).to.match(/hashCode/);
    await driverTransactionUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await driverTransactionUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await driverTransactionUpdatePage.setCreatedByInput('createdBy');
    expect(await driverTransactionUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await driverTransactionUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await driverTransactionUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await driverTransactionUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await driverTransactionUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await driverTransactionUpdatePage.setModifiedByInput('modifiedBy');
    expect(await driverTransactionUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await driverTransactionUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await driverTransactionUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(driverTransactionUpdatePage.saveButton);
    await driverTransactionUpdatePage.save();
    await waitUntilHidden(driverTransactionUpdatePage.saveButton);
    expect(await isVisible(driverTransactionUpdatePage.saveButton)).to.be.false;

    expect(await driverTransactionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverTransactionComponentsPage.table);

    await waitUntilCount(driverTransactionComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverTransactionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DriverTransaction', async () => {
    const deleteButton = driverTransactionComponentsPage.getDeleteButton(driverTransactionComponentsPage.records.last());
    await click(deleteButton);

    driverTransactionDeleteDialog = new DriverTransactionDeleteDialog();
    await waitUntilDisplayed(driverTransactionDeleteDialog.deleteModal);
    expect(await driverTransactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverTransaction.delete.question/
    );
    await driverTransactionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverTransactionDeleteDialog.deleteModal);

    expect(await isVisible(driverTransactionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverTransactionComponentsPage.noRecords, driverTransactionComponentsPage.table]);

    const afterCount = (await isVisible(driverTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverTransactionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
