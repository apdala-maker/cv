import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PromoCodeTransactionComponentsPage, { PromoCodeTransactionDeleteDialog } from './promo-code-transaction.page-object';
import PromoCodeTransactionUpdatePage from './promo-code-transaction-update.page-object';
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

describe('PromoCodeTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let promoCodeTransactionComponentsPage: PromoCodeTransactionComponentsPage;
  let promoCodeTransactionUpdatePage: PromoCodeTransactionUpdatePage;
  let promoCodeTransactionDeleteDialog: PromoCodeTransactionDeleteDialog;
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

  it('should load PromoCodeTransactions', async () => {
    await navBarPage.getEntityPage('promo-code-transaction');
    promoCodeTransactionComponentsPage = new PromoCodeTransactionComponentsPage();
    expect(await promoCodeTransactionComponentsPage.title.getText()).to.match(/Promo Code Transactions/);

    expect(await promoCodeTransactionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([promoCodeTransactionComponentsPage.noRecords, promoCodeTransactionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(promoCodeTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(promoCodeTransactionComponentsPage.table);
  });

  it('should load create PromoCodeTransaction page', async () => {
    await promoCodeTransactionComponentsPage.createButton.click();
    promoCodeTransactionUpdatePage = new PromoCodeTransactionUpdatePage();
    expect(await promoCodeTransactionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.promoCodeTransaction.home.createOrEditLabel/
    );
    await promoCodeTransactionUpdatePage.cancel();
  });

  it('should create and save PromoCodeTransactions', async () => {
    await promoCodeTransactionComponentsPage.createButton.click();
    await promoCodeTransactionUpdatePage.setCodeInput('code');
    expect(await promoCodeTransactionUpdatePage.getCodeInput()).to.match(/code/);
    await promoCodeTransactionUpdatePage.setRecordNumberInput('5');
    expect(await promoCodeTransactionUpdatePage.getRecordNumberInput()).to.eq('5');
    await promoCodeTransactionUpdatePage.setCustomerCodeInput('customerCode');
    expect(await promoCodeTransactionUpdatePage.getCustomerCodeInput()).to.match(/customerCode/);
    await promoCodeTransactionUpdatePage.setDriverCodeInput('driverCode');
    expect(await promoCodeTransactionUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await promoCodeTransactionUpdatePage.setDebitInput('5');
    expect(await promoCodeTransactionUpdatePage.getDebitInput()).to.eq('5');
    await promoCodeTransactionUpdatePage.setCreditInput('5');
    expect(await promoCodeTransactionUpdatePage.getCreditInput()).to.eq('5');
    await promoCodeTransactionUpdatePage.setNarrationInput('narration');
    expect(await promoCodeTransactionUpdatePage.getNarrationInput()).to.match(/narration/);
    await promoCodeTransactionUpdatePage.setTransactionReferenceInput('transactionReference');
    expect(await promoCodeTransactionUpdatePage.getTransactionReferenceInput()).to.match(/transactionReference/);
    await promoCodeTransactionUpdatePage.setTransactionCodeInput('transactionCode');
    expect(await promoCodeTransactionUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
    await promoCodeTransactionUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await promoCodeTransactionUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await promoCodeTransactionUpdatePage.setCreatedByInput('createdBy');
    expect(await promoCodeTransactionUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await promoCodeTransactionUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await promoCodeTransactionUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await promoCodeTransactionUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await promoCodeTransactionUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await promoCodeTransactionUpdatePage.setModifiedByInput('modifiedBy');
    expect(await promoCodeTransactionUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await promoCodeTransactionUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await promoCodeTransactionUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(promoCodeTransactionUpdatePage.saveButton);
    await promoCodeTransactionUpdatePage.save();
    await waitUntilHidden(promoCodeTransactionUpdatePage.saveButton);
    expect(await isVisible(promoCodeTransactionUpdatePage.saveButton)).to.be.false;

    expect(await promoCodeTransactionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(promoCodeTransactionComponentsPage.table);

    await waitUntilCount(promoCodeTransactionComponentsPage.records, beforeRecordsCount + 1);
    expect(await promoCodeTransactionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PromoCodeTransaction', async () => {
    const deleteButton = promoCodeTransactionComponentsPage.getDeleteButton(promoCodeTransactionComponentsPage.records.last());
    await click(deleteButton);

    promoCodeTransactionDeleteDialog = new PromoCodeTransactionDeleteDialog();
    await waitUntilDisplayed(promoCodeTransactionDeleteDialog.deleteModal);
    expect(await promoCodeTransactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.promoCodeTransaction.delete.question/
    );
    await promoCodeTransactionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(promoCodeTransactionDeleteDialog.deleteModal);

    expect(await isVisible(promoCodeTransactionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([promoCodeTransactionComponentsPage.noRecords, promoCodeTransactionComponentsPage.table]);

    const afterCount = (await isVisible(promoCodeTransactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(promoCodeTransactionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
