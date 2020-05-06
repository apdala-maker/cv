import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PassengerLocationUpdateComponentsPage, { PassengerLocationUpdateDeleteDialog } from './passenger-location-update.page-object';
import PassengerLocationUpdateUpdatePage from './passenger-location-update-update.page-object';
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

describe('PassengerLocationUpdate e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let passengerLocationUpdateComponentsPage: PassengerLocationUpdateComponentsPage;
  let passengerLocationUpdateUpdatePage: PassengerLocationUpdateUpdatePage;
  let passengerLocationUpdateDeleteDialog: PassengerLocationUpdateDeleteDialog;
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

  it('should load PassengerLocationUpdates', async () => {
    await navBarPage.getEntityPage('passenger-location-update');
    passengerLocationUpdateComponentsPage = new PassengerLocationUpdateComponentsPage();
    expect(await passengerLocationUpdateComponentsPage.title.getText()).to.match(/Passenger Location Updates/);

    expect(await passengerLocationUpdateComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([passengerLocationUpdateComponentsPage.noRecords, passengerLocationUpdateComponentsPage.table]);

    beforeRecordsCount = (await isVisible(passengerLocationUpdateComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(passengerLocationUpdateComponentsPage.table);
  });

  it('should load create PassengerLocationUpdate page', async () => {
    await passengerLocationUpdateComponentsPage.createButton.click();
    passengerLocationUpdateUpdatePage = new PassengerLocationUpdateUpdatePage();
    expect(await passengerLocationUpdateUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.passengerLocationUpdate.home.createOrEditLabel/
    );
    await passengerLocationUpdateUpdatePage.cancel();
  });

  it('should create and save PassengerLocationUpdates', async () => {
    await passengerLocationUpdateComponentsPage.createButton.click();
    await passengerLocationUpdateUpdatePage.setPassengerCodeInput('passengerCode');
    expect(await passengerLocationUpdateUpdatePage.getPassengerCodeInput()).to.match(/passengerCode/);
    await passengerLocationUpdateUpdatePage.setStartTimeInput('01-01-2001');
    expect(await passengerLocationUpdateUpdatePage.getStartTimeInput()).to.eq('2001-01-01');
    await passengerLocationUpdateUpdatePage.setAreaCodeInput('areaCode');
    expect(await passengerLocationUpdateUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await passengerLocationUpdateUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await passengerLocationUpdateUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await passengerLocationUpdateUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await passengerLocationUpdateUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await passengerLocationUpdateUpdatePage.locationDataSelectLastOption();
    await waitUntilDisplayed(passengerLocationUpdateUpdatePage.saveButton);
    await passengerLocationUpdateUpdatePage.save();
    await waitUntilHidden(passengerLocationUpdateUpdatePage.saveButton);
    expect(await isVisible(passengerLocationUpdateUpdatePage.saveButton)).to.be.false;

    expect(await passengerLocationUpdateComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(passengerLocationUpdateComponentsPage.table);

    await waitUntilCount(passengerLocationUpdateComponentsPage.records, beforeRecordsCount + 1);
    expect(await passengerLocationUpdateComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PassengerLocationUpdate', async () => {
    const deleteButton = passengerLocationUpdateComponentsPage.getDeleteButton(passengerLocationUpdateComponentsPage.records.last());
    await click(deleteButton);

    passengerLocationUpdateDeleteDialog = new PassengerLocationUpdateDeleteDialog();
    await waitUntilDisplayed(passengerLocationUpdateDeleteDialog.deleteModal);
    expect(await passengerLocationUpdateDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.passengerLocationUpdate.delete.question/
    );
    await passengerLocationUpdateDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(passengerLocationUpdateDeleteDialog.deleteModal);

    expect(await isVisible(passengerLocationUpdateDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([passengerLocationUpdateComponentsPage.noRecords, passengerLocationUpdateComponentsPage.table]);

    const afterCount = (await isVisible(passengerLocationUpdateComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(passengerLocationUpdateComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
