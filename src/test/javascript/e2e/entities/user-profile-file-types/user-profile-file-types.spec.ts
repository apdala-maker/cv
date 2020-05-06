import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserProfileFileTypesComponentsPage, { UserProfileFileTypesDeleteDialog } from './user-profile-file-types.page-object';
import UserProfileFileTypesUpdatePage from './user-profile-file-types-update.page-object';
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

describe('UserProfileFileTypes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userProfileFileTypesComponentsPage: UserProfileFileTypesComponentsPage;
  let userProfileFileTypesUpdatePage: UserProfileFileTypesUpdatePage;
  let userProfileFileTypesDeleteDialog: UserProfileFileTypesDeleteDialog;
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

  it('should load UserProfileFileTypes', async () => {
    await navBarPage.getEntityPage('user-profile-file-types');
    userProfileFileTypesComponentsPage = new UserProfileFileTypesComponentsPage();
    expect(await userProfileFileTypesComponentsPage.title.getText()).to.match(/User Profile File Types/);

    expect(await userProfileFileTypesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([userProfileFileTypesComponentsPage.noRecords, userProfileFileTypesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(userProfileFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userProfileFileTypesComponentsPage.table);
  });

  it('should load create UserProfileFileTypes page', async () => {
    await userProfileFileTypesComponentsPage.createButton.click();
    userProfileFileTypesUpdatePage = new UserProfileFileTypesUpdatePage();
    expect(await userProfileFileTypesUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.userProfileFileTypes.home.createOrEditLabel/
    );
    await userProfileFileTypesUpdatePage.cancel();
  });

  it('should create and save UserProfileFileTypes', async () => {
    await userProfileFileTypesComponentsPage.createButton.click();
    const selectedISActive = await userProfileFileTypesUpdatePage.getISActiveInput().isSelected();
    if (selectedISActive) {
      await userProfileFileTypesUpdatePage.getISActiveInput().click();
      expect(await userProfileFileTypesUpdatePage.getISActiveInput().isSelected()).to.be.false;
    } else {
      await userProfileFileTypesUpdatePage.getISActiveInput().click();
      expect(await userProfileFileTypesUpdatePage.getISActiveInput().isSelected()).to.be.true;
    }
    await userProfileFileTypesUpdatePage.setProfileImageInput('profileImage');
    expect(await userProfileFileTypesUpdatePage.getProfileImageInput()).to.match(/profileImage/);
    await userProfileFileTypesUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await userProfileFileTypesUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(userProfileFileTypesUpdatePage.saveButton);
    await userProfileFileTypesUpdatePage.save();
    await waitUntilHidden(userProfileFileTypesUpdatePage.saveButton);
    expect(await isVisible(userProfileFileTypesUpdatePage.saveButton)).to.be.false;

    expect(await userProfileFileTypesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(userProfileFileTypesComponentsPage.table);

    await waitUntilCount(userProfileFileTypesComponentsPage.records, beforeRecordsCount + 1);
    expect(await userProfileFileTypesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last UserProfileFileTypes', async () => {
    const deleteButton = userProfileFileTypesComponentsPage.getDeleteButton(userProfileFileTypesComponentsPage.records.last());
    await click(deleteButton);

    userProfileFileTypesDeleteDialog = new UserProfileFileTypesDeleteDialog();
    await waitUntilDisplayed(userProfileFileTypesDeleteDialog.deleteModal);
    expect(await userProfileFileTypesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.userProfileFileTypes.delete.question/
    );
    await userProfileFileTypesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userProfileFileTypesDeleteDialog.deleteModal);

    expect(await isVisible(userProfileFileTypesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([userProfileFileTypesComponentsPage.noRecords, userProfileFileTypesComponentsPage.table]);

    const afterCount = (await isVisible(userProfileFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userProfileFileTypesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
