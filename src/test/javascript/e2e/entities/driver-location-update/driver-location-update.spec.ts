import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverLocationUpdateComponentsPage, { DriverLocationUpdateDeleteDialog } from './driver-location-update.page-object';
import DriverLocationUpdateUpdatePage from './driver-location-update-update.page-object';
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

describe('DriverLocationUpdate e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverLocationUpdateComponentsPage: DriverLocationUpdateComponentsPage;
  let driverLocationUpdateUpdatePage: DriverLocationUpdateUpdatePage;
  let driverLocationUpdateDeleteDialog: DriverLocationUpdateDeleteDialog;
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

  it('should load DriverLocationUpdates', async () => {
    await navBarPage.getEntityPage('driver-location-update');
    driverLocationUpdateComponentsPage = new DriverLocationUpdateComponentsPage();
    expect(await driverLocationUpdateComponentsPage.title.getText()).to.match(/Driver Location Updates/);

    expect(await driverLocationUpdateComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverLocationUpdateComponentsPage.noRecords, driverLocationUpdateComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverLocationUpdateComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverLocationUpdateComponentsPage.table);
  });

  it('should load create DriverLocationUpdate page', async () => {
    await driverLocationUpdateComponentsPage.createButton.click();
    driverLocationUpdateUpdatePage = new DriverLocationUpdateUpdatePage();
    expect(await driverLocationUpdateUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverLocationUpdate.home.createOrEditLabel/
    );
    await driverLocationUpdateUpdatePage.cancel();
  });

  it('should create and save DriverLocationUpdates', async () => {
    await driverLocationUpdateComponentsPage.createButton.click();
    await driverLocationUpdateUpdatePage.setDriverCodeInput('driverCode');
    expect(await driverLocationUpdateUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await driverLocationUpdateUpdatePage.setStartTimeInput('01-01-2001');
    expect(await driverLocationUpdateUpdatePage.getStartTimeInput()).to.eq('2001-01-01');
    await driverLocationUpdateUpdatePage.setAreaCodeInput('areaCode');
    expect(await driverLocationUpdateUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await driverLocationUpdateUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await driverLocationUpdateUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await driverLocationUpdateUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await driverLocationUpdateUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await driverLocationUpdateUpdatePage.locationDataSelectLastOption();
    await waitUntilDisplayed(driverLocationUpdateUpdatePage.saveButton);
    await driverLocationUpdateUpdatePage.save();
    await waitUntilHidden(driverLocationUpdateUpdatePage.saveButton);
    expect(await isVisible(driverLocationUpdateUpdatePage.saveButton)).to.be.false;

    expect(await driverLocationUpdateComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverLocationUpdateComponentsPage.table);

    await waitUntilCount(driverLocationUpdateComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverLocationUpdateComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DriverLocationUpdate', async () => {
    const deleteButton = driverLocationUpdateComponentsPage.getDeleteButton(driverLocationUpdateComponentsPage.records.last());
    await click(deleteButton);

    driverLocationUpdateDeleteDialog = new DriverLocationUpdateDeleteDialog();
    await waitUntilDisplayed(driverLocationUpdateDeleteDialog.deleteModal);
    expect(await driverLocationUpdateDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.driverLocationUpdate.delete.question/
    );
    await driverLocationUpdateDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverLocationUpdateDeleteDialog.deleteModal);

    expect(await isVisible(driverLocationUpdateDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverLocationUpdateComponentsPage.noRecords, driverLocationUpdateComponentsPage.table]);

    const afterCount = (await isVisible(driverLocationUpdateComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverLocationUpdateComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
