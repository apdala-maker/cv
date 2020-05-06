import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TripManagementComponentsPage, { TripManagementDeleteDialog } from './trip-management.page-object';
import TripManagementUpdatePage from './trip-management-update.page-object';
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

describe('TripManagement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tripManagementComponentsPage: TripManagementComponentsPage;
  let tripManagementUpdatePage: TripManagementUpdatePage;
  let tripManagementDeleteDialog: TripManagementDeleteDialog;
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

  it('should load TripManagements', async () => {
    await navBarPage.getEntityPage('trip-management');
    tripManagementComponentsPage = new TripManagementComponentsPage();
    expect(await tripManagementComponentsPage.title.getText()).to.match(/Trip Managements/);

    expect(await tripManagementComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tripManagementComponentsPage.noRecords, tripManagementComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tripManagementComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tripManagementComponentsPage.table);
  });

  it('should load create TripManagement page', async () => {
    await tripManagementComponentsPage.createButton.click();
    tripManagementUpdatePage = new TripManagementUpdatePage();
    expect(await tripManagementUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.tripManagement.home.createOrEditLabel/
    );
    await tripManagementUpdatePage.cancel();
  });

  it('should create and save TripManagements', async () => {
    await tripManagementComponentsPage.createButton.click();
    await tripManagementUpdatePage.setAreaCodeInput('areaCode');
    expect(await tripManagementUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await tripManagementUpdatePage.setStartimeInput('01-01-2001');
    expect(await tripManagementUpdatePage.getStartimeInput()).to.eq('2001-01-01');
    await tripManagementUpdatePage.setEndtimeInput('01-01-2001');
    expect(await tripManagementUpdatePage.getEndtimeInput()).to.eq('2001-01-01');
    await tripManagementUpdatePage.setStartLongitudeInput('startLongitude');
    expect(await tripManagementUpdatePage.getStartLongitudeInput()).to.match(/startLongitude/);
    await tripManagementUpdatePage.setStartLatitudeInput('startLatitude');
    expect(await tripManagementUpdatePage.getStartLatitudeInput()).to.match(/startLatitude/);
    await tripManagementUpdatePage.setDistanceInput('5');
    expect(await tripManagementUpdatePage.getDistanceInput()).to.eq('5');
    await tripManagementUpdatePage.setTripCostInput('5');
    expect(await tripManagementUpdatePage.getTripCostInput()).to.eq('5');
    await tripManagementUpdatePage.setDriverCodeInput('driverCode');
    expect(await tripManagementUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await tripManagementUpdatePage.setPassengerCodeInput('passengerCode');
    expect(await tripManagementUpdatePage.getPassengerCodeInput()).to.match(/passengerCode/);
    await tripManagementUpdatePage.setStatusInput('status');
    expect(await tripManagementUpdatePage.getStatusInput()).to.match(/status/);
    await tripManagementUpdatePage.setTripCodeInput('tripCode');
    expect(await tripManagementUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await tripManagementUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await tripManagementUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await tripManagementUpdatePage.setCreatedByInput('createdBy');
    expect(await tripManagementUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await tripManagementUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await tripManagementUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await tripManagementUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await tripManagementUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await tripManagementUpdatePage.setModifiedByInput('modifiedBy');
    expect(await tripManagementUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await tripManagementUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await tripManagementUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(tripManagementUpdatePage.saveButton);
    await tripManagementUpdatePage.save();
    await waitUntilHidden(tripManagementUpdatePage.saveButton);
    expect(await isVisible(tripManagementUpdatePage.saveButton)).to.be.false;

    expect(await tripManagementComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tripManagementComponentsPage.table);

    await waitUntilCount(tripManagementComponentsPage.records, beforeRecordsCount + 1);
    expect(await tripManagementComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TripManagement', async () => {
    const deleteButton = tripManagementComponentsPage.getDeleteButton(tripManagementComponentsPage.records.last());
    await click(deleteButton);

    tripManagementDeleteDialog = new TripManagementDeleteDialog();
    await waitUntilDisplayed(tripManagementDeleteDialog.deleteModal);
    expect(await tripManagementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.tripManagement.delete.question/
    );
    await tripManagementDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tripManagementDeleteDialog.deleteModal);

    expect(await isVisible(tripManagementDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tripManagementComponentsPage.noRecords, tripManagementComponentsPage.table]);

    const afterCount = (await isVisible(tripManagementComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tripManagementComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
