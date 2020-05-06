import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FileStorageComponentsPage, { FileStorageDeleteDialog } from './file-storage.page-object';
import FileStorageUpdatePage from './file-storage-update.page-object';
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

describe('FileStorage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileStorageComponentsPage: FileStorageComponentsPage;
  let fileStorageUpdatePage: FileStorageUpdatePage;
  let fileStorageDeleteDialog: FileStorageDeleteDialog;
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

  it('should load FileStorages', async () => {
    await navBarPage.getEntityPage('file-storage');
    fileStorageComponentsPage = new FileStorageComponentsPage();
    expect(await fileStorageComponentsPage.title.getText()).to.match(/File Storages/);

    expect(await fileStorageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([fileStorageComponentsPage.noRecords, fileStorageComponentsPage.table]);

    beforeRecordsCount = (await isVisible(fileStorageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fileStorageComponentsPage.table);
  });

  it('should load create FileStorage page', async () => {
    await fileStorageComponentsPage.createButton.click();
    fileStorageUpdatePage = new FileStorageUpdatePage();
    expect(await fileStorageUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.fileStorage.home.createOrEditLabel/
    );
    await fileStorageUpdatePage.cancel();
  });

  it('should create and save FileStorages', async () => {
    await fileStorageComponentsPage.createButton.click();
    await fileStorageUpdatePage.setFileNameInput('fileName');
    expect(await fileStorageUpdatePage.getFileNameInput()).to.match(/fileName/);
    await fileStorageUpdatePage.setFileTypeInput('fileType');
    expect(await fileStorageUpdatePage.getFileTypeInput()).to.match(/fileType/);
    await fileStorageUpdatePage.setReferenceCodeInput('referenceCode');
    expect(await fileStorageUpdatePage.getReferenceCodeInput()).to.match(/referenceCode/);
    await fileStorageUpdatePage.setNarrationInput('narration');
    expect(await fileStorageUpdatePage.getNarrationInput()).to.match(/narration/);
    await fileStorageUpdatePage.setAreaFileTypeCodeInput('areaFileTypeCode');
    expect(await fileStorageUpdatePage.getAreaFileTypeCodeInput()).to.match(/areaFileTypeCode/);
    await fileStorageUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await fileStorageUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await fileStorageUpdatePage.setCreatedByInput('createdBy');
    expect(await fileStorageUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await fileStorageUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await fileStorageUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await fileStorageUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await fileStorageUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await fileStorageUpdatePage.setModifiedByInput('modifiedBy');
    expect(await fileStorageUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await fileStorageUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await fileStorageUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(fileStorageUpdatePage.saveButton);
    await fileStorageUpdatePage.save();
    await waitUntilHidden(fileStorageUpdatePage.saveButton);
    expect(await isVisible(fileStorageUpdatePage.saveButton)).to.be.false;

    expect(await fileStorageComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(fileStorageComponentsPage.table);

    await waitUntilCount(fileStorageComponentsPage.records, beforeRecordsCount + 1);
    expect(await fileStorageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last FileStorage', async () => {
    const deleteButton = fileStorageComponentsPage.getDeleteButton(fileStorageComponentsPage.records.last());
    await click(deleteButton);

    fileStorageDeleteDialog = new FileStorageDeleteDialog();
    await waitUntilDisplayed(fileStorageDeleteDialog.deleteModal);
    expect(await fileStorageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.fileStorage.delete.question/);
    await fileStorageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fileStorageDeleteDialog.deleteModal);

    expect(await isVisible(fileStorageDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([fileStorageComponentsPage.noRecords, fileStorageComponentsPage.table]);

    const afterCount = (await isVisible(fileStorageComponentsPage.noRecords)) ? 0 : await getRecordsCount(fileStorageComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
