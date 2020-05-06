import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TripComponentsPage, { TripDeleteDialog } from './trip.page-object';
import TripUpdatePage from './trip-update.page-object';
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

describe('Trip e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tripComponentsPage: TripComponentsPage;
  let tripUpdatePage: TripUpdatePage;
  let tripDeleteDialog: TripDeleteDialog;
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

  it('should load Trips', async () => {
    await navBarPage.getEntityPage('trip');
    tripComponentsPage = new TripComponentsPage();
    expect(await tripComponentsPage.title.getText()).to.match(/Trips/);

    expect(await tripComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tripComponentsPage.noRecords, tripComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tripComponentsPage.noRecords)) ? 0 : await getRecordsCount(tripComponentsPage.table);
  });

  it('should load create Trip page', async () => {
    await tripComponentsPage.createButton.click();
    tripUpdatePage = new TripUpdatePage();
    expect(await tripUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.trip.home.createOrEditLabel/);
    await tripUpdatePage.cancel();
  });

  it('should create and save Trips', async () => {
    await tripComponentsPage.createButton.click();
    await tripUpdatePage.setTripCodeInput('tripCode');
    expect(await tripUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await tripUpdatePage.setDriverCodeInput('driverCode');
    expect(await tripUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await tripUpdatePage.setVehicleCodeInput('vehicleCode');
    expect(await tripUpdatePage.getVehicleCodeInput()).to.match(/vehicleCode/);
    await tripUpdatePage.tripStatusSelectLastOption();
    await tripUpdatePage.setDateEndedInput('01-01-2001');
    expect(await tripUpdatePage.getDateEndedInput()).to.eq('2001-01-01');
    await tripUpdatePage.setTripStartDateInput('01-01-2001');
    expect(await tripUpdatePage.getTripStartDateInput()).to.eq('2001-01-01');
    await tripUpdatePage.setArrivedDateInput('01-01-2001');
    expect(await tripUpdatePage.getArrivedDateInput()).to.eq('2001-01-01');
    await tripUpdatePage.setTripInitiatedDateInput('01-01-2001');
    expect(await tripUpdatePage.getTripInitiatedDateInput()).to.eq('2001-01-01');
    await tripUpdatePage.setPassengerCodeInput('passengerCode');
    expect(await tripUpdatePage.getPassengerCodeInput()).to.match(/passengerCode/);
    await tripUpdatePage.setPickUpLongitudeInput('pickUpLongitude');
    expect(await tripUpdatePage.getPickUpLongitudeInput()).to.match(/pickUpLongitude/);
    await tripUpdatePage.setPickUpLatitudeInput('pickUpLatitude');
    expect(await tripUpdatePage.getPickUpLatitudeInput()).to.match(/pickUpLatitude/);
    await tripUpdatePage.setDropOfLatitudeInput('dropOfLatitude');
    expect(await tripUpdatePage.getDropOfLatitudeInput()).to.match(/dropOfLatitude/);
    await tripUpdatePage.setDropOfLongitudeInput('dropOfLongitude');
    expect(await tripUpdatePage.getDropOfLongitudeInput()).to.match(/dropOfLongitude/);
    await tripUpdatePage.setProjectedAmountInput('5');
    expect(await tripUpdatePage.getProjectedAmountInput()).to.eq('5');
    await tripUpdatePage.setTotalDistanceInMetresCoverdInput('5');
    expect(await tripUpdatePage.getTotalDistanceInMetresCoverdInput()).to.eq('5');
    await tripUpdatePage.setActualAmountPaidInput('5');
    expect(await tripUpdatePage.getActualAmountPaidInput()).to.eq('5');
    await tripUpdatePage.setCancelledByInput('cancelledBy');
    expect(await tripUpdatePage.getCancelledByInput()).to.match(/cancelledBy/);
    await tripUpdatePage.tripTypeSelectLastOption();
    await tripUpdatePage.setAreaCodeInput('areaCode');
    expect(await tripUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await tripUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await tripUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await tripUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await tripUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await tripUpdatePage.priceMongoModelSelectLastOption();
    await tripUpdatePage.ratingSelectLastOption();
    await tripUpdatePage.stopsSelectLastOption();
    await waitUntilDisplayed(tripUpdatePage.saveButton);
    await tripUpdatePage.save();
    await waitUntilHidden(tripUpdatePage.saveButton);
    expect(await isVisible(tripUpdatePage.saveButton)).to.be.false;

    expect(await tripComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tripComponentsPage.table);

    await waitUntilCount(tripComponentsPage.records, beforeRecordsCount + 1);
    expect(await tripComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Trip', async () => {
    const deleteButton = tripComponentsPage.getDeleteButton(tripComponentsPage.records.last());
    await click(deleteButton);

    tripDeleteDialog = new TripDeleteDialog();
    await waitUntilDisplayed(tripDeleteDialog.deleteModal);
    expect(await tripDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.trip.delete.question/);
    await tripDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tripDeleteDialog.deleteModal);

    expect(await isVisible(tripDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tripComponentsPage.noRecords, tripComponentsPage.table]);

    const afterCount = (await isVisible(tripComponentsPage.noRecords)) ? 0 : await getRecordsCount(tripComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
