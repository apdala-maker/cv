import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleTypeComponentsPage, { VehicleTypeDeleteDialog } from './vehicle-type.page-object';
import VehicleTypeUpdatePage from './vehicle-type-update.page-object';
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

describe('VehicleType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleTypeComponentsPage: VehicleTypeComponentsPage;
  let vehicleTypeUpdatePage: VehicleTypeUpdatePage;
  let vehicleTypeDeleteDialog: VehicleTypeDeleteDialog;
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

  it('should load VehicleTypes', async () => {
    await navBarPage.getEntityPage('vehicle-type');
    vehicleTypeComponentsPage = new VehicleTypeComponentsPage();
    expect(await vehicleTypeComponentsPage.title.getText()).to.match(/Vehicle Types/);

    expect(await vehicleTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([vehicleTypeComponentsPage.noRecords, vehicleTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(vehicleTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleTypeComponentsPage.table);
  });

  it('should load create VehicleType page', async () => {
    await vehicleTypeComponentsPage.createButton.click();
    vehicleTypeUpdatePage = new VehicleTypeUpdatePage();
    expect(await vehicleTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleType.home.createOrEditLabel/
    );
    await vehicleTypeUpdatePage.cancel();
  });

  it('should create and save VehicleTypes', async () => {
    await vehicleTypeComponentsPage.createButton.click();
    await vehicleTypeUpdatePage.setAreaCodeInput('areaCode');
    expect(await vehicleTypeUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    const selectedIsMotorBike = await vehicleTypeUpdatePage.getIsMotorBikeInput().isSelected();
    if (selectedIsMotorBike) {
      await vehicleTypeUpdatePage.getIsMotorBikeInput().click();
      expect(await vehicleTypeUpdatePage.getIsMotorBikeInput().isSelected()).to.be.false;
    } else {
      await vehicleTypeUpdatePage.getIsMotorBikeInput().click();
      expect(await vehicleTypeUpdatePage.getIsMotorBikeInput().isSelected()).to.be.true;
    }
    await vehicleTypeUpdatePage.setDescriptionInput('description');
    expect(await vehicleTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await vehicleTypeUpdatePage.setCodeInput('code');
    expect(await vehicleTypeUpdatePage.getCodeInput()).to.match(/code/);
    await vehicleTypeUpdatePage.setNumberOfSeatsInput('5');
    expect(await vehicleTypeUpdatePage.getNumberOfSeatsInput()).to.eq('5');
    await vehicleTypeUpdatePage.setMinimumCCInput('5');
    expect(await vehicleTypeUpdatePage.getMinimumCCInput()).to.eq('5');
    await vehicleTypeUpdatePage.setMaximumCCInput('5');
    expect(await vehicleTypeUpdatePage.getMaximumCCInput()).to.eq('5');
    await vehicleTypeUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await vehicleTypeUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await vehicleTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await vehicleTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await vehicleTypeUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await vehicleTypeUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await vehicleTypeUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await vehicleTypeUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await vehicleTypeUpdatePage.setModifiedByInput('modifiedBy');
    expect(await vehicleTypeUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await vehicleTypeUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await vehicleTypeUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(vehicleTypeUpdatePage.saveButton);
    await vehicleTypeUpdatePage.save();
    await waitUntilHidden(vehicleTypeUpdatePage.saveButton);
    expect(await isVisible(vehicleTypeUpdatePage.saveButton)).to.be.false;

    expect(await vehicleTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(vehicleTypeComponentsPage.table);

    await waitUntilCount(vehicleTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last VehicleType', async () => {
    const deleteButton = vehicleTypeComponentsPage.getDeleteButton(vehicleTypeComponentsPage.records.last());
    await click(deleteButton);

    vehicleTypeDeleteDialog = new VehicleTypeDeleteDialog();
    await waitUntilDisplayed(vehicleTypeDeleteDialog.deleteModal);
    expect(await vehicleTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.vehicleType.delete.question/);
    await vehicleTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleTypeDeleteDialog.deleteModal);

    expect(await isVisible(vehicleTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([vehicleTypeComponentsPage.noRecords, vehicleTypeComponentsPage.table]);

    const afterCount = (await isVisible(vehicleTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(vehicleTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
