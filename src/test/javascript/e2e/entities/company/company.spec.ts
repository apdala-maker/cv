import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompanyComponentsPage, { CompanyDeleteDialog } from './company.page-object';
import CompanyUpdatePage from './company-update.page-object';
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

describe('Company e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let companyComponentsPage: CompanyComponentsPage;
  let companyUpdatePage: CompanyUpdatePage;
  let companyDeleteDialog: CompanyDeleteDialog;
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

  it('should load Companies', async () => {
    await navBarPage.getEntityPage('company');
    companyComponentsPage = new CompanyComponentsPage();
    expect(await companyComponentsPage.title.getText()).to.match(/Companies/);

    expect(await companyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([companyComponentsPage.noRecords, companyComponentsPage.table]);

    beforeRecordsCount = (await isVisible(companyComponentsPage.noRecords)) ? 0 : await getRecordsCount(companyComponentsPage.table);
  });

  it('should load create Company page', async () => {
    await companyComponentsPage.createButton.click();
    companyUpdatePage = new CompanyUpdatePage();
    expect(await companyUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.company.home.createOrEditLabel/);
    await companyUpdatePage.cancel();
  });

  it('should create and save Companies', async () => {
    await companyComponentsPage.createButton.click();
    await companyUpdatePage.setDisplayNameInput('displayName');
    expect(await companyUpdatePage.getDisplayNameInput()).to.match(/displayName/);
    await companyUpdatePage.setLegalOrTradingNameInput('legalOrTradingName');
    expect(await companyUpdatePage.getLegalOrTradingNameInput()).to.match(/legalOrTradingName/);
    await companyUpdatePage.setRegistrationNumberInput('registrationNumber');
    expect(await companyUpdatePage.getRegistrationNumberInput()).to.match(/registrationNumber/);
    await companyUpdatePage.setRegistrationDateInput('01-01-2001');
    expect(await companyUpdatePage.getRegistrationDateInput()).to.eq('2001-01-01');
    await companyUpdatePage.setCompanyCodeInput('companyCode');
    expect(await companyUpdatePage.getCompanyCodeInput()).to.match(/companyCode/);
    await companyUpdatePage.setAreaCodeInput('areaCode');
    expect(await companyUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await companyUpdatePage.setCountyOrStateInput('countyOrState');
    expect(await companyUpdatePage.getCountyOrStateInput()).to.match(/countyOrState/);
    await companyUpdatePage.setPostalCodeInput('postalCode');
    expect(await companyUpdatePage.getPostalCodeInput()).to.match(/postalCode/);
    await companyUpdatePage.setPostalAddressInput('postalAddress');
    expect(await companyUpdatePage.getPostalAddressInput()).to.match(/postalAddress/);
    await companyUpdatePage.setCityOrTownInput('cityOrTown');
    expect(await companyUpdatePage.getCityOrTownInput()).to.match(/cityOrTown/);
    await companyUpdatePage.setStreetInput('street');
    expect(await companyUpdatePage.getStreetInput()).to.match(/street/);
    await companyUpdatePage.setBuildingNameOrNumberInput('buildingNameOrNumber');
    expect(await companyUpdatePage.getBuildingNameOrNumberInput()).to.match(/buildingNameOrNumber/);
    await companyUpdatePage.setPrimaryPhoneNumberInput('primaryPhoneNumber');
    expect(await companyUpdatePage.getPrimaryPhoneNumberInput()).to.match(/primaryPhoneNumber/);
    await companyUpdatePage.setSecondaryPhoneNumberInput('secondaryPhoneNumber');
    expect(await companyUpdatePage.getSecondaryPhoneNumberInput()).to.match(/secondaryPhoneNumber/);
    await companyUpdatePage.setEmailAddressInput('emailAddress');
    expect(await companyUpdatePage.getEmailAddressInput()).to.match(/emailAddress/);
    await companyUpdatePage.setWebsiteInput('website');
    expect(await companyUpdatePage.getWebsiteInput()).to.match(/website/);
    await companyUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await companyUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await companyUpdatePage.setCreatedByInput('createdBy');
    expect(await companyUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await companyUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await companyUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await companyUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await companyUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await companyUpdatePage.setModifiedByInput('modifiedBy');
    expect(await companyUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await companyUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await companyUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(companyUpdatePage.saveButton);
    await companyUpdatePage.save();
    await waitUntilHidden(companyUpdatePage.saveButton);
    expect(await isVisible(companyUpdatePage.saveButton)).to.be.false;

    expect(await companyComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(companyComponentsPage.table);

    await waitUntilCount(companyComponentsPage.records, beforeRecordsCount + 1);
    expect(await companyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Company', async () => {
    const deleteButton = companyComponentsPage.getDeleteButton(companyComponentsPage.records.last());
    await click(deleteButton);

    companyDeleteDialog = new CompanyDeleteDialog();
    await waitUntilDisplayed(companyDeleteDialog.deleteModal);
    expect(await companyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.company.delete.question/);
    await companyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(companyDeleteDialog.deleteModal);

    expect(await isVisible(companyDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([companyComponentsPage.noRecords, companyComponentsPage.table]);

    const afterCount = (await isVisible(companyComponentsPage.noRecords)) ? 0 : await getRecordsCount(companyComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
