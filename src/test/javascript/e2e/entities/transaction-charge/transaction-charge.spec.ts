import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransactionChargeComponentsPage, { TransactionChargeDeleteDialog } from './transaction-charge.page-object';
import TransactionChargeUpdatePage from './transaction-charge-update.page-object';
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

describe('TransactionCharge e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionChargeComponentsPage: TransactionChargeComponentsPage;
  let transactionChargeUpdatePage: TransactionChargeUpdatePage;
  let transactionChargeDeleteDialog: TransactionChargeDeleteDialog;
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

  it('should load TransactionCharges', async () => {
    await navBarPage.getEntityPage('transaction-charge');
    transactionChargeComponentsPage = new TransactionChargeComponentsPage();
    expect(await transactionChargeComponentsPage.title.getText()).to.match(/Transaction Charges/);

    expect(await transactionChargeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([transactionChargeComponentsPage.noRecords, transactionChargeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(transactionChargeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionChargeComponentsPage.table);
  });

  it('should load create TransactionCharge page', async () => {
    await transactionChargeComponentsPage.createButton.click();
    transactionChargeUpdatePage = new TransactionChargeUpdatePage();
    expect(await transactionChargeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.transactionCharge.home.createOrEditLabel/
    );
    await transactionChargeUpdatePage.cancel();
  });

  it('should create and save TransactionCharges', async () => {
    await transactionChargeComponentsPage.createButton.click();
    await transactionChargeUpdatePage.setAreaCodeInput('areaCode');
    expect(await transactionChargeUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await transactionChargeUpdatePage.setCodeInput('code');
    expect(await transactionChargeUpdatePage.getCodeInput()).to.match(/code/);
    await transactionChargeUpdatePage.categorySelectLastOption();
    await transactionChargeUpdatePage.setDescriptionInput('description');
    expect(await transactionChargeUpdatePage.getDescriptionInput()).to.match(/description/);
    await transactionChargeUpdatePage.setTimeLimitCodeInput('timeLimitCode');
    expect(await transactionChargeUpdatePage.getTimeLimitCodeInput()).to.match(/timeLimitCode/);
    await transactionChargeUpdatePage.setConstantChargeInput('5');
    expect(await transactionChargeUpdatePage.getConstantChargeInput()).to.eq('5');
    await transactionChargeUpdatePage.setChargePerKilometerInput('5');
    expect(await transactionChargeUpdatePage.getChargePerKilometerInput()).to.eq('5');
    await transactionChargeUpdatePage.setChargePerMinuteInput('5');
    expect(await transactionChargeUpdatePage.getChargePerMinuteInput()).to.eq('5');
    await transactionChargeUpdatePage.setStatusInput('status');
    expect(await transactionChargeUpdatePage.getStatusInput()).to.match(/status/);
    await transactionChargeUpdatePage.setVehicleCodeInput('vehicleCode');
    expect(await transactionChargeUpdatePage.getVehicleCodeInput()).to.match(/vehicleCode/);
    await transactionChargeUpdatePage.setTotalMinimumChargeInput('5');
    expect(await transactionChargeUpdatePage.getTotalMinimumChargeInput()).to.eq('5');
    await transactionChargeUpdatePage.setTotalMaximumChargeInput('5');
    expect(await transactionChargeUpdatePage.getTotalMaximumChargeInput()).to.eq('5');
    await transactionChargeUpdatePage.setMinimumSpeedInput('5');
    expect(await transactionChargeUpdatePage.getMinimumSpeedInput()).to.eq('5');
    await transactionChargeUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await transactionChargeUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await transactionChargeUpdatePage.setCreatedByInput('createdBy');
    expect(await transactionChargeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await transactionChargeUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await transactionChargeUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await transactionChargeUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await transactionChargeUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await transactionChargeUpdatePage.setModifiedByInput('modifiedBy');
    expect(await transactionChargeUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await transactionChargeUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await transactionChargeUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(transactionChargeUpdatePage.saveButton);
    await transactionChargeUpdatePage.save();
    await waitUntilHidden(transactionChargeUpdatePage.saveButton);
    expect(await isVisible(transactionChargeUpdatePage.saveButton)).to.be.false;

    expect(await transactionChargeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(transactionChargeComponentsPage.table);

    await waitUntilCount(transactionChargeComponentsPage.records, beforeRecordsCount + 1);
    expect(await transactionChargeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TransactionCharge', async () => {
    const deleteButton = transactionChargeComponentsPage.getDeleteButton(transactionChargeComponentsPage.records.last());
    await click(deleteButton);

    transactionChargeDeleteDialog = new TransactionChargeDeleteDialog();
    await waitUntilDisplayed(transactionChargeDeleteDialog.deleteModal);
    expect(await transactionChargeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.transactionCharge.delete.question/
    );
    await transactionChargeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(transactionChargeDeleteDialog.deleteModal);

    expect(await isVisible(transactionChargeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([transactionChargeComponentsPage.noRecords, transactionChargeComponentsPage.table]);

    const afterCount = (await isVisible(transactionChargeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionChargeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
