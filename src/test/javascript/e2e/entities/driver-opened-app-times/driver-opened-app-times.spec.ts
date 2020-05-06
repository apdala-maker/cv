import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverOpenedAppTimesComponentsPage, { DriverOpenedAppTimesDeleteDialog } from './driver-opened-app-times.page-object';
import DriverOpenedAppTimesUpdatePage from './driver-opened-app-times-update.page-object';
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

describe('DriverOpenedAppTimes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverOpenedAppTimesComponentsPage: DriverOpenedAppTimesComponentsPage;
  let driverOpenedAppTimesUpdatePage: DriverOpenedAppTimesUpdatePage;
  let driverOpenedAppTimesDeleteDialog: DriverOpenedAppTimesDeleteDialog;
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

  it('should load DriverOpenedAppTimes', async () => {
    await navBarPage.getEntityPage('driver-opened-app-times');
    driverOpenedAppTimesComponentsPage = new DriverOpenedAppTimesComponentsPage();
    expect(await driverOpenedAppTimesComponentsPage.title.getText()).to.match(/Driver Opened App Times/);

    expect(await driverOpenedAppTimesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverOpenedAppTimesComponentsPage.noRecords, driverOpenedAppTimesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverOpenedAppTimesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverOpenedAppTimesComponentsPage.table);
  });

  it('should load create DriverOpenedAppTimes page', async () => {
    await driverOpenedAppTimesComponentsPage.createButton.click();
    driverOpenedAppTimesUpdatePage = new DriverOpenedAppTimesUpdatePage();
    expect(await driverOpenedAppTimesUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverOpenedAppTimes.home.createOrEditLabel/
    );
    await driverOpenedAppTimesUpdatePage.cancel();
  });

  it('should create and save DriverOpenedAppTimes', async () => {
    await driverOpenedAppTimesComponentsPage.createButton.click();
    await driverOpenedAppTimesUpdatePage.setDriverCodeInput('driverCode');
    expect(await driverOpenedAppTimesUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await driverOpenedAppTimesUpdatePage.setDateOpenedInput('01-01-2001');
    expect(await driverOpenedAppTimesUpdatePage.getDateOpenedInput()).to.eq('2001-01-01');
    await driverOpenedAppTimesUpdatePage.setTripCountInput('5');
    expect(await driverOpenedAppTimesUpdatePage.getTripCountInput()).to.eq('5');
    await driverOpenedAppTimesUpdatePage.setAreaCodeInput('areaCode');
    expect(await driverOpenedAppTimesUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await driverOpenedAppTimesUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await driverOpenedAppTimesUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await driverOpenedAppTimesUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await driverOpenedAppTimesUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(driverOpenedAppTimesUpdatePage.saveButton);
    await driverOpenedAppTimesUpdatePage.save();
    await waitUntilHidden(driverOpenedAppTimesUpdatePage.saveButton);
    expect(await isVisible(driverOpenedAppTimesUpdatePage.saveButton)).to.be.false;

    expect(await driverOpenedAppTimesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverOpenedAppTimesComponentsPage.table);

    await waitUntilCount(driverOpenedAppTimesComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverOpenedAppTimesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DriverOpenedAppTimes', async () => {
    const deleteButton = driverOpenedAppTimesComponentsPage.getDeleteButton(driverOpenedAppTimesComponentsPage.records.last());
    await click(deleteButton);

    driverOpenedAppTimesDeleteDialog = new DriverOpenedAppTimesDeleteDialog();
    await waitUntilDisplayed(driverOpenedAppTimesDeleteDialog.deleteModal);
    expect(await driverOpenedAppTimesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverOpenedAppTimes.delete.question/
    );
    await driverOpenedAppTimesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverOpenedAppTimesDeleteDialog.deleteModal);

    expect(await isVisible(driverOpenedAppTimesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverOpenedAppTimesComponentsPage.noRecords, driverOpenedAppTimesComponentsPage.table]);

    const afterCount = (await isVisible(driverOpenedAppTimesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverOpenedAppTimesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
