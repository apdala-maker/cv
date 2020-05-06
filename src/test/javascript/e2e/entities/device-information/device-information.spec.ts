import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DeviceInformationComponentsPage, { DeviceInformationDeleteDialog } from './device-information.page-object';
import DeviceInformationUpdatePage from './device-information-update.page-object';
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

describe('DeviceInformation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deviceInformationComponentsPage: DeviceInformationComponentsPage;
  let deviceInformationUpdatePage: DeviceInformationUpdatePage;
  let deviceInformationDeleteDialog: DeviceInformationDeleteDialog;
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

  it('should load DeviceInformations', async () => {
    await navBarPage.getEntityPage('device-information');
    deviceInformationComponentsPage = new DeviceInformationComponentsPage();
    expect(await deviceInformationComponentsPage.title.getText()).to.match(/Device Informations/);

    expect(await deviceInformationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([deviceInformationComponentsPage.noRecords, deviceInformationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(deviceInformationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(deviceInformationComponentsPage.table);
  });

  it('should load create DeviceInformation page', async () => {
    await deviceInformationComponentsPage.createButton.click();
    deviceInformationUpdatePage = new DeviceInformationUpdatePage();
    expect(await deviceInformationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.deviceInformation.home.createOrEditLabel/
    );
    await deviceInformationUpdatePage.cancel();
  });

  it('should create and save DeviceInformations', async () => {
    await deviceInformationComponentsPage.createButton.click();
    await deviceInformationUpdatePage.setUserCodeInput('userCode');
    expect(await deviceInformationUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await deviceInformationUpdatePage.setUserTypeInput('userType');
    expect(await deviceInformationUpdatePage.getUserTypeInput()).to.match(/userType/);
    await deviceInformationUpdatePage.setModelInput('model');
    expect(await deviceInformationUpdatePage.getModelInput()).to.match(/model/);
    await deviceInformationUpdatePage.setNameInput('name');
    expect(await deviceInformationUpdatePage.getNameInput()).to.match(/name/);
    await deviceInformationUpdatePage.setWidthInput('5');
    expect(await deviceInformationUpdatePage.getWidthInput()).to.eq('5');
    await deviceInformationUpdatePage.setLengthInput('5');
    expect(await deviceInformationUpdatePage.getLengthInput()).to.eq('5');
    await deviceInformationUpdatePage.setOSInput('oS');
    expect(await deviceInformationUpdatePage.getOSInput()).to.match(/oS/);
    await deviceInformationUpdatePage.setManufacturerInput('manufacturer');
    expect(await deviceInformationUpdatePage.getManufacturerInput()).to.match(/manufacturer/);
    await deviceInformationUpdatePage.setDeviceIdInput('deviceId');
    expect(await deviceInformationUpdatePage.getDeviceIdInput()).to.match(/deviceId/);
    await deviceInformationUpdatePage.setOsVersionInput('osVersion');
    expect(await deviceInformationUpdatePage.getOsVersionInput()).to.match(/osVersion/);
    await deviceInformationUpdatePage.setBrandInput('brand');
    expect(await deviceInformationUpdatePage.getBrandInput()).to.match(/brand/);
    await deviceInformationUpdatePage.setScreenSizeInput('screenSize');
    expect(await deviceInformationUpdatePage.getScreenSizeInput()).to.match(/screenSize/);
    await deviceInformationUpdatePage.setSerialInput('serial');
    expect(await deviceInformationUpdatePage.getSerialInput()).to.match(/serial/);
    await deviceInformationUpdatePage.setAreaCodeInput('areaCode');
    expect(await deviceInformationUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await deviceInformationUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await deviceInformationUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await deviceInformationUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await deviceInformationUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(deviceInformationUpdatePage.saveButton);
    await deviceInformationUpdatePage.save();
    await waitUntilHidden(deviceInformationUpdatePage.saveButton);
    expect(await isVisible(deviceInformationUpdatePage.saveButton)).to.be.false;

    expect(await deviceInformationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(deviceInformationComponentsPage.table);

    await waitUntilCount(deviceInformationComponentsPage.records, beforeRecordsCount + 1);
    expect(await deviceInformationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DeviceInformation', async () => {
    const deleteButton = deviceInformationComponentsPage.getDeleteButton(deviceInformationComponentsPage.records.last());
    await click(deleteButton);

    deviceInformationDeleteDialog = new DeviceInformationDeleteDialog();
    await waitUntilDisplayed(deviceInformationDeleteDialog.deleteModal);
    expect(await deviceInformationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.deviceInformation.delete.question/
    );
    await deviceInformationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(deviceInformationDeleteDialog.deleteModal);

    expect(await isVisible(deviceInformationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([deviceInformationComponentsPage.noRecords, deviceInformationComponentsPage.table]);

    const afterCount = (await isVisible(deviceInformationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(deviceInformationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
