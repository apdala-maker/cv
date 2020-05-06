import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StopsComponentsPage, { StopsDeleteDialog } from './stops.page-object';
import StopsUpdatePage from './stops-update.page-object';
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

describe('Stops e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stopsComponentsPage: StopsComponentsPage;
  let stopsUpdatePage: StopsUpdatePage;
  let stopsDeleteDialog: StopsDeleteDialog;
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

  it('should load Stops', async () => {
    await navBarPage.getEntityPage('stops');
    stopsComponentsPage = new StopsComponentsPage();
    expect(await stopsComponentsPage.title.getText()).to.match(/Stops/);

    expect(await stopsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([stopsComponentsPage.noRecords, stopsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(stopsComponentsPage.noRecords)) ? 0 : await getRecordsCount(stopsComponentsPage.table);
  });

  it('should load create Stops page', async () => {
    await stopsComponentsPage.createButton.click();
    stopsUpdatePage = new StopsUpdatePage();
    expect(await stopsUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.stops.home.createOrEditLabel/);
    await stopsUpdatePage.cancel();
  });

  it('should create and save Stops', async () => {
    await stopsComponentsPage.createButton.click();
    await stopsUpdatePage.setLatitudeInput('latitude');
    expect(await stopsUpdatePage.getLatitudeInput()).to.match(/latitude/);
    await stopsUpdatePage.setLongitudeInput('longitude');
    expect(await stopsUpdatePage.getLongitudeInput()).to.match(/longitude/);
    await stopsUpdatePage.setOrderInput('5');
    expect(await stopsUpdatePage.getOrderInput()).to.eq('5');
    await waitUntilDisplayed(stopsUpdatePage.saveButton);
    await stopsUpdatePage.save();
    await waitUntilHidden(stopsUpdatePage.saveButton);
    expect(await isVisible(stopsUpdatePage.saveButton)).to.be.false;

    expect(await stopsComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(stopsComponentsPage.table);

    await waitUntilCount(stopsComponentsPage.records, beforeRecordsCount + 1);
    expect(await stopsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Stops', async () => {
    const deleteButton = stopsComponentsPage.getDeleteButton(stopsComponentsPage.records.last());
    await click(deleteButton);

    stopsDeleteDialog = new StopsDeleteDialog();
    await waitUntilDisplayed(stopsDeleteDialog.deleteModal);
    expect(await stopsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.stops.delete.question/);
    await stopsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(stopsDeleteDialog.deleteModal);

    expect(await isVisible(stopsDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([stopsComponentsPage.noRecords, stopsComponentsPage.table]);

    const afterCount = (await isVisible(stopsComponentsPage.noRecords)) ? 0 : await getRecordsCount(stopsComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
