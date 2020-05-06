import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RatingComponentsPage, { RatingDeleteDialog } from './rating.page-object';
import RatingUpdatePage from './rating-update.page-object';
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

describe('Rating e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ratingComponentsPage: RatingComponentsPage;
  let ratingUpdatePage: RatingUpdatePage;
  let ratingDeleteDialog: RatingDeleteDialog;
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

  it('should load Ratings', async () => {
    await navBarPage.getEntityPage('rating');
    ratingComponentsPage = new RatingComponentsPage();
    expect(await ratingComponentsPage.title.getText()).to.match(/Ratings/);

    expect(await ratingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([ratingComponentsPage.noRecords, ratingComponentsPage.table]);

    beforeRecordsCount = (await isVisible(ratingComponentsPage.noRecords)) ? 0 : await getRecordsCount(ratingComponentsPage.table);
  });

  it('should load create Rating page', async () => {
    await ratingComponentsPage.createButton.click();
    ratingUpdatePage = new RatingUpdatePage();
    expect(await ratingUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.rating.home.createOrEditLabel/);
    await ratingUpdatePage.cancel();
  });

  it('should create and save Ratings', async () => {
    await ratingComponentsPage.createButton.click();
    await ratingUpdatePage.setUserCodeInput('userCode');
    expect(await ratingUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await ratingUpdatePage.setValueInput('5');
    expect(await ratingUpdatePage.getValueInput()).to.eq('5');
    await ratingUpdatePage.setRemarksInput('remarks');
    expect(await ratingUpdatePage.getRemarksInput()).to.match(/remarks/);
    await ratingUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await ratingUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await ratingUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await ratingUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(ratingUpdatePage.saveButton);
    await ratingUpdatePage.save();
    await waitUntilHidden(ratingUpdatePage.saveButton);
    expect(await isVisible(ratingUpdatePage.saveButton)).to.be.false;

    expect(await ratingComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(ratingComponentsPage.table);

    await waitUntilCount(ratingComponentsPage.records, beforeRecordsCount + 1);
    expect(await ratingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Rating', async () => {
    const deleteButton = ratingComponentsPage.getDeleteButton(ratingComponentsPage.records.last());
    await click(deleteButton);

    ratingDeleteDialog = new RatingDeleteDialog();
    await waitUntilDisplayed(ratingDeleteDialog.deleteModal);
    expect(await ratingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.rating.delete.question/);
    await ratingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ratingDeleteDialog.deleteModal);

    expect(await isVisible(ratingDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([ratingComponentsPage.noRecords, ratingComponentsPage.table]);

    const afterCount = (await isVisible(ratingComponentsPage.noRecords)) ? 0 : await getRecordsCount(ratingComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
