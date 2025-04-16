const { createIndex, getPagesForKeyword } = require("../searchIndex");
const { crawl } = require("../spider");
const nock = require("nock"); // Mock HTTP requests for testing

describe("Spider Component", () => {
  let index;

  // Initialize a new index before each test
  beforeEach(() => {
    index = createIndex();
  });
  
});
// Test 1: Crawl a single page and add its content to the index
it("should crawl a single page and add it to the index", async () => {
  // Mock the HTML response for the page
  nock("https://www.example.com");
    .get("/")
    .reply(
      200,
      "<html><body>This is a page about cats and dogs.</body></html>"
    );

    await crawl("https://www.example.com", index);

    const results = getPagesForKeyword(index, "cats");
    expect(results).toContain("https://www.example.com");
});

// Test 2: Follow links and crawl multiple pages
it("should follow links and crawl multiple pages", async () => {
  // Mock the HTML responses for two pages
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

await crawl("https://www.example.com", index);

const homeResults = getPagesForKeyword(index, "homepage");
const aboutResults = getPagesForKeyword(index, "about");

expect(homeResults).toContain("https://www.example.com");
});
