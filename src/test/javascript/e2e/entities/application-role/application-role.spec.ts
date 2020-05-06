import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationRoleComponentsPage, { ApplicationRoleDeleteDialog } from './application-role.page-object';
import ApplicationRoleUpdatePage from './application-role-update.page-object';
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

describe('ApplicationRole e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationRoleComponentsPage: ApplicationRoleComponentsPage;
  let applicationRoleUpdatePage: ApplicationRoleUpdatePage;
  let applicationRoleDeleteDialog: ApplicationRoleDeleteDialog;
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

  it('should load ApplicationRoles', async () => {
    await navBarPage.getEntityPage('application-role');
    applicationRoleComponentsPage = new ApplicationRoleComponentsPage();
    expect(await applicationRoleComponentsPage.title.getText()).to.match(/Application Roles/);

    expect(await applicationRoleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([applicationRoleComponentsPage.noRecords, applicationRoleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(applicationRoleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationRoleComponentsPage.table);
  });

  it('should load create ApplicationRole page', async () => {
    await applicationRoleComponentsPage.createButton.click();
    applicationRoleUpdatePage = new ApplicationRoleUpdatePage();
    expect(await applicationRoleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.applicationRole.home.createOrEditLabel/
    );
    await applicationRoleUpdatePage.cancel();
  });

  it('should create and save ApplicationRoles', async () => {
    await applicationRoleComponentsPage.createButton.click();
    await applicationRoleUpdatePage.setAccessInput('access');
    expect(await applicationRoleUpdatePage.getAccessInput()).to.match(/access/);
    await applicationRoleUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await applicationRoleUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await applicationRoleUpdatePage.setCreatedByInput('createdBy');
    expect(await applicationRoleUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await applicationRoleUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await applicationRoleUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await applicationRoleUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await applicationRoleUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await applicationRoleUpdatePage.setModifiedByInput('modifiedBy');
    expect(await applicationRoleUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await applicationRoleUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await applicationRoleUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(applicationRoleUpdatePage.saveButton);
    await applicationRoleUpdatePage.save();
    await waitUntilHidden(applicationRoleUpdatePage.saveButton);
    expect(await isVisible(applicationRoleUpdatePage.saveButton)).to.be.false;

    expect(await applicationRoleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(applicationRoleComponentsPage.table);

    await waitUntilCount(applicationRoleComponentsPage.records, beforeRecordsCount + 1);
    expect(await applicationRoleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ApplicationRole', async () => {
    const deleteButton = applicationRoleComponentsPage.getDeleteButton(applicationRoleComponentsPage.records.last());
    await click(deleteButton);

    applicationRoleDeleteDialog = new ApplicationRoleDeleteDialog();
    await waitUntilDisplayed(applicationRoleDeleteDialog.deleteModal);
    expect(await applicationRoleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.applicationRole.delete.question/
    );
    await applicationRoleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(applicationRoleDeleteDialog.deleteModal);

    expect(await isVisible(applicationRoleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([applicationRoleComponentsPage.noRecords, applicationRoleComponentsPage.table]);

    const afterCount = (await isVisible(applicationRoleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(applicationRoleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
