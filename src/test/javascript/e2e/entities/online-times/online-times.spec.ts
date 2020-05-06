import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OnlineTimesComponentsPage, { OnlineTimesDeleteDialog } from './online-times.page-object';
import OnlineTimesUpdatePage from './online-times-update.page-object';
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

describe('OnlineTimes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let onlineTimesComponentsPage: OnlineTimesComponentsPage;
  let onlineTimesUpdatePage: OnlineTimesUpdatePage;
  let onlineTimesDeleteDialog: OnlineTimesDeleteDialog;
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

  it('should load OnlineTimes', async () => {
    await navBarPage.getEntityPage('online-times');
    onlineTimesComponentsPage = new OnlineTimesComponentsPage();
    expect(await onlineTimesComponentsPage.title.getText()).to.match(/Online Times/);

    expect(await onlineTimesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([onlineTimesComponentsPage.noRecords, onlineTimesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(onlineTimesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(onlineTimesComponentsPage.table);
  });

  it('should load create OnlineTimes page', async () => {
    await onlineTimesComponentsPage.createButton.click();
    onlineTimesUpdatePage = new OnlineTimesUpdatePage();
    expect(await onlineTimesUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.onlineTimes.home.createOrEditLabel/
    );
    await onlineTimesUpdatePage.cancel();
  });

  it('should create and save OnlineTimes', async () => {
    await onlineTimesComponentsPage.createButton.click();
    await onlineTimesUpdatePage.setStartInput('01-01-2001');
    expect(await onlineTimesUpdatePage.getStartInput()).to.eq('2001-01-01');
    await onlineTimesUpdatePage.setFinishInput('01-01-2001');
    expect(await onlineTimesUpdatePage.getFinishInput()).to.eq('2001-01-01');
    await onlineTimesUpdatePage.setDriverCodeInput('driverCode');
    expect(await onlineTimesUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await onlineTimesUpdatePage.setAreaCodeInput('areaCode');
    expect(await onlineTimesUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await onlineTimesUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await onlineTimesUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await onlineTimesUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await onlineTimesUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(onlineTimesUpdatePage.saveButton);
    await onlineTimesUpdatePage.save();
    await waitUntilHidden(onlineTimesUpdatePage.saveButton);
    expect(await isVisible(onlineTimesUpdatePage.saveButton)).to.be.false;

    expect(await onlineTimesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(onlineTimesComponentsPage.table);

    await waitUntilCount(onlineTimesComponentsPage.records, beforeRecordsCount + 1);
    expect(await onlineTimesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last OnlineTimes', async () => {
    const deleteButton = onlineTimesComponentsPage.getDeleteButton(onlineTimesComponentsPage.records.last());
    await click(deleteButton);

    onlineTimesDeleteDialog = new OnlineTimesDeleteDialog();
    await waitUntilDisplayed(onlineTimesDeleteDialog.deleteModal);
    expect(await onlineTimesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.onlineTimes.delete.question/);
    await onlineTimesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(onlineTimesDeleteDialog.deleteModal);

    expect(await isVisible(onlineTimesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([onlineTimesComponentsPage.noRecords, onlineTimesComponentsPage.table]);

    const afterCount = (await isVisible(onlineTimesComponentsPage.noRecords)) ? 0 : await getRecordsCount(onlineTimesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
