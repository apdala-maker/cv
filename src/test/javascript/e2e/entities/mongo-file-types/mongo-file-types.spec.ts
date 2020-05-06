import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MongoFileTypesComponentsPage, { MongoFileTypesDeleteDialog } from './mongo-file-types.page-object';
import MongoFileTypesUpdatePage from './mongo-file-types-update.page-object';
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

describe('MongoFileTypes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mongoFileTypesComponentsPage: MongoFileTypesComponentsPage;
  let mongoFileTypesUpdatePage: MongoFileTypesUpdatePage;
  let mongoFileTypesDeleteDialog: MongoFileTypesDeleteDialog;
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

  it('should load MongoFileTypes', async () => {
    await navBarPage.getEntityPage('mongo-file-types');
    mongoFileTypesComponentsPage = new MongoFileTypesComponentsPage();
    expect(await mongoFileTypesComponentsPage.title.getText()).to.match(/Mongo File Types/);

    expect(await mongoFileTypesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([mongoFileTypesComponentsPage.noRecords, mongoFileTypesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(mongoFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(mongoFileTypesComponentsPage.table);
  });

  it('should load create MongoFileTypes page', async () => {
    await mongoFileTypesComponentsPage.createButton.click();
    mongoFileTypesUpdatePage = new MongoFileTypesUpdatePage();
    expect(await mongoFileTypesUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.mongoFileTypes.home.createOrEditLabel/
    );
    await mongoFileTypesUpdatePage.cancel();
  });

  it('should create and save MongoFileTypes', async () => {
    await mongoFileTypesComponentsPage.createButton.click();
    await mongoFileTypesUpdatePage.setFileNameInput('fileName');
    expect(await mongoFileTypesUpdatePage.getFileNameInput()).to.match(/fileName/);
    await mongoFileTypesUpdatePage.setFileTypeInput('fileType');
    expect(await mongoFileTypesUpdatePage.getFileTypeInput()).to.match(/fileType/);
    await mongoFileTypesUpdatePage.setNarrationInput('narration');
    expect(await mongoFileTypesUpdatePage.getNarrationInput()).to.match(/narration/);
    await mongoFileTypesUpdatePage.setAreaFileTypeCodeInput('areaFileTypeCode');
    expect(await mongoFileTypesUpdatePage.getAreaFileTypeCodeInput()).to.match(/areaFileTypeCode/);
    await mongoFileTypesUpdatePage.setExpiryDateInput('01-01-2001');
    expect(await mongoFileTypesUpdatePage.getExpiryDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(mongoFileTypesUpdatePage.saveButton);
    await mongoFileTypesUpdatePage.save();
    await waitUntilHidden(mongoFileTypesUpdatePage.saveButton);
    expect(await isVisible(mongoFileTypesUpdatePage.saveButton)).to.be.false;

    expect(await mongoFileTypesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(mongoFileTypesComponentsPage.table);

    await waitUntilCount(mongoFileTypesComponentsPage.records, beforeRecordsCount + 1);
    expect(await mongoFileTypesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last MongoFileTypes', async () => {
    const deleteButton = mongoFileTypesComponentsPage.getDeleteButton(mongoFileTypesComponentsPage.records.last());
    await click(deleteButton);

    mongoFileTypesDeleteDialog = new MongoFileTypesDeleteDialog();
    await waitUntilDisplayed(mongoFileTypesDeleteDialog.deleteModal);
    expect(await mongoFileTypesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.mongoFileTypes.delete.question/
    );
    await mongoFileTypesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(mongoFileTypesDeleteDialog.deleteModal);

    expect(await isVisible(mongoFileTypesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([mongoFileTypesComponentsPage.noRecords, mongoFileTypesComponentsPage.table]);

    const afterCount = (await isVisible(mongoFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(mongoFileTypesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
