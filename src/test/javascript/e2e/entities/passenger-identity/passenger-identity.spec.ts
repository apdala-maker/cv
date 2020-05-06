import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PassengerIdentityComponentsPage, { PassengerIdentityDeleteDialog } from './passenger-identity.page-object';
import PassengerIdentityUpdatePage from './passenger-identity-update.page-object';
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

describe('PassengerIdentity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let passengerIdentityComponentsPage: PassengerIdentityComponentsPage;
  let passengerIdentityUpdatePage: PassengerIdentityUpdatePage;
  let passengerIdentityDeleteDialog: PassengerIdentityDeleteDialog;
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

  it('should load PassengerIdentities', async () => {
    await navBarPage.getEntityPage('passenger-identity');
    passengerIdentityComponentsPage = new PassengerIdentityComponentsPage();
    expect(await passengerIdentityComponentsPage.title.getText()).to.match(/Passenger Identities/);

    expect(await passengerIdentityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([passengerIdentityComponentsPage.noRecords, passengerIdentityComponentsPage.table]);

    beforeRecordsCount = (await isVisible(passengerIdentityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(passengerIdentityComponentsPage.table);
  });

  it('should load create PassengerIdentity page', async () => {
    await passengerIdentityComponentsPage.createButton.click();
    passengerIdentityUpdatePage = new PassengerIdentityUpdatePage();
    expect(await passengerIdentityUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.passengerIdentity.home.createOrEditLabel/
    );
    await passengerIdentityUpdatePage.cancel();
  });

  it('should create and save PassengerIdentities', async () => {
    await passengerIdentityComponentsPage.createButton.click();
    await passengerIdentityUpdatePage.setUserCodeInput('userCode');
    expect(await passengerIdentityUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await passengerIdentityUpdatePage.setNameInput('name');
    expect(await passengerIdentityUpdatePage.getNameInput()).to.match(/name/);
    await passengerIdentityUpdatePage.setCountryCodeInput('countryCode');
    expect(await passengerIdentityUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    await passengerIdentityUpdatePage.setAreaCodeInput('areaCode');
    expect(await passengerIdentityUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await passengerIdentityUpdatePage.setReferralCodeInput('referralCode');
    expect(await passengerIdentityUpdatePage.getReferralCodeInput()).to.match(/referralCode/);
    await passengerIdentityUpdatePage.setGenderInput('gender');
    expect(await passengerIdentityUpdatePage.getGenderInput()).to.match(/gender/);
    await passengerIdentityUpdatePage.setCompanyCodeInput('companyCode');
    expect(await passengerIdentityUpdatePage.getCompanyCodeInput()).to.match(/companyCode/);
    await passengerIdentityUpdatePage.setCurrentRatingInput('5');
    expect(await passengerIdentityUpdatePage.getCurrentRatingInput()).to.eq('5');
    await passengerIdentityUpdatePage.setUserTypeInput('userType');
    expect(await passengerIdentityUpdatePage.getUserTypeInput()).to.match(/userType/);
    await passengerIdentityUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await passengerIdentityUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await passengerIdentityUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await passengerIdentityUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await passengerIdentityUpdatePage.userProfileFileTypesSelectLastOption();
    await waitUntilDisplayed(passengerIdentityUpdatePage.saveButton);
    await passengerIdentityUpdatePage.save();
    await waitUntilHidden(passengerIdentityUpdatePage.saveButton);
    expect(await isVisible(passengerIdentityUpdatePage.saveButton)).to.be.false;

    expect(await passengerIdentityComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(passengerIdentityComponentsPage.table);

    await waitUntilCount(passengerIdentityComponentsPage.records, beforeRecordsCount + 1);
    expect(await passengerIdentityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PassengerIdentity', async () => {
    const deleteButton = passengerIdentityComponentsPage.getDeleteButton(passengerIdentityComponentsPage.records.last());
    await click(deleteButton);

    passengerIdentityDeleteDialog = new PassengerIdentityDeleteDialog();
    await waitUntilDisplayed(passengerIdentityDeleteDialog.deleteModal);
    expect(await passengerIdentityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.passengerIdentity.delete.question/
    );
    await passengerIdentityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(passengerIdentityDeleteDialog.deleteModal);

    expect(await isVisible(passengerIdentityDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([passengerIdentityComponentsPage.noRecords, passengerIdentityComponentsPage.table]);

    const afterCount = (await isVisible(passengerIdentityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(passengerIdentityComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
