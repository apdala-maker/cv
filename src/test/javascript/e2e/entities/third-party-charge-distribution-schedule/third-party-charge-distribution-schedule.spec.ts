import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ThirdPartyChargeDistributionScheduleComponentsPage, {
  ThirdPartyChargeDistributionScheduleDeleteDialog
} from './third-party-charge-distribution-schedule.page-object';
import ThirdPartyChargeDistributionScheduleUpdatePage from './third-party-charge-distribution-schedule-update.page-object';
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

describe('ThirdPartyChargeDistributionSchedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let thirdPartyChargeDistributionScheduleComponentsPage: ThirdPartyChargeDistributionScheduleComponentsPage;
  let thirdPartyChargeDistributionScheduleUpdatePage: ThirdPartyChargeDistributionScheduleUpdatePage;
  let thirdPartyChargeDistributionScheduleDeleteDialog: ThirdPartyChargeDistributionScheduleDeleteDialog;
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

  it('should load ThirdPartyChargeDistributionSchedules', async () => {
    await navBarPage.getEntityPage('third-party-charge-distribution-schedule');
    thirdPartyChargeDistributionScheduleComponentsPage = new ThirdPartyChargeDistributionScheduleComponentsPage();
    expect(await thirdPartyChargeDistributionScheduleComponentsPage.title.getText()).to.match(/Third Party Charge Distribution Schedules/);

    expect(await thirdPartyChargeDistributionScheduleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([
      thirdPartyChargeDistributionScheduleComponentsPage.noRecords,
      thirdPartyChargeDistributionScheduleComponentsPage.table
    ]);

    beforeRecordsCount = (await isVisible(thirdPartyChargeDistributionScheduleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(thirdPartyChargeDistributionScheduleComponentsPage.table);
  });

  it('should load create ThirdPartyChargeDistributionSchedule page', async () => {
    await thirdPartyChargeDistributionScheduleComponentsPage.createButton.click();
    thirdPartyChargeDistributionScheduleUpdatePage = new ThirdPartyChargeDistributionScheduleUpdatePage();
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.createOrEditLabel/
    );
    await thirdPartyChargeDistributionScheduleUpdatePage.cancel();
  });

  it('should create and save ThirdPartyChargeDistributionSchedules', async () => {
    await thirdPartyChargeDistributionScheduleComponentsPage.createButton.click();
    await thirdPartyChargeDistributionScheduleUpdatePage.setCodeInput('code');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getCodeInput()).to.match(/code/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setPartyCodeInput('partyCode');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getPartyCodeInput()).to.match(/partyCode/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setTransactionCodeInput('transactionCode');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getTransactionCodeInput()).to.match(/transactionCode/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setChargeModeInput('chargeMode');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getChargeModeInput()).to.match(/chargeMode/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setValueInput('value');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getValueInput()).to.match(/value/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setStatusInput('status');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getStatusInput()).to.match(/status/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setAreaCodeInput('areaCode');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await thirdPartyChargeDistributionScheduleUpdatePage.setCreatedByInput('createdBy');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await thirdPartyChargeDistributionScheduleUpdatePage.setModifiedByInput('modifiedBy');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await thirdPartyChargeDistributionScheduleUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await thirdPartyChargeDistributionScheduleUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(thirdPartyChargeDistributionScheduleUpdatePage.saveButton);
    await thirdPartyChargeDistributionScheduleUpdatePage.save();
    await waitUntilHidden(thirdPartyChargeDistributionScheduleUpdatePage.saveButton);
    expect(await isVisible(thirdPartyChargeDistributionScheduleUpdatePage.saveButton)).to.be.false;

    expect(await thirdPartyChargeDistributionScheduleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(thirdPartyChargeDistributionScheduleComponentsPage.table);

    await waitUntilCount(thirdPartyChargeDistributionScheduleComponentsPage.records, beforeRecordsCount + 1);
    expect(await thirdPartyChargeDistributionScheduleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ThirdPartyChargeDistributionSchedule', async () => {
    const deleteButton = thirdPartyChargeDistributionScheduleComponentsPage.getDeleteButton(
      thirdPartyChargeDistributionScheduleComponentsPage.records.last()
    );
    await click(deleteButton);

    thirdPartyChargeDistributionScheduleDeleteDialog = new ThirdPartyChargeDistributionScheduleDeleteDialog();
    await waitUntilDisplayed(thirdPartyChargeDistributionScheduleDeleteDialog.deleteModal);
    expect(await thirdPartyChargeDistributionScheduleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.thirdPartyChargeDistributionSchedule.delete.question/
    );
    await thirdPartyChargeDistributionScheduleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(thirdPartyChargeDistributionScheduleDeleteDialog.deleteModal);

    expect(await isVisible(thirdPartyChargeDistributionScheduleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([
      thirdPartyChargeDistributionScheduleComponentsPage.noRecords,
      thirdPartyChargeDistributionScheduleComponentsPage.table
    ]);

    const afterCount = (await isVisible(thirdPartyChargeDistributionScheduleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(thirdPartyChargeDistributionScheduleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
