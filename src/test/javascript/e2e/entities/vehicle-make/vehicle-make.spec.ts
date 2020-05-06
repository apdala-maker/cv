import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleMakeComponentsPage, { VehicleMakeDeleteDialog } from './vehicle-make.page-object';
import VehicleMakeUpdatePage from './vehicle-make-update.page-object';
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

describe('VehicleMake e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleMakeComponentsPage: VehicleMakeComponentsPage;
  let vehicleMakeUpdatePage: VehicleMakeUpdatePage;
  let vehicleMakeDeleteDialog: VehicleMakeDeleteDialog;
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

  it('should load VehicleMakes', async () => {
    await navBarPage.getEntityPage('vehicle-make');
    vehicleMakeComponentsPage = new VehicleMakeComponentsPage();
    expect(await vehicleMakeComponentsPage.title.getText()).to.match(/Vehicle Makes/);

    expect(await vehicleMakeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([vehicleMakeComponentsPage.noRecords, vehicleMakeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(vehicleMakeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleMakeComponentsPage.table);
  });

  it('should load create VehicleMake page', async () => {
    await vehicleMakeComponentsPage.createButton.click();
    vehicleMakeUpdatePage = new VehicleMakeUpdatePage();
    expect(await vehicleMakeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.vehicleMake.home.createOrEditLabel/
    );
    await vehicleMakeUpdatePage.cancel();
  });

  it('should create and save VehicleMakes', async () => {
    await vehicleMakeComponentsPage.createButton.click();
    await vehicleMakeUpdatePage.setDescriptionInput('description');
    expect(await vehicleMakeUpdatePage.getDescriptionInput()).to.match(/description/);
    await vehicleMakeUpdatePage.setMakeCodeInput('makeCode');
    expect(await vehicleMakeUpdatePage.getMakeCodeInput()).to.match(/makeCode/);
    await vehicleMakeUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await vehicleMakeUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await vehicleMakeUpdatePage.setCreatedByInput('createdBy');
    expect(await vehicleMakeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await vehicleMakeUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await vehicleMakeUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await vehicleMakeUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await vehicleMakeUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await vehicleMakeUpdatePage.setModifiedByInput('modifiedBy');
    expect(await vehicleMakeUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await vehicleMakeUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await vehicleMakeUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(vehicleMakeUpdatePage.saveButton);
    await vehicleMakeUpdatePage.save();
    await waitUntilHidden(vehicleMakeUpdatePage.saveButton);
    expect(await isVisible(vehicleMakeUpdatePage.saveButton)).to.be.false;

    expect(await vehicleMakeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(vehicleMakeComponentsPage.table);

    await waitUntilCount(vehicleMakeComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleMakeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last VehicleMake', async () => {
    const deleteButton = vehicleMakeComponentsPage.getDeleteButton(vehicleMakeComponentsPage.records.last());
    await click(deleteButton);

    vehicleMakeDeleteDialog = new VehicleMakeDeleteDialog();
    await waitUntilDisplayed(vehicleMakeDeleteDialog.deleteModal);
    expect(await vehicleMakeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.vehicleMake.delete.question/);
    await vehicleMakeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleMakeDeleteDialog.deleteModal);

    expect(await isVisible(vehicleMakeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([vehicleMakeComponentsPage.noRecords, vehicleMakeComponentsPage.table]);

    const afterCount = (await isVisible(vehicleMakeComponentsPage.noRecords)) ? 0 : await getRecordsCount(vehicleMakeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
