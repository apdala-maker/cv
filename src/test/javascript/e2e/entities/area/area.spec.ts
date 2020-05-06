import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaComponentsPage, { AreaDeleteDialog } from './area.page-object';
import AreaUpdatePage from './area-update.page-object';
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

describe('Area e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaComponentsPage: AreaComponentsPage;
  let areaUpdatePage: AreaUpdatePage;
  let areaDeleteDialog: AreaDeleteDialog;
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

  it('should load Areas', async () => {
    await navBarPage.getEntityPage('area');
    areaComponentsPage = new AreaComponentsPage();
    expect(await areaComponentsPage.title.getText()).to.match(/Areas/);

    expect(await areaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([areaComponentsPage.noRecords, areaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(areaComponentsPage.noRecords)) ? 0 : await getRecordsCount(areaComponentsPage.table);
  });

  it('should load create Area page', async () => {
    await areaComponentsPage.createButton.click();
    areaUpdatePage = new AreaUpdatePage();
    expect(await areaUpdatePage.getPageTitle().getAttribute('id')).to.match(/catchControlPanelApp.area.home.createOrEditLabel/);
    await areaUpdatePage.cancel();
  });

  it('should create and save Areas', async () => {
    await areaComponentsPage.createButton.click();
    await areaUpdatePage.setCountryCodeInput('countryCode');
    expect(await areaUpdatePage.getCountryCodeInput()).to.match(/countryCode/);
    await areaUpdatePage.setAreaCodeInput('areaCode');
    expect(await areaUpdatePage.getAreaCodeInput()).to.match(/areaCode/);
    await areaUpdatePage.setAddressInput('address');
    expect(await areaUpdatePage.getAddressInput()).to.match(/address/);
    await areaUpdatePage.setNameInput('name');
    expect(await areaUpdatePage.getNameInput()).to.match(/name/);
    await areaUpdatePage.setNorthEastLatitudeInput('northEastLatitude');
    expect(await areaUpdatePage.getNorthEastLatitudeInput()).to.match(/northEastLatitude/);
    await areaUpdatePage.setSouthWestLatitudeInput('southWestLatitude');
    expect(await areaUpdatePage.getSouthWestLatitudeInput()).to.match(/southWestLatitude/);
    await areaUpdatePage.setNorthEastLongitudeInput('northEastLongitude');
    expect(await areaUpdatePage.getNorthEastLongitudeInput()).to.match(/northEastLongitude/);
    await areaUpdatePage.setSouthWestLongitudeInput('southWestLongitude');
    expect(await areaUpdatePage.getSouthWestLongitudeInput()).to.match(/southWestLongitude/);
    const selectedIsActive = await areaUpdatePage.getIsActiveInput().isSelected();
    if (selectedIsActive) {
      await areaUpdatePage.getIsActiveInput().click();
      expect(await areaUpdatePage.getIsActiveInput().isSelected()).to.be.false;
    } else {
      await areaUpdatePage.getIsActiveInput().click();
      expect(await areaUpdatePage.getIsActiveInput().isSelected()).to.be.true;
    }
    const selectedIsApproved = await areaUpdatePage.getIsApprovedInput().isSelected();
    if (selectedIsApproved) {
      await areaUpdatePage.getIsApprovedInput().click();
      expect(await areaUpdatePage.getIsApprovedInput().isSelected()).to.be.false;
    } else {
      await areaUpdatePage.getIsApprovedInput().click();
      expect(await areaUpdatePage.getIsApprovedInput().isSelected()).to.be.true;
    }
    await areaUpdatePage.setApprovedByInput('approvedBy');
    expect(await areaUpdatePage.getApprovedByInput()).to.match(/approvedBy/);
    await areaUpdatePage.setActivatedByInput('activatedBy');
    expect(await areaUpdatePage.getActivatedByInput()).to.match(/activatedBy/);
    await areaUpdatePage.setDateCreatedInput('01-01-2001');
    expect(await areaUpdatePage.getDateCreatedInput()).to.eq('2001-01-01');
    await areaUpdatePage.setCreatedByInput('createdBy');
    expect(await areaUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await areaUpdatePage.setCreatorUserEmailInput('creatorUserEmail');
    expect(await areaUpdatePage.getCreatorUserEmailInput()).to.match(/creatorUserEmail/);
    await areaUpdatePage.setDateModifiedInput('01-01-2001');
    expect(await areaUpdatePage.getDateModifiedInput()).to.eq('2001-01-01');
    await areaUpdatePage.setModifiedByInput('modifiedBy');
    expect(await areaUpdatePage.getModifiedByInput()).to.match(/modifiedBy/);
    await areaUpdatePage.setModifierUserEmailInput('modifierUserEmail');
    expect(await areaUpdatePage.getModifierUserEmailInput()).to.match(/modifierUserEmail/);
    await waitUntilDisplayed(areaUpdatePage.saveButton);
    await areaUpdatePage.save();
    await waitUntilHidden(areaUpdatePage.saveButton);
    expect(await isVisible(areaUpdatePage.saveButton)).to.be.false;

    expect(await areaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(areaComponentsPage.table);

    await waitUntilCount(areaComponentsPage.records, beforeRecordsCount + 1);
    expect(await areaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Area', async () => {
    const deleteButton = areaComponentsPage.getDeleteButton(areaComponentsPage.records.last());
    await click(deleteButton);

    areaDeleteDialog = new AreaDeleteDialog();
    await waitUntilDisplayed(areaDeleteDialog.deleteModal);
    expect(await areaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/catchControlPanelApp.area.delete.question/);
    await areaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(areaDeleteDialog.deleteModal);

    expect(await isVisible(areaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([areaComponentsPage.noRecords, areaComponentsPage.table]);

    const afterCount = (await isVisible(areaComponentsPage.noRecords)) ? 0 : await getRecordsCount(areaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
