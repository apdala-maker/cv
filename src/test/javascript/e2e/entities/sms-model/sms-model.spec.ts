import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SmsModelComponentsPage, { SmsModelDeleteDialog } from './sms-model.page-object';
import SmsModelUpdatePage from './sms-model-update.page-object';
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

describe('SmsModel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let smsModelComponentsPage: SmsModelComponentsPage;
  let smsModelUpdatePage: SmsModelUpdatePage;
  let smsModelDeleteDialog: SmsModelDeleteDialog;
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

  it('should load SmsModels', async () => {
    await navBarPage.getEntityPage('sms-model');
    smsModelComponentsPage = new SmsModelComponentsPage();
    expect(await smsModelComponentsPage.title.getText()).to.match(/Sms Models/);

    expect(await smsModelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([smsModelComponentsPage.noRecords, smsModelComponentsPage.table]);

    beforeRecordsCount = (await isVisible(smsModelComponentsPage.noRecords)) ? 0 : await getRecordsCount(smsModelComponentsPage.table);
  });

  it('should load create SmsModel page', async () => {
    await smsModelComponentsPage.createButton.click();
    smsModelUpdatePage = new SmsModelUpdatePage();
    expect(await smsModelUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.smsModel.home.createOrEditLabel/);
    await smsModelUpdatePage.cancel();
  });

  it('should create and save SmsModels', async () => {
    await smsModelComponentsPage.createButton.click();
    await smsModelUpdatePage.setPhoneNumberInput('phoneNumber');
    expect(await smsModelUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
    await smsModelUpdatePage.setMessageInput('message');
    expect(await smsModelUpdatePage.getMessageInput()).to.match(/message/);
    const selectedIsSend = await smsModelUpdatePage.getIsSendInput().isSelected();
    if (selectedIsSend) {
      await smsModelUpdatePage.getIsSendInput().click();
      expect(await smsModelUpdatePage.getIsSendInput().isSelected()).to.be.false;
    } else {
      await smsModelUpdatePage.getIsSendInput().click();
      expect(await smsModelUpdatePage.getIsSendInput().isSelected()).to.be.true;
    }
    await smsModelUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await smsModelUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await smsModelUpdatePage.setCreatedByInput('createdBy');
    expect(await smsModelUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await smsModelUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await smsModelUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await smsModelUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await smsModelUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await smsModelUpdatePage.setModifiedByInput('modifiedBy');
    expect(await smsModelUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await smsModelUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await smsModelUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(smsModelUpdatePage.saveButton);
    await smsModelUpdatePage.save();
    await waitUntilHidden(smsModelUpdatePage.saveButton);
    expect(await isVisible(smsModelUpdatePage.saveButton)).to.be.false;

    expect(await smsModelComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(smsModelComponentsPage.table);

    await waitUntilCount(smsModelComponentsPage.records, beforeRecordsCount + 1);
    expect(await smsModelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SmsModel', async () => {
    const deleteButton = smsModelComponentsPage.getDeleteButton(smsModelComponentsPage.records.last());
    await click(deleteButton);

    smsModelDeleteDialog = new SmsModelDeleteDialog();
    await waitUntilDisplayed(smsModelDeleteDialog.deleteModal);
    expect(await smsModelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.smsModel.delete.question/);
    await smsModelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(smsModelDeleteDialog.deleteModal);

    expect(await isVisible(smsModelDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([smsModelComponentsPage.noRecords, smsModelComponentsPage.table]);

    const afterCount = (await isVisible(smsModelComponentsPage.noRecords)) ? 0 : await getRecordsCount(smsModelComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
