import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChartOfAccountsComponentsPage, { ChartOfAccountsDeleteDialog } from './chart-of-accounts.page-object';
import ChartOfAccountsUpdatePage from './chart-of-accounts-update.page-object';
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

describe('ChartOfAccounts e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chartOfAccountsComponentsPage: ChartOfAccountsComponentsPage;
  let chartOfAccountsUpdatePage: ChartOfAccountsUpdatePage;
  let chartOfAccountsDeleteDialog: ChartOfAccountsDeleteDialog;
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

  it('should load ChartOfAccounts', async () => {
    await navBarPage.getEntityPage('chart-of-accounts');
    chartOfAccountsComponentsPage = new ChartOfAccountsComponentsPage();
    expect(await chartOfAccountsComponentsPage.title.getText()).to.match(/Chart Of Accounts/);

    expect(await chartOfAccountsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([chartOfAccountsComponentsPage.noRecords, chartOfAccountsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(chartOfAccountsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(chartOfAccountsComponentsPage.table);
  });

  it('should load create ChartOfAccounts page', async () => {
    await chartOfAccountsComponentsPage.createButton.click();
    chartOfAccountsUpdatePage = new ChartOfAccountsUpdatePage();
    expect(await chartOfAccountsUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.chartOfAccounts.home.createOrEditLabel/
    );
    await chartOfAccountsUpdatePage.cancel();
  });

  it('should create and save ChartOfAccounts', async () => {
    await chartOfAccountsComponentsPage.createButton.click();
    await chartOfAccountsUpdatePage.setAreaCodeInput('areaCode');
    expect(await chartOfAccountsUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await chartOfAccountsUpdatePage.setAccountCodeInput('accountCode');
    expect(await chartOfAccountsUpdatePage.getAccountCodeInput()).to.match(/accountCode/);
    await chartOfAccountsUpdatePage.setAccountNameInput('accountName');
    expect(await chartOfAccountsUpdatePage.getAccountNameInput()).to.match(/accountName/);
    await chartOfAccountsUpdatePage.setIsCJAccountInput('isCJAccount');
    expect(await chartOfAccountsUpdatePage.getIsCJAccountInput()).to.match(/isCJAccount/);
    await chartOfAccountsUpdatePage.setCOAGroupCodeInput('cOAGroupCode');
    expect(await chartOfAccountsUpdatePage.getCOAGroupCodeInput()).to.match(/cOAGroupCode/);
    await chartOfAccountsUpdatePage.setSystemPostedInput('systemPosted');
    expect(await chartOfAccountsUpdatePage.getSystemPostedInput()).to.match(/systemPosted/);
    await chartOfAccountsUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await chartOfAccountsUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await chartOfAccountsUpdatePage.setCreatedByInput('createdBy');
    expect(await chartOfAccountsUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await chartOfAccountsUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await chartOfAccountsUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await chartOfAccountsUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await chartOfAccountsUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await chartOfAccountsUpdatePage.setModifiedByInput('modifiedBy');
    expect(await chartOfAccountsUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await chartOfAccountsUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await chartOfAccountsUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(chartOfAccountsUpdatePage.saveButton);
    await chartOfAccountsUpdatePage.save();
    await waitUntilHidden(chartOfAccountsUpdatePage.saveButton);
    expect(await isVisible(chartOfAccountsUpdatePage.saveButton)).to.be.false;

    expect(await chartOfAccountsComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(chartOfAccountsComponentsPage.table);

    await waitUntilCount(chartOfAccountsComponentsPage.records, beforeRecordsCount + 1);
    expect(await chartOfAccountsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ChartOfAccounts', async () => {
    const deleteButton = chartOfAccountsComponentsPage.getDeleteButton(chartOfAccountsComponentsPage.records.last());
    await click(deleteButton);

    chartOfAccountsDeleteDialog = new ChartOfAccountsDeleteDialog();
    await waitUntilDisplayed(chartOfAccountsDeleteDialog.deleteModal);
    expect(await chartOfAccountsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.chartOfAccounts.delete.question/
    );
    await chartOfAccountsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(chartOfAccountsDeleteDialog.deleteModal);

    expect(await isVisible(chartOfAccountsDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([chartOfAccountsComponentsPage.noRecords, chartOfAccountsComponentsPage.table]);

    const afterCount = (await isVisible(chartOfAccountsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(chartOfAccountsComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
