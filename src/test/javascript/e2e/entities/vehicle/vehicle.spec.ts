import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleComponentsPage, { VehicleDeleteDialog } from './vehicle.page-object';
import VehicleUpdatePage from './vehicle-update.page-object';
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

describe('Vehicle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleComponentsPage: VehicleComponentsPage;
  let vehicleUpdatePage: VehicleUpdatePage;
  let vehicleDeleteDialog: VehicleDeleteDialog;
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

  it('should load Vehicles', async () => {
    await navBarPage.getEntityPage('vehicle');
    vehicleComponentsPage = new VehicleComponentsPage();
    expect(await vehicleComponentsPage.title.getText()).to.match(/Vehicles/);

    expect(await vehicleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([vehicleComponentsPage.noRecords, vehicleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(vehicleComponentsPage.noRecords)) ? 0 : await getRecordsCount(vehicleComponentsPage.table);
  });

  it('should load create Vehicle page', async () => {
    await vehicleComponentsPage.createButton.click();
    vehicleUpdatePage = new VehicleUpdatePage();
    expect(await vehicleUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.vehicle.home.createOrEditLabel/);
    await vehicleUpdatePage.cancel();
  });

  it('should create and save Vehicles', async () => {
    await vehicleComponentsPage.createButton.click();
    await vehicleUpdatePage.setModelNameInput('modelName');
    expect(await vehicleUpdatePage.getModelNameInput()).to.match(/modelName/);
    await vehicleUpdatePage.setModelCodeInput('modelCode');
    expect(await vehicleUpdatePage.getModelCodeInput()).to.match(/modelCode/);
    await vehicleUpdatePage.setMakeCodeInput('makeCode');
    expect(await vehicleUpdatePage.getMakeCodeInput()).to.match(/makeCode/);
    await vehicleUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await vehicleUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await vehicleUpdatePage.setCreatedByInput('createdBy');
    expect(await vehicleUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await vehicleUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await vehicleUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await vehicleUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await vehicleUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await vehicleUpdatePage.setModifiedByInput('modifiedBy');
    expect(await vehicleUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await vehicleUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await vehicleUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(vehicleUpdatePage.saveButton);
    await vehicleUpdatePage.save();
    await waitUntilHidden(vehicleUpdatePage.saveButton);
    expect(await isVisible(vehicleUpdatePage.saveButton)).to.be.false;

    expect(await vehicleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(vehicleComponentsPage.table);

    await waitUntilCount(vehicleComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Vehicle', async () => {
    const deleteButton = vehicleComponentsPage.getDeleteButton(vehicleComponentsPage.records.last());
    await click(deleteButton);

    vehicleDeleteDialog = new VehicleDeleteDialog();
    await waitUntilDisplayed(vehicleDeleteDialog.deleteModal);
    expect(await vehicleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.vehicle.delete.question/);
    await vehicleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleDeleteDialog.deleteModal);

    expect(await isVisible(vehicleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([vehicleComponentsPage.noRecords, vehicleComponentsPage.table]);

    const afterCount = (await isVisible(vehicleComponentsPage.noRecords)) ? 0 : await getRecordsCount(vehicleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
