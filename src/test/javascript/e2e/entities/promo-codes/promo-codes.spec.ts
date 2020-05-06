import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PromoCodesComponentsPage, { PromoCodesDeleteDialog } from './promo-codes.page-object';
import PromoCodesUpdatePage from './promo-codes-update.page-object';
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

describe('PromoCodes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let promoCodesComponentsPage: PromoCodesComponentsPage;
  let promoCodesUpdatePage: PromoCodesUpdatePage;
  let promoCodesDeleteDialog: PromoCodesDeleteDialog;
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

  it('should load PromoCodes', async () => {
    await navBarPage.getEntityPage('promo-codes');
    promoCodesComponentsPage = new PromoCodesComponentsPage();
    expect(await promoCodesComponentsPage.title.getText()).to.match(/Promo Codes/);

    expect(await promoCodesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([promoCodesComponentsPage.noRecords, promoCodesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(promoCodesComponentsPage.noRecords)) ? 0 : await getRecordsCount(promoCodesComponentsPage.table);
  });

  it('should load create PromoCodes page', async () => {
    await promoCodesComponentsPage.createButton.click();
    promoCodesUpdatePage = new PromoCodesUpdatePage();
    expect(await promoCodesUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.promoCodes.home.createOrEditLabel/);
    await promoCodesUpdatePage.cancel();
  });

  it('should create and save PromoCodes', async () => {
    await promoCodesComponentsPage.createButton.click();
    await promoCodesUpdatePage.setCodeInput('code');
    expect(await promoCodesUpdatePage.getCodeInput()).to.match(/code/);
    await promoCodesUpdatePage.setStartHourInput('5');
    expect(await promoCodesUpdatePage.getStartHourInput()).to.eq('5');
    await promoCodesUpdatePage.setEndHourInput('5');
    expect(await promoCodesUpdatePage.getEndHourInput()).to.eq('5');
    await promoCodesUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await promoCodesUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await promoCodesUpdatePage.setCreatedByInput('createdBy');
    expect(await promoCodesUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await promoCodesUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await promoCodesUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await promoCodesUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await promoCodesUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await promoCodesUpdatePage.setModifiedByInput('modifiedBy');
    expect(await promoCodesUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await promoCodesUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await promoCodesUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(promoCodesUpdatePage.saveButton);
    await promoCodesUpdatePage.save();
    await waitUntilHidden(promoCodesUpdatePage.saveButton);
    expect(await isVisible(promoCodesUpdatePage.saveButton)).to.be.false;

    expect(await promoCodesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(promoCodesComponentsPage.table);

    await waitUntilCount(promoCodesComponentsPage.records, beforeRecordsCount + 1);
    expect(await promoCodesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PromoCodes', async () => {
    const deleteButton = promoCodesComponentsPage.getDeleteButton(promoCodesComponentsPage.records.last());
    await click(deleteButton);

    promoCodesDeleteDialog = new PromoCodesDeleteDialog();
    await waitUntilDisplayed(promoCodesDeleteDialog.deleteModal);
    expect(await promoCodesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.promoCodes.delete.question/);
    await promoCodesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(promoCodesDeleteDialog.deleteModal);

    expect(await isVisible(promoCodesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([promoCodesComponentsPage.noRecords, promoCodesComponentsPage.table]);

    const afterCount = (await isVisible(promoCodesComponentsPage.noRecords)) ? 0 : await getRecordsCount(promoCodesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
