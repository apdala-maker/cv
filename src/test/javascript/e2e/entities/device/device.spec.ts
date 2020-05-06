import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DeviceComponentsPage, { DeviceDeleteDialog } from './device.page-object';
import DeviceUpdatePage from './device-update.page-object';
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

describe('Device e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deviceComponentsPage: DeviceComponentsPage;
  let deviceUpdatePage: DeviceUpdatePage;
  let deviceDeleteDialog: DeviceDeleteDialog;
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

  it('should load Devices', async () => {
    await navBarPage.getEntityPage('device');
    deviceComponentsPage = new DeviceComponentsPage();
    expect(await deviceComponentsPage.title.getText()).to.match(/Devices/);

    expect(await deviceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([deviceComponentsPage.noRecords, deviceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(deviceComponentsPage.noRecords)) ? 0 : await getRecordsCount(deviceComponentsPage.table);
  });

  it('should load create Device page', async () => {
    await deviceComponentsPage.createButton.click();
    deviceUpdatePage = new DeviceUpdatePage();
    expect(await deviceUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.device.home.createOrEditLabel/);
    await deviceUpdatePage.cancel();
  });

  it('should create and save Devices', async () => {
    await deviceComponentsPage.createButton.click();
    await deviceUpdatePage.setUserCodeInput('userCode');
    expect(await deviceUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await deviceUpdatePage.setDeviceIdInput('deviceId');
    expect(await deviceUpdatePage.getDeviceIdInput()).to.match(/deviceId/);
    await deviceUpdatePage.setVersionInput('version');
    expect(await deviceUpdatePage.getVersionInput()).to.match(/version/);
    await deviceUpdatePage.setModelInput('model');
    expect(await deviceUpdatePage.getModelInput()).to.match(/model/);
    await deviceUpdatePage.setScreenSizeInput('screenSize');
    expect(await deviceUpdatePage.getScreenSizeInput()).to.match(/screenSize/);
    await deviceUpdatePage.setManufactureInput('manufacture');
    expect(await deviceUpdatePage.getManufactureInput()).to.match(/manufacture/);
    await deviceUpdatePage.setMacAddressesInput('macAddresses');
    expect(await deviceUpdatePage.getMacAddressesInput()).to.match(/macAddresses/);
    await deviceUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await deviceUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await deviceUpdatePage.setCreatedByInput('createdBy');
    expect(await deviceUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await deviceUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await deviceUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await deviceUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await deviceUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await deviceUpdatePage.setModifiedByInput('modifiedBy');
    expect(await deviceUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await deviceUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await deviceUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(deviceUpdatePage.saveButton);
    await deviceUpdatePage.save();
    await waitUntilHidden(deviceUpdatePage.saveButton);
    expect(await isVisible(deviceUpdatePage.saveButton)).to.be.false;

    expect(await deviceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(deviceComponentsPage.table);

    await waitUntilCount(deviceComponentsPage.records, beforeRecordsCount + 1);
    expect(await deviceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Device', async () => {
    const deleteButton = deviceComponentsPage.getDeleteButton(deviceComponentsPage.records.last());
    await click(deleteButton);

    deviceDeleteDialog = new DeviceDeleteDialog();
    await waitUntilDisplayed(deviceDeleteDialog.deleteModal);
    expect(await deviceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.device.delete.question/);
    await deviceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(deviceDeleteDialog.deleteModal);

    expect(await isVisible(deviceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([deviceComponentsPage.noRecords, deviceComponentsPage.table]);

    const afterCount = (await isVisible(deviceComponentsPage.noRecords)) ? 0 : await getRecordsCount(deviceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
