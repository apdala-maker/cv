import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TripQueueComponentsPage, { TripQueueDeleteDialog } from './trip-queue.page-object';
import TripQueueUpdatePage from './trip-queue-update.page-object';
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

describe('TripQueue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tripQueueComponentsPage: TripQueueComponentsPage;
  let tripQueueUpdatePage: TripQueueUpdatePage;
  let tripQueueDeleteDialog: TripQueueDeleteDialog;
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

  it('should load TripQueues', async () => {
    await navBarPage.getEntityPage('trip-queue');
    tripQueueComponentsPage = new TripQueueComponentsPage();
    expect(await tripQueueComponentsPage.title.getText()).to.match(/Trip Queues/);

    expect(await tripQueueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tripQueueComponentsPage.noRecords, tripQueueComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tripQueueComponentsPage.noRecords)) ? 0 : await getRecordsCount(tripQueueComponentsPage.table);
  });

  it('should load create TripQueue page', async () => {
    await tripQueueComponentsPage.createButton.click();
    tripQueueUpdatePage = new TripQueueUpdatePage();
    expect(await tripQueueUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.tripQueue.home.createOrEditLabel/);
    await tripQueueUpdatePage.cancel();
  });

  it('should create and save TripQueues', async () => {
    await tripQueueComponentsPage.createButton.click();
    await tripQueueUpdatePage.setTripCodeInput('tripCode');
    expect(await tripQueueUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await tripQueueUpdatePage.setDriverCodeInput('driverCode');
    expect(await tripQueueUpdatePage.getDriverCodeInput()).to.match(/driverCode/);
    await tripQueueUpdatePage.setPassengerCodeInput('passengerCode');
    expect(await tripQueueUpdatePage.getPassengerCodeInput()).to.match(/passengerCode/);
    await tripQueueUpdatePage.setStatusInput('status');
    expect(await tripQueueUpdatePage.getStatusInput()).to.match(/status/);
    await tripQueueUpdatePage.setAreaCodeInput('areaCode');
    expect(await tripQueueUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await tripQueueUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await tripQueueUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await tripQueueUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await tripQueueUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(tripQueueUpdatePage.saveButton);
    await tripQueueUpdatePage.save();
    await waitUntilHidden(tripQueueUpdatePage.saveButton);
    expect(await isVisible(tripQueueUpdatePage.saveButton)).to.be.false;

    expect(await tripQueueComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tripQueueComponentsPage.table);

    await waitUntilCount(tripQueueComponentsPage.records, beforeRecordsCount + 1);
    expect(await tripQueueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TripQueue', async () => {
    const deleteButton = tripQueueComponentsPage.getDeleteButton(tripQueueComponentsPage.records.last());
    await click(deleteButton);

    tripQueueDeleteDialog = new TripQueueDeleteDialog();
    await waitUntilDisplayed(tripQueueDeleteDialog.deleteModal);
    expect(await tripQueueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.tripQueue.delete.question/);
    await tripQueueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tripQueueDeleteDialog.deleteModal);

    expect(await isVisible(tripQueueDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tripQueueComponentsPage.noRecords, tripQueueComponentsPage.table]);

    const afterCount = (await isVisible(tripQueueComponentsPage.noRecords)) ? 0 : await getRecordsCount(tripQueueComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
