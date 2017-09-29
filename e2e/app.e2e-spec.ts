import { ProductiveFamiliesPage } from './app.po';

describe('productive-families App', () => {
  let page: ProductiveFamiliesPage;

  beforeEach(() => {
    page = new ProductiveFamiliesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
