import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CustomerTransactionComponentsPage, { CustomerTransactionDeleteDialog } from './customer-transaction.page-object';
import CustomerTransactionUpdatePage from './customer-transaction-update.page-object';
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

describe('CustomerTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerTransactionComponentsPage: CustomerTransactionComponentsPage;
  let customerTransactionUpdatePage: CustomerTransactionUpdatePage;
  let customerTransactionDeleteDialog: CustomerTransactionDeleteDialog;
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

  it('should load CustomerTransactions', async () => {
    await navBarPage.getEntityPage('customer-transaction');
    customerTransactionComponentsPage = new CustomerTransactionComponentsPage();
    expect(await customerTransactionComponentsPage.title.getText()).to.match(/Customer Transactions/);

    expect(await customerTransactionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([customerTransactionComponentsPage.noRecords, customerTransactionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(customerTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(customerTransactionComponentsPage.table);
  });

  it('should load create CustomerTransaction page', async () => {
    await customerTransactionComponentsPage.createButton.click();
    customerTransactionUpdatePage = new CustomerTransactionUpdatePage();
    expect(await customerTransactionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.customerTransaction.home.createOrEditLabel/
    );
    await customerTransactionUpdatePage.cancel();
  });

  it('should create and save CustomerTransactions', async () => {
    await customerTransactionComponentsPage.createButton.click();
    await customerTransactionUpdatePage.setAreaCodeInput('areaCode');
    expect(await customerTransactionUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await customerTransactionUpdatePage.setRecordNumberInput('5');
    expect(await customerTransactionUpdatePage.getRecordNumberInput()).to.eq('5');
    await customerTransactionUpdatePage.setCustomerCodeInput('customerCode');
    expect(await customerTransactionUpdatePage.getCustomerCodeInput()).to.match(/customerCode/);
    await customerTransactionUpdatePage.setDriverCodeInput('driverCode');
    expect(await customerTransactionUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await customerTransactionUpdatePage.setDebitInput('5');
    expect(await customerTransactionUpdatePage.getDebitInput()).to.eq('5');
    await customerTransactionUpdatePage.setCreditInput('5');
    expect(await customerTransactionUpdatePage.getCreditInput()).to.eq('5');
    await customerTransactionUpdatePage.setNarrationInput('narration');
    expect(await customerTransactionUpdatePage.getNarrationInput()).to.match(/narration/);
    await customerTransactionUpdatePage.setTransactionReferenceInput('transactionReference');
    expect(await customerTransactionUpdatePage.getTransactionReferenceInput()).to.match(/transactionReference/);
    await customerTransactionUpdatePage.setTransactionCodeInput('transactionCode');
    expect(await customerTransactionUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
    await customerTransactionUpdatePage.paymentChannelSelectLastOption();
    await customerTransactionUpdatePage.setIsReversedInput('isReversed');
    expect(await customerTransactionUpdatePage.getIsReversedInput()).to.match(/isReversed/);
    await customerTransactionUpdatePage.setHashCodeInput('hashCode');
    expect(await customerTransactionUpdatePage.getHashCodeInput()).to.match(/hashCode/);
    await customerTransactionUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await customerTransactionUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await customerTransactionUpdatePage.setCreatedByInput('createdBy');
    expect(await customerTransactionUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await customerTransactionUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await customerTransactionUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await customerTransactionUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await customerTransactionUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await customerTransactionUpdatePage.setModifiedByInput('modifiedBy');
    expect(await customerTransactionUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await customerTransactionUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await customerTransactionUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(customerTransactionUpdatePage.saveButton);
    await customerTransactionUpdatePage.save();
    await waitUntilHidden(customerTransactionUpdatePage.saveButton);
    expect(await isVisible(customerTransactionUpdatePage.saveButton)).to.be.false;

    expect(await customerTransactionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(customerTransactionComponentsPage.table);

    await waitUntilCount(customerTransactionComponentsPage.records, beforeRecordsCount + 1);
    expect(await customerTransactionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CustomerTransaction', async () => {
    const deleteButton = customerTransactionComponentsPage.getDeleteButton(customerTransactionComponentsPage.records.last());
    await click(deleteButton);

    customerTransactionDeleteDialog = new CustomerTransactionDeleteDialog();
    await waitUntilDisplayed(customerTransactionDeleteDialog.deleteModal);
    expect(await customerTransactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.customerTransaction.delete.question/
    );
    await customerTransactionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(customerTransactionDeleteDialog.deleteModal);

    expect(await isVisible(customerTransactionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([customerTransactionComponentsPage.noRecords, customerTransactionComponentsPage.table]);

    const afterCount = (await isVisible(customerTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(customerTransactionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
