import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RestrictedAreaComponentsPage, { RestrictedAreaDeleteDialog } from './restricted-area.page-object';
import RestrictedAreaUpdatePage from './restricted-area-update.page-object';
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

describe('RestrictedArea e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let restrictedAreaComponentsPage: RestrictedAreaComponentsPage;
  let restrictedAreaUpdatePage: RestrictedAreaUpdatePage;
  let restrictedAreaDeleteDialog: RestrictedAreaDeleteDialog;
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

  it('should load RestrictedAreas', async () => {
    await navBarPage.getEntityPage('restricted-area');
    restrictedAreaComponentsPage = new RestrictedAreaComponentsPage();
    expect(await restrictedAreaComponentsPage.title.getText()).to.match(/Restricted Areas/);

    expect(await restrictedAreaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([restrictedAreaComponentsPage.noRecords, restrictedAreaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(restrictedAreaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(restrictedAreaComponentsPage.table);
  });

  it('should load create RestrictedArea page', async () => {
    await restrictedAreaComponentsPage.createButton.click();
    restrictedAreaUpdatePage = new RestrictedAreaUpdatePage();
    expect(await restrictedAreaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.restrictedArea.home.createOrEditLabel/
    );
    await restrictedAreaUpdatePage.cancel();
  });

  it('should create and save RestrictedAreas', async () => {
    await restrictedAreaComponentsPage.createButton.click();
    await restrictedAreaUpdatePage.setAreaCodeInput('areaCode');
    expect(await restrictedAreaUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await restrictedAreaUpdatePage.setNameInput('name');
    expect(await restrictedAreaUpdatePage.getNameInput()).to.match(/name/);
    await restrictedAreaUpdatePage.setNorthEastLatitudeInput('northEastLatitude');
    expect(await restrictedAreaUpdatePage.getNorthEastLatitudeInput()).to.match(/northEastLatitude/);
    await restrictedAreaUpdatePage.setSouthWestLatitudeInput('southWestLatitude');
    expect(await restrictedAreaUpdatePage.getSouthWestLatitudeInput()).to.match(/southWestLatitude/);
    await restrictedAreaUpdatePage.setNorthEastLongitudeInput('northEastLongitude');
    expect(await restrictedAreaUpdatePage.getNorthEastLongitudeInput()).to.match(/northEastLongitude/);
    await restrictedAreaUpdatePage.setSouthWestLongitudeInput('southWestLongitude');
    expect(await restrictedAreaUpdatePage.getSouthWestLongitudeInput()).to.match(/southWestLongitude/);
    await restrictedAreaUpdatePage.setVehicleTypeCodeInput('vehicleTypeCode');
    expect(await restrictedAreaUpdatePage.getVehicleTypeCodeInput()).to.match(/vehicleTypeCode/);
    await restrictedAreaUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await restrictedAreaUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await restrictedAreaUpdatePage.setCreatedByInput('createdBy');
    expect(await restrictedAreaUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await restrictedAreaUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await restrictedAreaUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await restrictedAreaUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await restrictedAreaUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await restrictedAreaUpdatePage.setModifiedByInput('modifiedBy');
    expect(await restrictedAreaUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await restrictedAreaUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await restrictedAreaUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(restrictedAreaUpdatePage.saveButton);
    await restrictedAreaUpdatePage.save();
    await waitUntilHidden(restrictedAreaUpdatePage.saveButton);
    expect(await isVisible(restrictedAreaUpdatePage.saveButton)).to.be.false;

    expect(await restrictedAreaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(restrictedAreaComponentsPage.table);

    await waitUntilCount(restrictedAreaComponentsPage.records, beforeRecordsCount + 1);
    expect(await restrictedAreaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last RestrictedArea', async () => {
    const deleteButton = restrictedAreaComponentsPage.getDeleteButton(restrictedAreaComponentsPage.records.last());
    await click(deleteButton);

    restrictedAreaDeleteDialog = new RestrictedAreaDeleteDialog();
    await waitUntilDisplayed(restrictedAreaDeleteDialog.deleteModal);
    expect(await restrictedAreaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /catchControlPanelApp.restrictedArea.delete.question/
    );
    await restrictedAreaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(restrictedAreaDeleteDialog.deleteModal);

    expect(await isVisible(restrictedAreaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([restrictedAreaComponentsPage.noRecords, restrictedAreaComponentsPage.table]);

    const afterCount = (await isVisible(restrictedAreaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(restrictedAreaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
