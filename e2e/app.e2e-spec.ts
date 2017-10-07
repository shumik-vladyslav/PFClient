import { NewclienPage } from './app.po';

describe('newclien App', () => {
  let page: NewclienPage;

  beforeEach(() => {
    page = new NewclienPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
