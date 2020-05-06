import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationUserComponentsPage, { ApplicationUserDeleteDialog } from './application-user.page-object';
import ApplicationUserUpdatePage from './application-user-update.page-object';
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

describe('ApplicationUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationUserComponentsPage: ApplicationUserComponentsPage;
  let applicationUserUpdatePage: ApplicationUserUpdatePage;
  let applicationUserDeleteDialog: ApplicationUserDeleteDialog;
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

  it('should load ApplicationUsers', async () => {
    await navBarPage.getEntityPage('application-user');
    applicationUserComponentsPage = new ApplicationUserComponentsPage();
    expect(await applicationUserComponentsPage.title.getText()).to.match(/Application Users/);

    expect(await applicationUserComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([applicationUserComponentsPage.noRecords, applicationUserComponentsPage.table]);

    beforeRecordsCount = (await isVisible(applicationUserComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationUserComponentsPage.table);
  });

  it('should load create ApplicationUser page', async () => {
    await applicationUserComponentsPage.createButton.click();
    applicationUserUpdatePage = new ApplicationUserUpdatePage();
    expect(await applicationUserUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.applicationUser.home.createOrEditLabel/
    );
    await applicationUserUpdatePage.cancel();
  });

  it('should create and save ApplicationUsers', async () => {
    await applicationUserComponentsPage.createButton.click();
    await applicationUserUpdatePage.setUserCodeInput('userCode');
    expect(await applicationUserUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await applicationUserUpdatePage.setNameInput('name');
    expect(await applicationUserUpdatePage.getNameInput()).to.match(/name/);
    await applicationUserUpdatePage.setCountryCodeInput('countryCode');
    expect(await applicationUserUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    await applicationUserUpdatePage.setAreaCodeInput('areaCode');
    expect(await applicationUserUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await applicationUserUpdatePage.setGenderInput('gender');
    expect(await applicationUserUpdatePage.getGenderInput()).to.match(/gender/);
    await applicationUserUpdatePage.setCompanyCodeInput('companyCode');
    expect(await applicationUserUpdatePage.getCompanyCodeInput()).to.match(/companyCode/);
    await applicationUserUpdatePage.setCurrentRatingInput('5');
    expect(await applicationUserUpdatePage.getCurrentRatingInput()).to.eq('5');
    await applicationUserUpdatePage.setUserTypeInput('userType');
    expect(await applicationUserUpdatePage.getUserTypeInput()).to.match(/userType/);
    const selectedIsActive = await applicationUserUpdatePage.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await applicationUserUpdatePage.getIsActiveInput().click();
      expect(await applicationUserUpdatePage.getIsActiveInput().isSelected()).to.be.false;
    } else {
      await applicationUserUpdatePage.getIsActiveInput().click();
      expect(await applicationUserUpdatePage.getIsActiveInput().isSelected()).to.be.true;
    }
    const selectedIsApproved = await applicationUserUpdatePage.getIsApprovedInput().isSelected();
    if (selectedIsApproved) {
      await applicationUserUpdatePage.getIsApprovedInput().click();
      expect(await applicationUserUpdatePage.getIsApprovedInput().isSelected()).to.be.false;
    } else {
      await applicationUserUpdatePage.getIsApprovedInput().click();
      expect(await applicationUserUpdatePage.getIsApprovedInput().isSelected()).to.be.true;
    }
    await applicationUserUpdatePage.setApprovedByInput('approvedBy');
    expect(await applicationUserUpdatePage.getApprovedByInput()).to.match(/approvedBy/);
    await applicationUserUpdatePage.setActivatedByInput('activatedBy');
    expect(await applicationUserUpdatePage.getActivatedByInput()).to.match(/activatedBy/);
    await applicationUserUpdatePage.setImageUrlInput('imageUrl');
    expect(await applicationUserUpdatePage.getImageUrlInput()).to.match(/imageUrl/);
    await applicationUserUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await applicationUserUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await applicationUserUpdatePage.setCreatedByInput('createdBy');
    expect(await applicationUserUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await applicationUserUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await applicationUserUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await applicationUserUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await applicationUserUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await applicationUserUpdatePage.setModifiedByInput('modifiedBy');
    expect(await applicationUserUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await applicationUserUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await applicationUserUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(applicationUserUpdatePage.saveButton);
    await applicationUserUpdatePage.save();
    await waitUntilHidden(applicationUserUpdatePage.saveButton);
    expect(await isVisible(applicationUserUpdatePage.saveButton)).to.be.false;

    expect(await applicationUserComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(applicationUserComponentsPage.table);

    await waitUntilCount(applicationUserComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicationUserComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ApplicationUser', async () => {
    const deleteButton = applicationUserComponentsPage.getDeleteButton(applicationUserComponentsPage.records.last());
    await click(deleteButton);

    applicationUserDeleteDialog = new ApplicationUserDeleteDialog();
    await waitUntilDisplayed(applicationUserDeleteDialog.deleteModal);
    expect(await applicationUserDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.applicationUser.delete.question/
    );
    await applicationUserDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicationUserDeleteDialog.deleteModal);

    expect(await isVisible(applicationUserDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([applicationUserComponentsPage.noRecords, applicationUserComponentsPage.table]);

    const afterCount = (await isVisible(applicationUserComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationUserComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
