import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverComponentsPage, { DriverDeleteDialog } from './driver.page-object';
import DriverUpdatePage from './driver-update.page-object';
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

describe('Driver e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverComponentsPage: DriverComponentsPage;
  let driverUpdatePage: DriverUpdatePage;
  let driverDeleteDialog: DriverDeleteDialog;
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

  it('should load Drivers', async () => {
    await navBarPage.getEntityPage('driver');
    driverComponentsPage = new DriverComponentsPage();
    expect(await driverComponentsPage.title.getText()).to.match(/Drivers/);

    expect(await driverComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverComponentsPage.noRecords, driverComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverComponentsPage.noRecords)) ? 0 : await getRecordsCount(driverComponentsPage.table);
  });

  it('should load create Driver page', async () => {
    await driverComponentsPage.createButton.click();
    driverUpdatePage = new DriverUpdatePage();
    expect(await driverUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.driver.home.createOrEditLabel/);
    await driverUpdatePage.cancel();
  });

  it('should create and save Drivers', async () => {
    await driverComponentsPage.createButton.click();
    await driverUpdatePage.setStatusInput('status');
    expect(await driverUpdatePage.getStatusInput()).to.match(/status/);
    const selectedISDriving = await driverUpdatePage.getISDrivingInput().isSelected();
    if (selectedISDriving) {
      await driverUpdatePage.getISDrivingInput().click();
      expect(await driverUpdatePage.getISDrivingInput().isSelected()).to.be.false;
    } else {
      await driverUpdatePage.getISDrivingInput().click();
      expect(await driverUpdatePage.getISDrivingInput().isSelected()).to.be.true;
    }
    await driverUpdatePage.setOntripInput('ontrip');
    expect(await driverUpdatePage.getOntripInput()).to.match(/ontrip/);
    const selectedISApproved = await driverUpdatePage.getISApprovedInput().isSelected();
    if (selectedISApproved) {
      await driverUpdatePage.getISApprovedInput().click();
      expect(await driverUpdatePage.getISApprovedInput().isSelected()).to.be.false;
    } else {
      await driverUpdatePage.getISApprovedInput().click();
      expect(await driverUpdatePage.getISApprovedInput().isSelected()).to.be.true;
    }
    await driverUpdatePage.setDriverCodeInput('driverCode');
    expect(await driverUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await driverUpdatePage.setTripCountInput('5');
    expect(await driverUpdatePage.getTripCountInput()).to.eq('5');
    await driverUpdatePage.setAreaCodeInput('areaCode');
    expect(await driverUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await driverUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await driverUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await driverUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await driverUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await driverUpdatePage.latestLocationSelectLastOption();
    await driverUpdatePage.myVehicleSelectLastOption();
    await driverUpdatePage.mongoFileTypesSelectLastOption();
    await waitUntilDisplayed(driverUpdatePage.saveButton);
    await driverUpdatePage.save();
    await waitUntilHidden(driverUpdatePage.saveButton);
    expect(await isVisible(driverUpdatePage.saveButton)).to.be.false;

    expect(await driverComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverComponentsPage.table);

    await waitUntilCount(driverComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Driver', async () => {
    const deleteButton = driverComponentsPage.getDeleteButton(driverComponentsPage.records.last());
    await click(deleteButton);

    driverDeleteDialog = new DriverDeleteDialog();
    await waitUntilDisplayed(driverDeleteDialog.deleteModal);
    expect(await driverDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.driver.delete.question/);
    await driverDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverDeleteDialog.deleteModal);

    expect(await isVisible(driverDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverComponentsPage.noRecords, driverComponentsPage.table]);

    const afterCount = (await isVisible(driverComponentsPage.noRecords)) ? 0 : await getRecordsCount(driverComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
