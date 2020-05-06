import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ComplaintsCategoryComponentsPage, { ComplaintsCategoryDeleteDialog } from './complaints-category.page-object';
import ComplaintsCategoryUpdatePage from './complaints-category-update.page-object';
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

describe('ComplaintsCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let complaintsCategoryComponentsPage: ComplaintsCategoryComponentsPage;
  let complaintsCategoryUpdatePage: ComplaintsCategoryUpdatePage;
  let complaintsCategoryDeleteDialog: ComplaintsCategoryDeleteDialog;
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

  it('should load ComplaintsCategories', async () => {
    await navBarPage.getEntityPage('complaints-category');
    complaintsCategoryComponentsPage = new ComplaintsCategoryComponentsPage();
    expect(await complaintsCategoryComponentsPage.title.getText()).to.match(/Complaints Categories/);

    expect(await complaintsCategoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([complaintsCategoryComponentsPage.noRecords, complaintsCategoryComponentsPage.table]);

    beforeRecordsCount = (await isVisible(complaintsCategoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(complaintsCategoryComponentsPage.table);
  });

  it('should load create ComplaintsCategory page', async () => {
    await complaintsCategoryComponentsPage.createButton.click();
    complaintsCategoryUpdatePage = new ComplaintsCategoryUpdatePage();
    expect(await complaintsCategoryUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.complaintsCategory.home.createOrEditLabel/
    );
    await complaintsCategoryUpdatePage.cancel();
  });

  it('should create and save ComplaintsCategories', async () => {
    await complaintsCategoryComponentsPage.createButton.click();
    await complaintsCategoryUpdatePage.setCategoryCodeInput('categoryCode');
    expect(await complaintsCategoryUpdatePage.getCategoryCodeInput()).to.match(/categoryCode/);
    await complaintsCategoryUpdatePage.setDescriptionInput('description');
    expect(await complaintsCategoryUpdatePage.getDescriptionInput()).to.match(/description/);
    await complaintsCategoryUpdatePage.audienceSelectLastOption();
    await complaintsCategoryUpdatePage.setUrgencyScaleInput('5');
    expect(await complaintsCategoryUpdatePage.getUrgencyScaleInput()).to.eq('5');
    await complaintsCategoryUpdatePage.setAreaCodeInput('areaCode');
    expect(await complaintsCategoryUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await complaintsCategoryUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await complaintsCategoryUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await complaintsCategoryUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await complaintsCategoryUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(complaintsCategoryUpdatePage.saveButton);
    await complaintsCategoryUpdatePage.save();
    await waitUntilHidden(complaintsCategoryUpdatePage.saveButton);
    expect(await isVisible(complaintsCategoryUpdatePage.saveButton)).to.be.false;

    expect(await complaintsCategoryComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(complaintsCategoryComponentsPage.table);

    await waitUntilCount(complaintsCategoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await complaintsCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ComplaintsCategory', async () => {
    const deleteButton = complaintsCategoryComponentsPage.getDeleteButton(complaintsCategoryComponentsPage.records.last());
    await click(deleteButton);

    complaintsCategoryDeleteDialog = new ComplaintsCategoryDeleteDialog();
    await waitUntilDisplayed(complaintsCategoryDeleteDialog.deleteModal);
    expect(await complaintsCategoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.complaintsCategory.delete.question/
    );
    await complaintsCategoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(complaintsCategoryDeleteDialog.deleteModal);

    expect(await isVisible(complaintsCategoryDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([complaintsCategoryComponentsPage.noRecords, complaintsCategoryComponentsPage.table]);

    const afterCount = (await isVisible(complaintsCategoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(complaintsCategoryComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
