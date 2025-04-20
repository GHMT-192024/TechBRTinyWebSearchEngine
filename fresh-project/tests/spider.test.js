const path = require("path");
const { createIndex, getPagesForKeyword } = require("../src/searchIndex.js"); // Import only necessary functions
const { crawl } = require(path.resolve(__dirname, "../src/spider.js"));
const nock = require("nock");

describe("Spider Component", () => {
  let index;

  beforeEach(() => {
    index = createIndex();
  });

  it("should crawl a single page and add it to the index", async () => {
    // Mock the HTML response for the page.  Crucially, the content
    //  inside the <body> tag is what your spider.js is extracting.
    nock("https://www.example.com")
      .get("/")
      .reply(
        200,
        "<html><body>This is a page about cats and dogs.</body></html>"
      );

    await crawl("https://www.example.com", index);

    const results = getPagesForKeyword(index, "cats");
    expect(results).toContain("https://www.example.com");
  });

  it("should follow links and crawl multiple pages", async () => {
    // Mock the HTML responses for two pages.  Note the link
    //  from the first page to the second.
    nock("https://www.example.com")
      .get("/")
      .reply(
        200,
        '<html><body> This is the homepage. <a href="/about">About</a></body></html>'
      );

    nock("https://www.example.com")
      .get("/about")
      .reply(
        200,
        "<html><body>This is the about page about cats.</body></html>"
      );

    //  Tell nock to only intercept each URL once.  This prevents
    //  infinite recursion if your spider has a bug.
    await crawl("https://www.example.com", index);

    const homeResults = getPagesForKeyword(index, "homepage");
    const aboutResults = getPagesForKeyword(index, "about");

    expect(homeResults).toContain("https://www.example.com");
    expect(aboutResults).toContain("https://www.example.com/about");
  }, 10000); // 10000 milliseconds (10 seconds) - increased timeout
});
