import {Selector, t} from 'testcafe';
import faker from 'faker';

fixture('Suppliers').page`http://localhost:3000`;

const companyName = faker.company.companyName();
const email = faker.internet.email();
const addSupplierBtn = Selector('a').withText('Add Supplier');
const locationHash = () => t.eval(() => window.location.hash);
const tbodyRows = Selector('tbody > tr');
const paginationPages = Selector('.pagination .page-item').withText(/\d+/);
const perPageSelect = Selector(`select[name=perPage]`);
const perPageOption = perPageSelect.find('option');

test('Paginate', async t => {
  await t
    .expect(tbodyRows.childNodeCount)
    .eql(5)
    .expect(paginationPages.count)
    .gte(2);

  await t
    .click(perPageSelect)
    .click(perPageOption.withText('25'))
    // .wait(200)
    // .expect(tbodyRows.childNodeCount)
    // .eql(25) // fixme
    .expect(paginationPages.count)
    .lt(2);
});

test('Add', async t => {
  await t
    .click(addSupplierBtn)
    .expect(locationHash())
    .match(/suppliers\/new/);

  await t
    .typeText('input[name=name]', companyName)
    .typeText('input[name=first_name]', 'Test')
    .typeText('input[name=last_name]', 'Cafe')
    .typeText('input[name=email]', 'testcafe@example.com')
    .click('button[type=submit]')
    .expect(locationHash())
    .match(/suppliers\/\d+\/edit/);
});
