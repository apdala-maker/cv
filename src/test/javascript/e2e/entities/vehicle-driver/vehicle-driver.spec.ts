import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleDriverComponentsPage, { VehicleDriverDeleteDialog } from './vehicle-driver.page-object';
import VehicleDriverUpdatePage from './vehicle-driver-update.page-object';
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

describe('VehicleDriver e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleDriverComponentsPage: VehicleDriverComponentsPage;
  let vehicleDriverUpdatePage: VehicleDriverUpdatePage;
  let vehicleDriverDeleteDialog: VehicleDriverDeleteDialog;
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

  it('should load VehicleDrivers', async () => {
    await navBarPage.getEntityPage('vehicle-driver');
    vehicleDriverComponentsPage = new VehicleDriverComponentsPage();
    expect(await vehicleDriverComponentsPage.title.getText()).to.match(/Vehicle Drivers/);

    expect(await vehicleDriverComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([vehicleDriverComponentsPage.noRecords, vehicleDriverComponentsPage.table]);

    beforeRecordsCount = (await isVisible(vehicleDriverComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleDriverComponentsPage.table);
  });

  it('should load create VehicleDriver page', async () => {
    await vehicleDriverComponentsPage.createButton.click();
    vehicleDriverUpdatePage = new VehicleDriverUpdatePage();
    expect(await vehicleDriverUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleDriver.home.createOrEditLabel/
    );
    await vehicleDriverUpdatePage.cancel();
  });

  it('should create and save VehicleDrivers', async () => {
    await vehicleDriverComponentsPage.createButton.click();
    await vehicleDriverUpdatePage.setModelCodeInput('modelCode');
    expect(await vehicleDriverUpdatePage.getModelCodeInput()).to.match(/modelCode/);
    await vehicleDriverUpdatePage.setMakeCodeInput('makeCode');
    expect(await vehicleDriverUpdatePage.getMakeCodeInput()).to.match(/makeCode/);
    await vehicleDriverUpdatePage.setVehicleTypeCodeInput('vehicleTypeCode');
    expect(await vehicleDriverUpdatePage.getVehicleTypeCodeInput()).to.match(/vehicleTypeCode/);
    await vehicleDriverUpdatePage.setYearInput('5');
    expect(await vehicleDriverUpdatePage.getYearInput()).to.eq('5');
    await vehicleDriverUpdatePage.setRegistrationNumberInput('registrationNumber');
    expect(await vehicleDriverUpdatePage.getRegistrationNumberInput()).to.match(/registrationNumber/);
    await vehicleDriverUpdatePage.setColorInput('color');
    expect(await vehicleDriverUpdatePage.getColorInput()).to.match(/color/);
    await waitUntilDisplayed(vehicleDriverUpdatePage.saveButton);
    await vehicleDriverUpdatePage.save();
    await waitUntilHidden(vehicleDriverUpdatePage.saveButton);
    expect(await isVisible(vehicleDriverUpdatePage.saveButton)).to.be.false;

    expect(await vehicleDriverComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(vehicleDriverComponentsPage.table);

    await waitUntilCount(vehicleDriverComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleDriverComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last VehicleDriver', async () => {
    const deleteButton = vehicleDriverComponentsPage.getDeleteButton(vehicleDriverComponentsPage.records.last());
    await click(deleteButton);

    vehicleDriverDeleteDialog = new VehicleDriverDeleteDialog();
    await waitUntilDisplayed(vehicleDriverDeleteDialog.deleteModal);
    expect(await vehicleDriverDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleDriver.delete.question/
    );
    await vehicleDriverDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleDriverDeleteDialog.deleteModal);

    expect(await isVisible(vehicleDriverDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([vehicleDriverComponentsPage.noRecords, vehicleDriverComponentsPage.table]);

    const afterCount = (await isVisible(vehicleDriverComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleDriverComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
