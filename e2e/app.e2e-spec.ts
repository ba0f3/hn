import { HnPage } from './app.po';

describe('hn App', function() {
  let page: HnPage;

  beforeEach(() => {
    page = new HnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
