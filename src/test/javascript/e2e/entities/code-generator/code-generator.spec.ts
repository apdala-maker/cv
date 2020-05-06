import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CodeGeneratorComponentsPage, { CodeGeneratorDeleteDialog } from './code-generator.page-object';
import CodeGeneratorUpdatePage from './code-generator-update.page-object';
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

describe('CodeGenerator e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let codeGeneratorComponentsPage: CodeGeneratorComponentsPage;
  let codeGeneratorUpdatePage: CodeGeneratorUpdatePage;
  let codeGeneratorDeleteDialog: CodeGeneratorDeleteDialog;
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

  it('should load CodeGenerators', async () => {
    await navBarPage.getEntityPage('code-generator');
    codeGeneratorComponentsPage = new CodeGeneratorComponentsPage();
    expect(await codeGeneratorComponentsPage.title.getText()).to.match(/Code Generators/);

    expect(await codeGeneratorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([codeGeneratorComponentsPage.noRecords, codeGeneratorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(codeGeneratorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(codeGeneratorComponentsPage.table);
  });

  it('should load create CodeGenerator page', async () => {
    await codeGeneratorComponentsPage.createButton.click();
    codeGeneratorUpdatePage = new CodeGeneratorUpdatePage();
    expect(await codeGeneratorUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.codeGenerator.home.createOrEditLabel/
    );
    await codeGeneratorUpdatePage.cancel();
  });

  it('should create and save CodeGenerators', async () => {
    await codeGeneratorComponentsPage.createButton.click();
    await codeGeneratorUpdatePage.setSeedInput('seed');
    expect(await codeGeneratorUpdatePage.getSeedInput()).to.match(/seed/);
    await codeGeneratorUpdatePage.setCurrentNumberInput('5');
    expect(await codeGeneratorUpdatePage.getCurrentNumberInput()).to.eq('5');
    await codeGeneratorUpdatePage.setNumberCategoryInput('numberCategory');
    expect(await codeGeneratorUpdatePage.getNumberCategoryInput()).to.match(/numberCategory/);
    await codeGeneratorUpdatePage.setPrefixInput('prefix');
    expect(await codeGeneratorUpdatePage.getPrefixInput()).to.match(/prefix/);
    await codeGeneratorUpdatePage.setCharacterCountInput('5');
    expect(await codeGeneratorUpdatePage.getCharacterCountInput()).to.eq('5');
    await codeGeneratorUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await codeGeneratorUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await codeGeneratorUpdatePage.setCreatedByInput('createdBy');
    expect(await codeGeneratorUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await codeGeneratorUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await codeGeneratorUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await codeGeneratorUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await codeGeneratorUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await codeGeneratorUpdatePage.setModifiedByInput('modifiedBy');
    expect(await codeGeneratorUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await codeGeneratorUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await codeGeneratorUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(codeGeneratorUpdatePage.saveButton);
    await codeGeneratorUpdatePage.save();
    await waitUntilHidden(codeGeneratorUpdatePage.saveButton);
    expect(await isVisible(codeGeneratorUpdatePage.saveButton)).to.be.false;

    expect(await codeGeneratorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(codeGeneratorComponentsPage.table);

    await waitUntilCount(codeGeneratorComponentsPage.records, beforeRecordsCount + 1);
    expect(await codeGeneratorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CodeGenerator', async () => {
    const deleteButton = codeGeneratorComponentsPage.getDeleteButton(codeGeneratorComponentsPage.records.last());
    await click(deleteButton);

    codeGeneratorDeleteDialog = new CodeGeneratorDeleteDialog();
    await waitUntilDisplayed(codeGeneratorDeleteDialog.deleteModal);
    expect(await codeGeneratorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.codeGenerator.delete.question/
    );
    await codeGeneratorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(codeGeneratorDeleteDialog.deleteModal);

    expect(await isVisible(codeGeneratorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([codeGeneratorComponentsPage.noRecords, codeGeneratorComponentsPage.table]);

    const afterCount = (await isVisible(codeGeneratorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(codeGeneratorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
