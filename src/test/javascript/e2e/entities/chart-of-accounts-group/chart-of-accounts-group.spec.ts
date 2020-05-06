import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChartOfAccountsGroupComponentsPage, { ChartOfAccountsGroupDeleteDialog } from './chart-of-accounts-group.page-object';
import ChartOfAccountsGroupUpdatePage from './chart-of-accounts-group-update.page-object';
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

describe('ChartOfAccountsGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chartOfAccountsGroupComponentsPage: ChartOfAccountsGroupComponentsPage;
  let chartOfAccountsGroupUpdatePage: ChartOfAccountsGroupUpdatePage;
  let chartOfAccountsGroupDeleteDialog: ChartOfAccountsGroupDeleteDialog;
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

  it('should load ChartOfAccountsGroups', async () => {
    await navBarPage.getEntityPage('chart-of-accounts-group');
    chartOfAccountsGroupComponentsPage = new ChartOfAccountsGroupComponentsPage();
    expect(await chartOfAccountsGroupComponentsPage.title.getText()).to.match(/Chart Of Accounts Groups/);

    expect(await chartOfAccountsGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([chartOfAccountsGroupComponentsPage.noRecords, chartOfAccountsGroupComponentsPage.table]);

    beforeRecordsCount = (await isVisible(chartOfAccountsGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(chartOfAccountsGroupComponentsPage.table);
  });

  it('should load create ChartOfAccountsGroup page', async () => {
    await chartOfAccountsGroupComponentsPage.createButton.click();
    chartOfAccountsGroupUpdatePage = new ChartOfAccountsGroupUpdatePage();
    expect(await chartOfAccountsGroupUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.chartOfAccountsGroup.home.createOrEditLabel/
    );
    await chartOfAccountsGroupUpdatePage.cancel();
  });

  it('should create and save ChartOfAccountsGroups', async () => {
    await chartOfAccountsGroupComponentsPage.createButton.click();
    await chartOfAccountsGroupUpdatePage.setCodeInput('code');
    expect(await chartOfAccountsGroupUpdatePage.getCodeInput()).to.match(/code/);
    await chartOfAccountsGroupUpdatePage.setAccountTypeInput('accountType');
    expect(await chartOfAccountsGroupUpdatePage.getAccountTypeInput()).to.match(/accountType/);
    await chartOfAccountsGroupUpdatePage.setDescriptionInput('description');
    expect(await chartOfAccountsGroupUpdatePage.getDescriptionInput()).to.match(/description/);
    await chartOfAccountsGroupUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await chartOfAccountsGroupUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await chartOfAccountsGroupUpdatePage.setCreatedByInput('createdBy');
    expect(await chartOfAccountsGroupUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await chartOfAccountsGroupUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await chartOfAccountsGroupUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await chartOfAccountsGroupUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await chartOfAccountsGroupUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await chartOfAccountsGroupUpdatePage.setModifiedByInput('modifiedBy');
    expect(await chartOfAccountsGroupUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await chartOfAccountsGroupUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await chartOfAccountsGroupUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(chartOfAccountsGroupUpdatePage.saveButton);
    await chartOfAccountsGroupUpdatePage.save();
    await waitUntilHidden(chartOfAccountsGroupUpdatePage.saveButton);
    expect(await isVisible(chartOfAccountsGroupUpdatePage.saveButton)).to.be.false;

    expect(await chartOfAccountsGroupComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(chartOfAccountsGroupComponentsPage.table);

    await waitUntilCount(chartOfAccountsGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await chartOfAccountsGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ChartOfAccountsGroup', async () => {
    const deleteButton = chartOfAccountsGroupComponentsPage.getDeleteButton(chartOfAccountsGroupComponentsPage.records.last());
    await click(deleteButton);

    chartOfAccountsGroupDeleteDialog = new ChartOfAccountsGroupDeleteDialog();
    await waitUntilDisplayed(chartOfAccountsGroupDeleteDialog.deleteModal);
    expect(await chartOfAccountsGroupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.chartOfAccountsGroup.delete.question/
    );
    await chartOfAccountsGroupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(chartOfAccountsGroupDeleteDialog.deleteModal);

    expect(await isVisible(chartOfAccountsGroupDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([chartOfAccountsGroupComponentsPage.noRecords, chartOfAccountsGroupComponentsPage.table]);

    const afterCount = (await isVisible(chartOfAccountsGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(chartOfAccountsGroupComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
