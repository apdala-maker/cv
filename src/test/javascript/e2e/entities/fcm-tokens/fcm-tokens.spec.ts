import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FcmTokensComponentsPage, { FcmTokensDeleteDialog } from './fcm-tokens.page-object';
import FcmTokensUpdatePage from './fcm-tokens-update.page-object';
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

describe('FcmTokens e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fcmTokensComponentsPage: FcmTokensComponentsPage;
  let fcmTokensUpdatePage: FcmTokensUpdatePage;
  let fcmTokensDeleteDialog: FcmTokensDeleteDialog;
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

  it('should load FcmTokens', async () => {
    await navBarPage.getEntityPage('fcm-tokens');
    fcmTokensComponentsPage = new FcmTokensComponentsPage();
    expect(await fcmTokensComponentsPage.title.getText()).to.match(/Fcm Tokens/);

    expect(await fcmTokensComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([fcmTokensComponentsPage.noRecords, fcmTokensComponentsPage.table]);

    beforeRecordsCount = (await isVisible(fcmTokensComponentsPage.noRecords)) ? 0 : await getRecordsCount(fcmTokensComponentsPage.table);
  });

  it('should load create FcmTokens page', async () => {
    await fcmTokensComponentsPage.createButton.click();
    fcmTokensUpdatePage = new FcmTokensUpdatePage();
    expect(await fcmTokensUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.fcmTokens.home.createOrEditLabel/);
    await fcmTokensUpdatePage.cancel();
  });

  it('should create and save FcmTokens', async () => {
    await fcmTokensComponentsPage.createButton.click();
    await fcmTokensUpdatePage.setUserCodeInput('userCode');
    expect(await fcmTokensUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await fcmTokensUpdatePage.setTokenInput('token');
    expect(await fcmTokensUpdatePage.getTokenInput()).to.match(/token/);
    const selectedIsActive = await fcmTokensUpdatePage.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await fcmTokensUpdatePage.getIsActiveInput().click();
      expect(await fcmTokensUpdatePage.getIsActiveInput().isSelected()).to.be.false;
    } else {
      await fcmTokensUpdatePage.getIsActiveInput().click();
      expect(await fcmTokensUpdatePage.getIsActiveInput().isSelected()).to.be.true;
    }
    await fcmTokensUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await fcmTokensUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await fcmTokensUpdatePage.setCreatedByInput('createdBy');
    expect(await fcmTokensUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await fcmTokensUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await fcmTokensUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await fcmTokensUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await fcmTokensUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await fcmTokensUpdatePage.setModifiedByInput('modifiedBy');
    expect(await fcmTokensUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await fcmTokensUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await fcmTokensUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(fcmTokensUpdatePage.saveButton);
    await fcmTokensUpdatePage.save();
    await waitUntilHidden(fcmTokensUpdatePage.saveButton);
    expect(await isVisible(fcmTokensUpdatePage.saveButton)).to.be.false;

    expect(await fcmTokensComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(fcmTokensComponentsPage.table);

    await waitUntilCount(fcmTokensComponentsPage.records, beforeRecordsCount + 1);
    expect(await fcmTokensComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last FcmTokens', async () => {
    const deleteButton = fcmTokensComponentsPage.getDeleteButton(fcmTokensComponentsPage.records.last());
    await click(deleteButton);

    fcmTokensDeleteDialog = new FcmTokensDeleteDialog();
    await waitUntilDisplayed(fcmTokensDeleteDialog.deleteModal);
    expect(await fcmTokensDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.fcmTokens.delete.question/);
    await fcmTokensDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fcmTokensDeleteDialog.deleteModal);

    expect(await isVisible(fcmTokensDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([fcmTokensComponentsPage.noRecords, fcmTokensComponentsPage.table]);

    const afterCount = (await isVisible(fcmTokensComponentsPage.noRecords)) ? 0 : await getRecordsCount(fcmTokensComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
