import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaFileTypesComponentsPage, { AreaFileTypesDeleteDialog } from './area-file-types.page-object';
import AreaFileTypesUpdatePage from './area-file-types-update.page-object';
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

describe('AreaFileTypes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaFileTypesComponentsPage: AreaFileTypesComponentsPage;
  let areaFileTypesUpdatePage: AreaFileTypesUpdatePage;
  let areaFileTypesDeleteDialog: AreaFileTypesDeleteDialog;
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

  it('should load AreaFileTypes', async () => {
    await navBarPage.getEntityPage('area-file-types');
    areaFileTypesComponentsPage = new AreaFileTypesComponentsPage();
    expect(await areaFileTypesComponentsPage.title.getText()).to.match(/Area File Types/);

    expect(await areaFileTypesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([areaFileTypesComponentsPage.noRecords, areaFileTypesComponentsPage.table]);

    beforeRecordsCount = (await isVisible(areaFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(areaFileTypesComponentsPage.table);
  });

  it('should load create AreaFileTypes page', async () => {
    await areaFileTypesComponentsPage.createButton.click();
    areaFileTypesUpdatePage = new AreaFileTypesUpdatePage();
    expect(await areaFileTypesUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.areaFileTypes.home.createOrEditLabel/
    );
    await areaFileTypesUpdatePage.cancel();
  });

  it('should create and save AreaFileTypes', async () => {
    await areaFileTypesComponentsPage.createButton.click();
    await areaFileTypesUpdatePage.setCodeInput('code');
    expect(await areaFileTypesUpdatePage.getCodeInput()).to.match(/code/);
    await areaFileTypesUpdatePage.setAreaCodeInput('areaCode');
    expect(await areaFileTypesUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    const selectedIsManadatory = await areaFileTypesUpdatePage.getIsManadatoryInput().isSelected();
    if (selectedIsManadatory) {
      await areaFileTypesUpdatePage.getIsManadatoryInput().click();
      expect(await areaFileTypesUpdatePage.getIsManadatoryInput().isSelected()).to.be.false;
    } else {
      await areaFileTypesUpdatePage.getIsManadatoryInput().click();
      expect(await areaFileTypesUpdatePage.getIsManadatoryInput().isSelected()).to.be.true;
    }
    await areaFileTypesUpdatePage.setDescriptionInput('description');
    expect(await areaFileTypesUpdatePage.getDescriptionInput()).to.match(/description/);
    const selectedHasExpiry = await areaFileTypesUpdatePage.getHasExpiryInput().isSelected();
    if (selectedHasExpiry) {
      await areaFileTypesUpdatePage.getHasExpiryInput().click();
      expect(await areaFileTypesUpdatePage.getHasExpiryInput().isSelected()).to.be.false;
    } else {
      await areaFileTypesUpdatePage.getHasExpiryInput().click();
      expect(await areaFileTypesUpdatePage.getHasExpiryInput().isSelected()).to.be.true;
    }
    await areaFileTypesUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await areaFileTypesUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await areaFileTypesUpdatePage.setCreatedByInput('createdBy');
    expect(await areaFileTypesUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await areaFileTypesUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await areaFileTypesUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await areaFileTypesUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await areaFileTypesUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await areaFileTypesUpdatePage.setModifiedByInput('modifiedBy');
    expect(await areaFileTypesUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await areaFileTypesUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await areaFileTypesUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(areaFileTypesUpdatePage.saveButton);
    await areaFileTypesUpdatePage.save();
    await waitUntilHidden(areaFileTypesUpdatePage.saveButton);
    expect(await isVisible(areaFileTypesUpdatePage.saveButton)).to.be.false;

    expect(await areaFileTypesComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(areaFileTypesComponentsPage.table);

    await waitUntilCount(areaFileTypesComponentsPage.records, beforeRecordsCount + 1);
    expect(await areaFileTypesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last AreaFileTypes', async () => {
    const deleteButton = areaFileTypesComponentsPage.getDeleteButton(areaFileTypesComponentsPage.records.last());
    await click(deleteButton);

    areaFileTypesDeleteDialog = new AreaFileTypesDeleteDialog();
    await waitUntilDisplayed(areaFileTypesDeleteDialog.deleteModal);
    expect(await areaFileTypesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.areaFileTypes.delete.question/
    );
    await areaFileTypesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(areaFileTypesDeleteDialog.deleteModal);

    expect(await isVisible(areaFileTypesDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([areaFileTypesComponentsPage.noRecords, areaFileTypesComponentsPage.table]);

    const afterCount = (await isVisible(areaFileTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(areaFileTypesComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
