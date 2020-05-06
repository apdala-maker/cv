import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMappingComponentsPage, { VehicleMappingDeleteDialog } from './vehicle-mapping.page-object';
import VehicleMappingUpdatePage from './vehicle-mapping-update.page-object';
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

describe('VehicleMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMappingComponentsPage: VehicleMappingComponentsPage;
  let vehicleMappingUpdatePage: VehicleMappingUpdatePage;
  let vehicleMappingDeleteDialog: VehicleMappingDeleteDialog;
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

  it('should load VehicleMappings', async () => {
    await navBarPage.getEntityPage('vehicle-mapping');
    vehicleMappingComponentsPage = new VehicleMappingComponentsPage();
    expect(await vehicleMappingComponentsPage.title.getText()).to.match(/Vehicle Mappings/);

    expect(await vehicleMappingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([vehicleMappingComponentsPage.noRecords, vehicleMappingComponentsPage.table]);

    beforeRecordsCount = (await isVisible(vehicleMappingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMappingComponentsPage.table);
  });

  it('should load create VehicleMapping page', async () => {
    await vehicleMappingComponentsPage.createButton.click();
    vehicleMappingUpdatePage = new VehicleMappingUpdatePage();
    expect(await vehicleMappingUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleMapping.home.createOrEditLabel/
    );
    await vehicleMappingUpdatePage.cancel();
  });

  it('should create and save VehicleMappings', async () => {
    await vehicleMappingComponentsPage.createButton.click();
    await vehicleMappingUpdatePage.setMakeCodeInput('makeCode');
    expect(await vehicleMappingUpdatePage.getMakeCodeInput()).to.match(/makeCode/);
    await vehicleMappingUpdatePage.setUserCodeInput('userCode');
    expect(await vehicleMappingUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await vehicleMappingUpdatePage.setModelCodeInput('modelCode');
    expect(await vehicleMappingUpdatePage.getModelCodeInput()).to.match(/modelCode/);
    await vehicleMappingUpdatePage.setYearInput('5');
    expect(await vehicleMappingUpdatePage.getYearInput()).to.eq('5');
    await vehicleMappingUpdatePage.setRegistrationNumberInput('registrationNumber');
    expect(await vehicleMappingUpdatePage.getRegistrationNumberInput()).to.match(/registrationNumber/);
    await vehicleMappingUpdatePage.setVehicleTypeCodeInput('vehicleTypeCode');
    expect(await vehicleMappingUpdatePage.getVehicleTypeCodeInput()).to.match(/vehicleTypeCode/);
    await vehicleMappingUpdatePage.setAreaCodeInput('areaCode');
    expect(await vehicleMappingUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    const selectedIsApproved = await vehicleMappingUpdatePage.getIsApprovedInput().isSelected();
    if (selectedIsApproved) {
      await vehicleMappingUpdatePage.getIsApprovedInput().click();
      expect(await vehicleMappingUpdatePage.getIsApprovedInput().isSelected()).to.be.false;
    } else {
      await vehicleMappingUpdatePage.getIsApprovedInput().click();
      expect(await vehicleMappingUpdatePage.getIsApprovedInput().isSelected()).to.be.true;
    }
    await vehicleMappingUpdatePage.setApprovedByInput('approvedBy');
    expect(await vehicleMappingUpdatePage.getApprovedByInput()).to.match(/approvedBy/);
    await vehicleMappingUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await vehicleMappingUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await vehicleMappingUpdatePage.setCreatedByInput('createdBy');
    expect(await vehicleMappingUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await vehicleMappingUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await vehicleMappingUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await vehicleMappingUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await vehicleMappingUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await vehicleMappingUpdatePage.setModifiedByInput('modifiedBy');
    expect(await vehicleMappingUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await vehicleMappingUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await vehicleMappingUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(vehicleMappingUpdatePage.saveButton);
    await vehicleMappingUpdatePage.save();
    await waitUntilHidden(vehicleMappingUpdatePage.saveButton);
    expect(await isVisible(vehicleMappingUpdatePage.saveButton)).to.be.false;

    expect(await vehicleMappingComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(vehicleMappingComponentsPage.table);

    await waitUntilCount(vehicleMappingComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMappingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last VehicleMapping', async () => {
    const deleteButton = vehicleMappingComponentsPage.getDeleteButton(vehicleMappingComponentsPage.records.last());
    await click(deleteButton);

    vehicleMappingDeleteDialog = new VehicleMappingDeleteDialog();
    await waitUntilDisplayed(vehicleMappingDeleteDialog.deleteModal);
    expect(await vehicleMappingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleMapping.delete.question/
    );
    await vehicleMappingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleMappingDeleteDialog.deleteModal);

    expect(await isVisible(vehicleMappingDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([vehicleMappingComponentsPage.noRecords, vehicleMappingComponentsPage.table]);

    const afterCount = (await isVisible(vehicleMappingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMappingComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
