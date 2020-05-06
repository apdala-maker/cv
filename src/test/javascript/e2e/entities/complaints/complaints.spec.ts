import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ComplaintsComponentsPage, { ComplaintsDeleteDialog } from './complaints.page-object';
import ComplaintsUpdatePage from './complaints-update.page-object';
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

describe('Complaints e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let complaintsComponentsPage: ComplaintsComponentsPage;
  let complaintsUpdatePage: ComplaintsUpdatePage;
  let complaintsDeleteDialog: ComplaintsDeleteDialog;
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

  it('should load Complaints', async () => {
    await navBarPage.getEntityPage('complaints');
    complaintsComponentsPage = new ComplaintsComponentsPage();
    expect(await complaintsComponentsPage.title.getText()).to.match(/Complaints/);

    expect(await complaintsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([complaintsComponentsPage.noRecords, complaintsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(complaintsComponentsPage.noRecords)) ? 0 : await getRecordsCount(complaintsComponentsPage.table);
  });

  it('should load create Complaints page', async () => {
    await complaintsComponentsPage.createButton.click();
    complaintsUpdatePage = new ComplaintsUpdatePage();
    expect(await complaintsUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.complaints.home.createOrEditLabel/);
    await complaintsUpdatePage.cancel();
  });

  it('should create and save Complaints', async () => {
    await complaintsComponentsPage.createButton.click();
    await complaintsUpdatePage.setUserCodeInput('userCode');
    expect(await complaintsUpdatePage.getUserCodeInput()).to.match(/userCode/);
    await complaintsUpdatePage.setCategoryInput('category');
    expect(await complaintsUpdatePage.getCategoryInput()).to.match(/category/);
    await complaintsUpdatePage.setDescriptionInput('description');
    expect(await complaintsUpdatePage.getDescriptionInput()).to.match(/description/);
    await complaintsUpdatePage.audienceSelectLastOption();
    await complaintsUpdatePage.statusSelectLastOption();
    await complaintsUpdatePage.setFeedBackInput('feedBack');
    expect(await complaintsUpdatePage.getFeedBackInput()).to.match(/feedBack/);
    await complaintsUpdatePage.setReferenceCodeInput('referenceCode');
    expect(await complaintsUpdatePage.getReferenceCodeInput()).to.match(/referenceCode/);
    await complaintsUpdatePage.setAreaCodeInput('areaCode');
    expect(await complaintsUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await complaintsUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await complaintsUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await complaintsUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await complaintsUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await complaintsUpdatePage.complaintsCategorySelectLastOption();
    await waitUntilDisplayed(complaintsUpdatePage.saveButton);
    await complaintsUpdatePage.save();
    await waitUntilHidden(complaintsUpdatePage.saveButton);
    expect(await isVisible(complaintsUpdatePage.saveButton)).to.be.false;

    expect(await complaintsComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(complaintsComponentsPage.table);

    await waitUntilCount(complaintsComponentsPage.records, beforeRecordsCount + 1);
    expect(await complaintsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Complaints', async () => {
    const deleteButton = complaintsComponentsPage.getDeleteButton(complaintsComponentsPage.records.last());
    await click(deleteButton);

    complaintsDeleteDialog = new ComplaintsDeleteDialog();
    await waitUntilDisplayed(complaintsDeleteDialog.deleteModal);
    expect(await complaintsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.complaints.delete.question/);
    await complaintsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(complaintsDeleteDialog.deleteModal);

    expect(await isVisible(complaintsDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([complaintsComponentsPage.noRecords, complaintsComponentsPage.table]);

    const afterCount = (await isVisible(complaintsComponentsPage.noRecords)) ? 0 : await getRecordsCount(complaintsComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
