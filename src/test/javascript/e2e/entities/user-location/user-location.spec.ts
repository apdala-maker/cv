import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserLocationComponentsPage, { UserLocationDeleteDialog } from './user-location.page-object';
import UserLocationUpdatePage from './user-location-update.page-object';
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

describe('UserLocation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userLocationComponentsPage: UserLocationComponentsPage;
  let userLocationUpdatePage: UserLocationUpdatePage;
  let userLocationDeleteDialog: UserLocationDeleteDialog;
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

  it('should load UserLocations', async () => {
    await navBarPage.getEntityPage('user-location');
    userLocationComponentsPage = new UserLocationComponentsPage();
    expect(await userLocationComponentsPage.title.getText()).to.match(/User Locations/);

    expect(await userLocationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([userLocationComponentsPage.noRecords, userLocationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(userLocationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userLocationComponentsPage.table);
  });

  it('should load create UserLocation page', async () => {
    await userLocationComponentsPage.createButton.click();
    userLocationUpdatePage = new UserLocationUpdatePage();
    expect(await userLocationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.userLocation.home.createOrEditLabel/
    );
    await userLocationUpdatePage.cancel();
  });

  it('should create and save UserLocations', async () => {
    await userLocationComponentsPage.createButton.click();
    await userLocationUpdatePage.setLatitudeInput('latitude');
    expect(await userLocationUpdatePage.getLatitudeInput()).to.match(/latitude/);
    await userLocationUpdatePage.setLongitudeInput('longitude');
    expect(await userLocationUpdatePage.getLongitudeInput()).to.match(/longitude/);
    await userLocationUpdatePage.setTripCodeInput('tripCode');
    expect(await userLocationUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await userLocationUpdatePage.setUserCodeInput('userCode');
    expect(await userLocationUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await userLocationUpdatePage.setAreaCodeInput('areaCode');
    expect(await userLocationUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await userLocationUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await userLocationUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await userLocationUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await userLocationUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(userLocationUpdatePage.saveButton);
    await userLocationUpdatePage.save();
    await waitUntilHidden(userLocationUpdatePage.saveButton);
    expect(await isVisible(userLocationUpdatePage.saveButton)).to.be.false;

    expect(await userLocationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(userLocationComponentsPage.table);

    await waitUntilCount(userLocationComponentsPage.records, beforeRecordsCount + 1);
    expect(await userLocationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last UserLocation', async () => {
    const deleteButton = userLocationComponentsPage.getDeleteButton(userLocationComponentsPage.records.last());
    await click(deleteButton);

    userLocationDeleteDialog = new UserLocationDeleteDialog();
    await waitUntilDisplayed(userLocationDeleteDialog.deleteModal);
    expect(await userLocationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.userLocation.delete.question/
    );
    await userLocationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userLocationDeleteDialog.deleteModal);

    expect(await isVisible(userLocationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([userLocationComponentsPage.noRecords, userLocationComponentsPage.table]);

    const afterCount = (await isVisible(userLocationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userLocationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
