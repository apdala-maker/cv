import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LostComponentsPage, { LostDeleteDialog } from './lost.page-object';
import LostUpdatePage from './lost-update.page-object';
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

describe('Lost e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lostComponentsPage: LostComponentsPage;
  let lostUpdatePage: LostUpdatePage;
  let lostDeleteDialog: LostDeleteDialog;
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

  it('should load Losts', async () => {
    await navBarPage.getEntityPage('lost');
    lostComponentsPage = new LostComponentsPage();
    expect(await lostComponentsPage.title.getText()).to.match(/Losts/);

    expect(await lostComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([lostComponentsPage.noRecords, lostComponentsPage.table]);

    beforeRecordsCount = (await isVisible(lostComponentsPage.noRecords)) ? 0 : await getRecordsCount(lostComponentsPage.table);
  });

  it('should load create Lost page', async () => {
    await lostComponentsPage.createButton.click();
    lostUpdatePage = new LostUpdatePage();
    expect(await lostUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.lost.home.createOrEditLabel/);
    await lostUpdatePage.cancel();
  });

  it('should create and save Losts', async () => {
    await lostComponentsPage.createButton.click();
    await lostUpdatePage.setTripCodeInput('tripCode');
    expect(await lostUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await lostUpdatePage.setDateLostInput('01-01-2001');
    expect(await lostUpdatePage.getDateLostInput()).to.eq('2001-01-01');
    await lostUpdatePage.setUserCodeInput('userCode');
    expect(await lostUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await lostUpdatePage.setDescriptionInput('description');
    expect(await lostUpdatePage.getDescriptionInput()).to.match(/description/);
    await lostUpdatePage.setItemNameInput('itemName');
    expect(await lostUpdatePage.getItemNameInput()).to.match(/itemName/);
    const selectedIsFound = await lostUpdatePage.getIsFoundInput().isSelected();
    if (selectedIsFound) {
      await lostUpdatePage.getIsFoundInput().click();
      expect(await lostUpdatePage.getIsFoundInput().isSelected()).to.be.false;
    } else {
      await lostUpdatePage.getIsFoundInput().click();
      expect(await lostUpdatePage.getIsFoundInput().isSelected()).to.be.true;
    }
    await lostUpdatePage.setReferenceCodeInput('referenceCode');
    expect(await lostUpdatePage.getReferenceCodeInput()).to.match(/referenceCode/);
    await lostUpdatePage.setAreaCodeInput('areaCode');
    expect(await lostUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await lostUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await lostUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await lostUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await lostUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(lostUpdatePage.saveButton);
    await lostUpdatePage.save();
    await waitUntilHidden(lostUpdatePage.saveButton);
    expect(await isVisible(lostUpdatePage.saveButton)).to.be.false;

    expect(await lostComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(lostComponentsPage.table);

    await waitUntilCount(lostComponentsPage.records, beforeRecordsCount + 1);
    expect(await lostComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Lost', async () => {
    const deleteButton = lostComponentsPage.getDeleteButton(lostComponentsPage.records.last());
    await click(deleteButton);

    lostDeleteDialog = new LostDeleteDialog();
    await waitUntilDisplayed(lostDeleteDialog.deleteModal);
    expect(await lostDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.lost.delete.question/);
    await lostDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(lostDeleteDialog.deleteModal);

    expect(await isVisible(lostDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([lostComponentsPage.noRecords, lostComponentsPage.table]);

    const afterCount = (await isVisible(lostComponentsPage.noRecords)) ? 0 : await getRecordsCount(lostComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
