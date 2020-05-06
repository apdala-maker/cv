import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JournalTransactionComponentsPage, { JournalTransactionDeleteDialog } from './journal-transaction.page-object';
import JournalTransactionUpdatePage from './journal-transaction-update.page-object';
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

describe('JournalTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let journalTransactionComponentsPage: JournalTransactionComponentsPage;
  let journalTransactionUpdatePage: JournalTransactionUpdatePage;
  let journalTransactionDeleteDialog: JournalTransactionDeleteDialog;
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

  it('should load JournalTransactions', async () => {
    await navBarPage.getEntityPage('journal-transaction');
    journalTransactionComponentsPage = new JournalTransactionComponentsPage();
    expect(await journalTransactionComponentsPage.title.getText()).to.match(/Journal Transactions/);

    expect(await journalTransactionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([journalTransactionComponentsPage.noRecords, journalTransactionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(journalTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(journalTransactionComponentsPage.table);
  });

  it('should load create JournalTransaction page', async () => {
    await journalTransactionComponentsPage.createButton.click();
    journalTransactionUpdatePage = new JournalTransactionUpdatePage();
    expect(await journalTransactionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.journalTransaction.home.createOrEditLabel/
    );
    await journalTransactionUpdatePage.cancel();
  });

  it('should create and save JournalTransactions', async () => {
    await journalTransactionComponentsPage.createButton.click();
    await journalTransactionUpdatePage.setAreaCodeInput('areaCode');
    expect(await journalTransactionUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await journalTransactionUpdatePage.setRecordNumberInput('5');
    expect(await journalTransactionUpdatePage.getRecordNumberInput()).to.eq('5');
    await journalTransactionUpdatePage.setDriverCodeInput('driverCode');
    expect(await journalTransactionUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await journalTransactionUpdatePage.setDebitInput('5');
    expect(await journalTransactionUpdatePage.getDebitInput()).to.eq('5');
    await journalTransactionUpdatePage.setCreditInput('5');
    expect(await journalTransactionUpdatePage.getCreditInput()).to.eq('5');
    await journalTransactionUpdatePage.setTransactionReferenceInput('transactionReference');
    expect(await journalTransactionUpdatePage.getTransactionReferenceInput()).to.match(/transactionReference/);
    await journalTransactionUpdatePage.setNarrationInput('narration');
    expect(await journalTransactionUpdatePage.getNarrationInput()).to.match(/narration/);
    await journalTransactionUpdatePage.setTransactionDateInput('01-01-2001');
    expect(await journalTransactionUpdatePage.getTransactionDateInput()).to.eq('2001-01-01');
    await journalTransactionUpdatePage.setBatchNumberInput('batchNumber');
    expect(await journalTransactionUpdatePage.getBatchNumberInput()).to.match(/batchNumber/);
    await journalTransactionUpdatePage.setTransactionCodeInput('transactionCode');
    expect(await journalTransactionUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
    await journalTransactionUpdatePage.setFolioInput('folio');
    expect(await journalTransactionUpdatePage.getFolioInput()).to.match(/folio/);
    await journalTransactionUpdatePage.setHashCodeInput('hashCode');
    expect(await journalTransactionUpdatePage.getHashCodeInput()).to.match(/hashCode/);
    await journalTransactionUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await journalTransactionUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await journalTransactionUpdatePage.setCreatedByInput('createdBy');
    expect(await journalTransactionUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await journalTransactionUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await journalTransactionUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await journalTransactionUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await journalTransactionUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await journalTransactionUpdatePage.setModifiedByInput('modifiedBy');
    expect(await journalTransactionUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await journalTransactionUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await journalTransactionUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(journalTransactionUpdatePage.saveButton);
    await journalTransactionUpdatePage.save();
    await waitUntilHidden(journalTransactionUpdatePage.saveButton);
    expect(await isVisible(journalTransactionUpdatePage.saveButton)).to.be.false;

    expect(await journalTransactionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(journalTransactionComponentsPage.table);

    await waitUntilCount(journalTransactionComponentsPage.records, beforeRecordsCount + 1);
    expect(await journalTransactionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last JournalTransaction', async () => {
    const deleteButton = journalTransactionComponentsPage.getDeleteButton(journalTransactionComponentsPage.records.last());
    await click(deleteButton);

    journalTransactionDeleteDialog = new JournalTransactionDeleteDialog();
    await waitUntilDisplayed(journalTransactionDeleteDialog.deleteModal);
    expect(await journalTransactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.journalTransaction.delete.question/
    );
    await journalTransactionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(journalTransactionDeleteDialog.deleteModal);

    expect(await isVisible(journalTransactionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([journalTransactionComponentsPage.noRecords, journalTransactionComponentsPage.table]);

    const afterCount = (await isVisible(journalTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(journalTransactionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
