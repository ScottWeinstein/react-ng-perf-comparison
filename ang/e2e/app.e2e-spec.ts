import { AngPage } from './app.po';

describe('ang App', () => {
  let page: AngPage;

  beforeEach(() => {
    page = new AngPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
