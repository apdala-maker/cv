import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FoundComponentsPage, { FoundDeleteDialog } from './found.page-object';
import FoundUpdatePage from './found-update.page-object';
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

describe('Found e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let foundComponentsPage: FoundComponentsPage;
  let foundUpdatePage: FoundUpdatePage;
  let foundDeleteDialog: FoundDeleteDialog;
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

  it('should load Founds', async () => {
    await navBarPage.getEntityPage('found');
    foundComponentsPage = new FoundComponentsPage();
    expect(await foundComponentsPage.title.getText()).to.match(/Founds/);

    expect(await foundComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([foundComponentsPage.noRecords, foundComponentsPage.table]);

    beforeRecordsCount = (await isVisible(foundComponentsPage.noRecords)) ? 0 : await getRecordsCount(foundComponentsPage.table);
  });

  it('should load create Found page', async () => {
    await foundComponentsPage.createButton.click();
    foundUpdatePage = new FoundUpdatePage();
    expect(await foundUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.found.home.createOrEditLabel/);
    await foundUpdatePage.cancel();
  });

  it('should create and save Founds', async () => {
    await foundComponentsPage.createButton.click();
    await foundUpdatePage.setTripCodeInput('tripCode');
    expect(await foundUpdatePage.getTripCodeInput()).to.match(/tripCode/);
    await foundUpdatePage.setDateFoundInput('01-01-2001');
    expect(await foundUpdatePage.getDateFoundInput()).to.eq('2001-01-01');
    await foundUpdatePage.setUserCodeInput('userCode');
    expect(await foundUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await foundUpdatePage.setDescriptionInput('description');
    expect(await foundUpdatePage.getDescriptionInput()).to.match(/description/);
    await foundUpdatePage.setItemNameInput('itemName');
    expect(await foundUpdatePage.getItemNameInput()).to.match(/itemName/);
    const selectedIsReturned = await foundUpdatePage.getIsReturnedInput().isSelected();
    if (selectedIsReturned) {
      await foundUpdatePage.getIsReturnedInput().click();
      expect(await foundUpdatePage.getIsReturnedInput().isSelected()).to.be.false;
    } else {
      await foundUpdatePage.getIsReturnedInput().click();
      expect(await foundUpdatePage.getIsReturnedInput().isSelected()).to.be.true;
    }
    await foundUpdatePage.setReferenceCodeInput('referenceCode');
    expect(await foundUpdatePage.getReferenceCodeInput()).to.match(/referenceCode/);
    await foundUpdatePage.setAreaCodeInput('areaCode');
    expect(await foundUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await foundUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await foundUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await foundUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await foundUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(foundUpdatePage.saveButton);
    await foundUpdatePage.save();
    await waitUntilHidden(foundUpdatePage.saveButton);
    expect(await isVisible(foundUpdatePage.saveButton)).to.be.false;

    expect(await foundComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(foundComponentsPage.table);

    await waitUntilCount(foundComponentsPage.records, beforeRecordsCount + 1);
    expect(await foundComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Found', async () => {
    const deleteButton = foundComponentsPage.getDeleteButton(foundComponentsPage.records.last());
    await click(deleteButton);

    foundDeleteDialog = new FoundDeleteDialog();
    await waitUntilDisplayed(foundDeleteDialog.deleteModal);
    expect(await foundDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.found.delete.question/);
    await foundDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(foundDeleteDialog.deleteModal);

    expect(await isVisible(foundDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([foundComponentsPage.noRecords, foundComponentsPage.table]);

    const afterCount = (await isVisible(foundComponentsPage.noRecords)) ? 0 : await getRecordsCount(foundComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
