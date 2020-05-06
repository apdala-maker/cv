import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransactionThirdPartyComponentsPage, { TransactionThirdPartyDeleteDialog } from './transaction-third-party.page-object';
import TransactionThirdPartyUpdatePage from './transaction-third-party-update.page-object';
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

describe('TransactionThirdParty e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionThirdPartyComponentsPage: TransactionThirdPartyComponentsPage;
  let transactionThirdPartyUpdatePage: TransactionThirdPartyUpdatePage;
  let transactionThirdPartyDeleteDialog: TransactionThirdPartyDeleteDialog;
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

  it('should load TransactionThirdParties', async () => {
    await navBarPage.getEntityPage('transaction-third-party');
    transactionThirdPartyComponentsPage = new TransactionThirdPartyComponentsPage();
    expect(await transactionThirdPartyComponentsPage.title.getText()).to.match(/Transaction Third Parties/);

    expect(await transactionThirdPartyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([transactionThirdPartyComponentsPage.noRecords, transactionThirdPartyComponentsPage.table]);

    beforeRecordsCount = (await isVisible(transactionThirdPartyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionThirdPartyComponentsPage.table);
  });

  it('should load create TransactionThirdParty page', async () => {
    await transactionThirdPartyComponentsPage.createButton.click();
    transactionThirdPartyUpdatePage = new TransactionThirdPartyUpdatePage();
    expect(await transactionThirdPartyUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.transactionThirdParty.home.createOrEditLabel/
    );
    await transactionThirdPartyUpdatePage.cancel();
  });

  it('should create and save TransactionThirdParties', async () => {
    await transactionThirdPartyComponentsPage.createButton.click();
    await transactionThirdPartyUpdatePage.setAreaCodeInput('areaCode');
    expect(await transactionThirdPartyUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await transactionThirdPartyUpdatePage.partyCategorySelectLastOption();
    await transactionThirdPartyUpdatePage.setCodeInput('code');
    expect(await transactionThirdPartyUpdatePage.getCodeInput()).to.match(/code/);
    await transactionThirdPartyUpdatePage.setNameInput('name');
    expect(await transactionThirdPartyUpdatePage.getNameInput()).to.match(/name/);
    await transactionThirdPartyUpdatePage.setCountryInput('country');
    expect(await transactionThirdPartyUpdatePage.getCountryInput()).to.match(/country/);
    await transactionThirdPartyUpdatePage.setCountyOrStateInput('countyOrState');
    expect(await transactionThirdPartyUpdatePage.getCountyOrStateInput()).to.match(/countyOrState/);
    await transactionThirdPartyUpdatePage.setPostalCodeInput('postalCode');
    expect(await transactionThirdPartyUpdatePage.getPostalCodeInput()).to.match(/postalCode/);
    await transactionThirdPartyUpdatePage.setPostalAddressInput('postalAddress');
    expect(await transactionThirdPartyUpdatePage.getPostalAddressInput()).to.match(/postalAddress/);
    await transactionThirdPartyUpdatePage.setTownInput('town');
    expect(await transactionThirdPartyUpdatePage.getTownInput()).to.match(/town/);
    await transactionThirdPartyUpdatePage.setStreetInput('street');
    expect(await transactionThirdPartyUpdatePage.getStreetInput()).to.match(/street/);
    await transactionThirdPartyUpdatePage.setBuildingNameOrNumberInput('buildingNameOrNumber');
    expect(await transactionThirdPartyUpdatePage.getBuildingNameOrNumberInput()).to.match(/buildingNameOrNumber/);
    await transactionThirdPartyUpdatePage.setPrimaryPhoneNumberInput('primaryPhoneNumber');
    expect(await transactionThirdPartyUpdatePage.getPrimaryPhoneNumberInput()).to.match(/primaryPhoneNumber/);
    await transactionThirdPartyUpdatePage.setSecondayPhoneNumberInput('secondayPhoneNumber');
    expect(await transactionThirdPartyUpdatePage.getSecondayPhoneNumberInput()).to.match(/secondayPhoneNumber/);
    await transactionThirdPartyUpdatePage.setEmailAddressInput('emailAddress');
    expect(await transactionThirdPartyUpdatePage.getEmailAddressInput()).to.match(/emailAddress/);
    await transactionThirdPartyUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await transactionThirdPartyUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await transactionThirdPartyUpdatePage.setCreatedByInput('createdBy');
    expect(await transactionThirdPartyUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await transactionThirdPartyUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await transactionThirdPartyUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await transactionThirdPartyUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await transactionThirdPartyUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await transactionThirdPartyUpdatePage.setModifiedByInput('modifiedBy');
    expect(await transactionThirdPartyUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await transactionThirdPartyUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await transactionThirdPartyUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(transactionThirdPartyUpdatePage.saveButton);
    await transactionThirdPartyUpdatePage.save();
    await waitUntilHidden(transactionThirdPartyUpdatePage.saveButton);
    expect(await isVisible(transactionThirdPartyUpdatePage.saveButton)).to.be.false;

    expect(await transactionThirdPartyComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(transactionThirdPartyComponentsPage.table);

    await waitUntilCount(transactionThirdPartyComponentsPage.records, beforeRecordsCount + 1);
    expect(await transactionThirdPartyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TransactionThirdParty', async () => {
    const deleteButton = transactionThirdPartyComponentsPage.getDeleteButton(transactionThirdPartyComponentsPage.records.last());
    await click(deleteButton);

    transactionThirdPartyDeleteDialog = new TransactionThirdPartyDeleteDialog();
    await waitUntilDisplayed(transactionThirdPartyDeleteDialog.deleteModal);
    expect(await transactionThirdPartyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.transactionThirdParty.delete.question/
    );
    await transactionThirdPartyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(transactionThirdPartyDeleteDialog.deleteModal);

    expect(await isVisible(transactionThirdPartyDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([transactionThirdPartyComponentsPage.noRecords, transactionThirdPartyComponentsPage.table]);

    const afterCount = (await isVisible(transactionThirdPartyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionThirdPartyComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
