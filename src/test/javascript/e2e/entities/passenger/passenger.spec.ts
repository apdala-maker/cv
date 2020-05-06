import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PassengerComponentsPage, { PassengerDeleteDialog } from './passenger.page-object';
import PassengerUpdatePage from './passenger-update.page-object';
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

describe('Passenger e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let passengerComponentsPage: PassengerComponentsPage;
  let passengerUpdatePage: PassengerUpdatePage;
  let passengerDeleteDialog: PassengerDeleteDialog;
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

  it('should load Passengers', async () => {
    await navBarPage.getEntityPage('passenger');
    passengerComponentsPage = new PassengerComponentsPage();
    expect(await passengerComponentsPage.title.getText()).to.match(/Passengers/);

    expect(await passengerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([passengerComponentsPage.noRecords, passengerComponentsPage.table]);

    beforeRecordsCount = (await isVisible(passengerComponentsPage.noRecords)) ? 0 : await getRecordsCount(passengerComponentsPage.table);
  });

  it('should load create Passenger page', async () => {
    await passengerComponentsPage.createButton.click();
    passengerUpdatePage = new PassengerUpdatePage();
    expect(await passengerUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.passenger.home.createOrEditLabel/);
    await passengerUpdatePage.cancel();
  });

  it('should create and save Passengers', async () => {
    await passengerComponentsPage.createButton.click();
    await passengerUpdatePage.setStatusInput('status');
    expect(await passengerUpdatePage.getStatusInput()).to.match(/status/);
    await passengerUpdatePage.setPassengerCodeInput('passengerCode');
    expect(await passengerUpdatePage.getPassengerCodeInput()).to.match(/passengerCode/);
    await passengerUpdatePage.setAreaCodeInput('areaCode');
    expect(await passengerUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await passengerUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await passengerUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await passengerUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await passengerUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await passengerUpdatePage.latestLocationSelectLastOption();
    await waitUntilDisplayed(passengerUpdatePage.saveButton);
    await passengerUpdatePage.save();
    await waitUntilHidden(passengerUpdatePage.saveButton);
    expect(await isVisible(passengerUpdatePage.saveButton)).to.be.false;

    expect(await passengerComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(passengerComponentsPage.table);

    await waitUntilCount(passengerComponentsPage.records, beforeRecordsCount + 1);
    expect(await passengerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Passenger', async () => {
    const deleteButton = passengerComponentsPage.getDeleteButton(passengerComponentsPage.records.last());
    await click(deleteButton);

    passengerDeleteDialog = new PassengerDeleteDialog();
    await waitUntilDisplayed(passengerDeleteDialog.deleteModal);
    expect(await passengerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.passenger.delete.question/);
    await passengerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(passengerDeleteDialog.deleteModal);

    expect(await isVisible(passengerDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([passengerComponentsPage.noRecords, passengerComponentsPage.table]);

    const afterCount = (await isVisible(passengerComponentsPage.noRecords)) ? 0 : await getRecordsCount(passengerComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
