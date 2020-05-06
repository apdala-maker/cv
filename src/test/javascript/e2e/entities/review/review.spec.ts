import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReviewComponentsPage, { ReviewDeleteDialog } from './review.page-object';
import ReviewUpdatePage from './review-update.page-object';
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

describe('Review e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reviewComponentsPage: ReviewComponentsPage;
  let reviewUpdatePage: ReviewUpdatePage;
  let reviewDeleteDialog: ReviewDeleteDialog;
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

  it('should load Reviews', async () => {
    await navBarPage.getEntityPage('review');
    reviewComponentsPage = new ReviewComponentsPage();
    expect(await reviewComponentsPage.title.getText()).to.match(/Reviews/);

    expect(await reviewComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([reviewComponentsPage.noRecords, reviewComponentsPage.table]);

    beforeRecordsCount = (await isVisible(reviewComponentsPage.noRecords)) ? 0 : await getRecordsCount(reviewComponentsPage.table);
  });

  it('should load create Review page', async () => {
    await reviewComponentsPage.createButton.click();
    reviewUpdatePage = new ReviewUpdatePage();
    expect(await reviewUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.review.home.createOrEditLabel/);
    await reviewUpdatePage.cancel();
  });

  it('should create and save Reviews', async () => {
    await reviewComponentsPage.createButton.click();
    await reviewUpdatePage.setTripCodeInput('tripCode');
    expect(await reviewUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await reviewUpdatePage.setUserCodeInput('userCode');
    expect(await reviewUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await reviewUpdatePage.setRatingInput('5');
    expect(await reviewUpdatePage.getRatingInput()).to.eq('5');
    await reviewUpdatePage.setAreaCodeInput('areaCode');
    expect(await reviewUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await reviewUpdatePage.setRemarksInput('remarks');
    expect(await reviewUpdatePage.getRemarksInput()).to.match(/remarks/);
    await reviewUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await reviewUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await reviewUpdatePage.setCreatedByInput('createdBy');
    expect(await reviewUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await reviewUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await reviewUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await reviewUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await reviewUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await reviewUpdatePage.setModifiedByInput('modifiedBy');
    expect(await reviewUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await reviewUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await reviewUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(reviewUpdatePage.saveButton);
    await reviewUpdatePage.save();
    await waitUntilHidden(reviewUpdatePage.saveButton);
    expect(await isVisible(reviewUpdatePage.saveButton)).to.be.false;

    expect(await reviewComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(reviewComponentsPage.table);

    await waitUntilCount(reviewComponentsPage.records, beforeRecordsCount + 1);
    expect(await reviewComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Review', async () => {
    const deleteButton = reviewComponentsPage.getDeleteButton(reviewComponentsPage.records.last());
    await click(deleteButton);

    reviewDeleteDialog = new ReviewDeleteDialog();
    await waitUntilDisplayed(reviewDeleteDialog.deleteModal);
    expect(await reviewDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.review.delete.question/);
    await reviewDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(reviewDeleteDialog.deleteModal);

    expect(await isVisible(reviewDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([reviewComponentsPage.noRecords, reviewComponentsPage.table]);

    const afterCount = (await isVisible(reviewComponentsPage.noRecords)) ? 0 : await getRecordsCount(reviewComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
