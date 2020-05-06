import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OTPComponentsPage, { OTPDeleteDialog } from './otp.page-object';
import OTPUpdatePage from './otp-update.page-object';
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

describe('OTP e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let oTPComponentsPage: OTPComponentsPage;
  let oTPUpdatePage: OTPUpdatePage;
  let oTPDeleteDialog: OTPDeleteDialog;
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

  it('should load OTPS', async () => {
    await navBarPage.getEntityPage('otp');
    oTPComponentsPage = new OTPComponentsPage();
    expect(await oTPComponentsPage.title.getText()).to.match(/OTPS/);

    expect(await oTPComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([oTPComponentsPage.noRecords, oTPComponentsPage.table]);

    beforeRecordsCount = (await isVisible(oTPComponentsPage.noRecords)) ? 0 : await getRecordsCount(oTPComponentsPage.table);
  });

  it('should load create OTP page', async () => {
    await oTPComponentsPage.createButton.click();
    oTPUpdatePage = new OTPUpdatePage();
    expect(await oTPUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.oTP.home.createOrEditLabel/);
    await oTPUpdatePage.cancel();
  });

  it('should create and save OTPS', async () => {
    await oTPComponentsPage.createButton.click();
    await oTPUpdatePage.setPhoneNumberInput('phoneNumber');
    expect(await oTPUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
    await oTPUpdatePage.setUserCodeInput('userCode');
    expect(await oTPUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await oTPUpdatePage.setAreaCodeInput('areaCode');
    expect(await oTPUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await oTPUpdatePage.setOTPCodeInput('oTPCode');
    expect(await oTPUpdatePage.getOTPCodeInput()).to.match(/oTPCode/);
    await oTPUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await oTPUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await oTPUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await oTPUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(oTPUpdatePage.saveButton);
    await oTPUpdatePage.save();
    await waitUntilHidden(oTPUpdatePage.saveButton);
    expect(await isVisible(oTPUpdatePage.saveButton)).to.be.false;

    expect(await oTPComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(oTPComponentsPage.table);

    await waitUntilCount(oTPComponentsPage.records, beforeRecordsCount + 1);
    expect(await oTPComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last OTP', async () => {
    const deleteButton = oTPComponentsPage.getDeleteButton(oTPComponentsPage.records.last());
    await click(deleteButton);

    oTPDeleteDialog = new OTPDeleteDialog();
    await waitUntilDisplayed(oTPDeleteDialog.deleteModal);
    expect(await oTPDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.oTP.delete.question/);
    await oTPDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(oTPDeleteDialog.deleteModal);

    expect(await isVisible(oTPDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([oTPComponentsPage.noRecords, oTPComponentsPage.table]);

    const afterCount = (await isVisible(oTPComponentsPage.noRecords)) ? 0 : await getRecordsCount(oTPComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
