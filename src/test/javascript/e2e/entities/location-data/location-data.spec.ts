import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocationDataComponentsPage, { LocationDataDeleteDialog } from './location-data.page-object';
import LocationDataUpdatePage from './location-data-update.page-object';
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

describe('LocationData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationDataComponentsPage: LocationDataComponentsPage;
  let locationDataUpdatePage: LocationDataUpdatePage;
  let locationDataDeleteDialog: LocationDataDeleteDialog;
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

  it('should load LocationData', async () => {
    await navBarPage.getEntityPage('location-data');
    locationDataComponentsPage = new LocationDataComponentsPage();
    expect(await locationDataComponentsPage.title.getText()).to.match(/Location Data/);

    expect(await locationDataComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([locationDataComponentsPage.noRecords, locationDataComponentsPage.table]);

    beforeRecordsCount = (await isVisible(locationDataComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(locationDataComponentsPage.table);
  });

  it('should load create LocationData page', async () => {
    await locationDataComponentsPage.createButton.click();
    locationDataUpdatePage = new LocationDataUpdatePage();
    expect(await locationDataUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.locationData.home.createOrEditLabel/
    );
    await locationDataUpdatePage.cancel();
  });

  it('should create and save LocationData', async () => {
    await locationDataComponentsPage.createButton.click();
    await locationDataUpdatePage.setLatitudeInput('5');
    expect(await locationDataUpdatePage.getLatitudeInput()).to.eq('5');
    await locationDataUpdatePage.setLongitudeInput('5');
    expect(await locationDataUpdatePage.getLongitudeInput()).to.eq('5');
    await locationDataUpdatePage.setBearingInput('bearing');
    expect(await locationDataUpdatePage.getBearingInput()).to.match(/bearing/);
    await waitUntilDisplayed(locationDataUpdatePage.saveButton);
    await locationDataUpdatePage.save();
    await waitUntilHidden(locationDataUpdatePage.saveButton);
    expect(await isVisible(locationDataUpdatePage.saveButton)).to.be.false;

    expect(await locationDataComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(locationDataComponentsPage.table);

    await waitUntilCount(locationDataComponentsPage.records, beforeRecordsCount + 1);
    expect(await locationDataComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last LocationData', async () => {
    const deleteButton = locationDataComponentsPage.getDeleteButton(locationDataComponentsPage.records.last());
    await click(deleteButton);

    locationDataDeleteDialog = new LocationDataDeleteDialog();
    await waitUntilDisplayed(locationDataDeleteDialog.deleteModal);
    expect(await locationDataDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.locationData.delete.question/
    );
    await locationDataDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(locationDataDeleteDialog.deleteModal);

    expect(await isVisible(locationDataDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([locationDataComponentsPage.noRecords, locationDataComponentsPage.table]);

    const afterCount = (await isVisible(locationDataComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(locationDataComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
