import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TimeLimitsComponentsPage, { TimeLimitsDeleteDialog } from './time-limits.page-object';
import TimeLimitsUpdatePage from './time-limits-update.page-object';
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

describe('TimeLimits e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let timeLimitsComponentsPage: TimeLimitsComponentsPage;
  let timeLimitsUpdatePage: TimeLimitsUpdatePage;
  let timeLimitsDeleteDialog: TimeLimitsDeleteDialog;
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

  it('should load TimeLimits', async () => {
    await navBarPage.getEntityPage('time-limits');
    timeLimitsComponentsPage = new TimeLimitsComponentsPage();
    expect(await timeLimitsComponentsPage.title.getText()).to.match(/Time Limits/);

    expect(await timeLimitsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([timeLimitsComponentsPage.noRecords, timeLimitsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(timeLimitsComponentsPage.noRecords)) ? 0 : await getRecordsCount(timeLimitsComponentsPage.table);
  });

  it('should load create TimeLimits page', async () => {
    await timeLimitsComponentsPage.createButton.click();
    timeLimitsUpdatePage = new TimeLimitsUpdatePage();
    expect(await timeLimitsUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.timeLimits.home.createOrEditLabel/);
    await timeLimitsUpdatePage.cancel();
  });

  it('should create and save TimeLimits', async () => {
    await timeLimitsComponentsPage.createButton.click();
    await timeLimitsUpdatePage.setAreaCodeInput('areaCode');
    expect(await timeLimitsUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await timeLimitsUpdatePage.setDescriptionInput('description');
    expect(await timeLimitsUpdatePage.getDescriptionInput()).to.match(/description/);
    await timeLimitsUpdatePage.setCodeInput('code');
    expect(await timeLimitsUpdatePage.getCodeInput()).to.match(/code/);
    await timeLimitsUpdatePage.setCategoryInput('category');
    expect(await timeLimitsUpdatePage.getCategoryInput()).to.match(/category/);
    await timeLimitsUpdatePage.setStartHourInput('5');
    expect(await timeLimitsUpdatePage.getStartHourInput()).to.eq('5');
    await timeLimitsUpdatePage.setStartMinuteInput('5');
    expect(await timeLimitsUpdatePage.getStartMinuteInput()).to.eq('5');
    await timeLimitsUpdatePage.setEndHourInput('5');
    expect(await timeLimitsUpdatePage.getEndHourInput()).to.eq('5');
    await timeLimitsUpdatePage.setEndMinuteInput('5');
    expect(await timeLimitsUpdatePage.getEndMinuteInput()).to.eq('5');
    await timeLimitsUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await timeLimitsUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await timeLimitsUpdatePage.setCreatedByInput('createdBy');
    expect(await timeLimitsUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await timeLimitsUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await timeLimitsUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await timeLimitsUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await timeLimitsUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await timeLimitsUpdatePage.setModifiedByInput('modifiedBy');
    expect(await timeLimitsUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await timeLimitsUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await timeLimitsUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(timeLimitsUpdatePage.saveButton);
    await timeLimitsUpdatePage.save();
    await waitUntilHidden(timeLimitsUpdatePage.saveButton);
    expect(await isVisible(timeLimitsUpdatePage.saveButton)).to.be.false;

    expect(await timeLimitsComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(timeLimitsComponentsPage.table);

    await waitUntilCount(timeLimitsComponentsPage.records, beforeRecordsCount + 1);
    expect(await timeLimitsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TimeLimits', async () => {
    const deleteButton = timeLimitsComponentsPage.getDeleteButton(timeLimitsComponentsPage.records.last());
    await click(deleteButton);

    timeLimitsDeleteDialog = new TimeLimitsDeleteDialog();
    await waitUntilDisplayed(timeLimitsDeleteDialog.deleteModal);
    expect(await timeLimitsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.timeLimits.delete.question/);
    await timeLimitsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(timeLimitsDeleteDialog.deleteModal);

    expect(await isVisible(timeLimitsDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([timeLimitsComponentsPage.noRecords, timeLimitsComponentsPage.table]);

    const afterCount = (await isVisible(timeLimitsComponentsPage.noRecords)) ? 0 : await getRecordsCount(timeLimitsComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
