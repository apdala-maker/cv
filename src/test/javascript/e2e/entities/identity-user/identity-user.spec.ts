import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IdentityUserComponentsPage, { IdentityUserDeleteDialog } from './identity-user.page-object';
import IdentityUserUpdatePage from './identity-user-update.page-object';
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

describe('IdentityUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let identityUserComponentsPage: IdentityUserComponentsPage;
  let identityUserUpdatePage: IdentityUserUpdatePage;
  let identityUserDeleteDialog: IdentityUserDeleteDialog;
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

  it('should load IdentityUsers', async () => {
    await navBarPage.getEntityPage('identity-user');
    identityUserComponentsPage = new IdentityUserComponentsPage();
    expect(await identityUserComponentsPage.title.getText()).to.match(/Identity Users/);

    expect(await identityUserComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([identityUserComponentsPage.noRecords, identityUserComponentsPage.table]);

    beforeRecordsCount = (await isVisible(identityUserComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(identityUserComponentsPage.table);
  });

  it('should load create IdentityUser page', async () => {
    await identityUserComponentsPage.createButton.click();
    identityUserUpdatePage = new IdentityUserUpdatePage();
    expect(await identityUserUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.identityUser.home.createOrEditLabel/
    );
    await identityUserUpdatePage.cancel();
  });

  it('should create and save IdentityUsers', async () => {
    await identityUserComponentsPage.createButton.click();
    await identityUserUpdatePage.setUserCodeInput('userCode');
    expect(await identityUserUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await identityUserUpdatePage.setNameInput('name');
    expect(await identityUserUpdatePage.getNameInput()).to.match(/name/);
    await identityUserUpdatePage.setCountryCodeInput('countryCode');
    expect(await identityUserUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    await identityUserUpdatePage.setAreaCodeInput('areaCode');
    expect(await identityUserUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await identityUserUpdatePage.setGenderInput('gender');
    expect(await identityUserUpdatePage.getGenderInput()).to.match(/gender/);
    await identityUserUpdatePage.setCompanyCodeInput('companyCode');
    expect(await identityUserUpdatePage.getCompanyCodeInput()).to.match(/companyCode/);
    await identityUserUpdatePage.setAffliateCodeInput('affliateCode');
    expect(await identityUserUpdatePage.getAffliateCodeInput()).to.match(/affliateCode/);
    await identityUserUpdatePage.setCurrentRatingInput('5');
    expect(await identityUserUpdatePage.getCurrentRatingInput()).to.eq('5');
    await identityUserUpdatePage.setUserTypeInput('userType');
    expect(await identityUserUpdatePage.getUserTypeInput()).to.match(/userType/);
    const selectedIsActive = await identityUserUpdatePage.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await identityUserUpdatePage.getIsActiveInput().click();
      expect(await identityUserUpdatePage.getIsActiveInput().isSelected()).to.be.false;
    } else {
      await identityUserUpdatePage.getIsActiveInput().click();
      expect(await identityUserUpdatePage.getIsActiveInput().isSelected()).to.be.true;
    }
    await identityUserUpdatePage.setRegistrationStepInput('registrationStep');
    expect(await identityUserUpdatePage.getRegistrationStepInput()).to.match(/registrationStep/);
    const selectedIsApproved = await identityUserUpdatePage.getIsApprovedInput().isSelected();
    if (selectedIsApproved) {
      await identityUserUpdatePage.getIsApprovedInput().click();
      expect(await identityUserUpdatePage.getIsApprovedInput().isSelected()).to.be.false;
    } else {
      await identityUserUpdatePage.getIsApprovedInput().click();
      expect(await identityUserUpdatePage.getIsApprovedInput().isSelected()).to.be.true;
    }
    await identityUserUpdatePage.setApprovedByInput('approvedBy');
    expect(await identityUserUpdatePage.getApprovedByInput()).to.match(/approvedBy/);
    await identityUserUpdatePage.setActivatedByInput('activatedBy');
    expect(await identityUserUpdatePage.getActivatedByInput()).to.match(/activatedBy/);
    await identityUserUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await identityUserUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await identityUserUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await identityUserUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await identityUserUpdatePage.userProfileFileTypesSelectLastOption();
    await waitUntilDisplayed(identityUserUpdatePage.saveButton);
    await identityUserUpdatePage.save();
    await waitUntilHidden(identityUserUpdatePage.saveButton);
    expect(await isVisible(identityUserUpdatePage.saveButton)).to.be.false;

    expect(await identityUserComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(identityUserComponentsPage.table);

    await waitUntilCount(identityUserComponentsPage.records, beforeRecordsCount + 1);
    expect(await identityUserComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last IdentityUser', async () => {
    const deleteButton = identityUserComponentsPage.getDeleteButton(identityUserComponentsPage.records.last());
    await click(deleteButton);

    identityUserDeleteDialog = new IdentityUserDeleteDialog();
    await waitUntilDisplayed(identityUserDeleteDialog.deleteModal);
    expect(await identityUserDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.identityUser.delete.question/
    );
    await identityUserDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(identityUserDeleteDialog.deleteModal);

    expect(await isVisible(identityUserDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([identityUserComponentsPage.noRecords, identityUserComponentsPage.table]);

    const afterCount = (await isVisible(identityUserComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(identityUserComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
