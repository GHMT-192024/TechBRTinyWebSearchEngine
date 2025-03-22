const {
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
} = require("../searchIndex");

describe("Search Index", () => {
  let index;

  beforeEach(() => {
    index = createIndex();
  });

  it("should add a new page to the index", () => {
    // Scenarios 1 & 4
    const exampleUrl = "https://www.example.com";
    addPageToIndex(
      index,
      exampleUrl,
      "This is a sample web page about dogs. This web page talks about dogs a lot. dogs"
    );
    expect(getPagesForKeyword(index, "dogs")).toContain(exampleUrl);
  });

  it("should add a new page to the index", () => {
    const exampleUrl = "https://www.example.com";
    addPageToIndex(index, exampleUrl, "This is a sample web page about dogs");
    expect(getPagesForKeyword(index, "dogs")).toContain(exampleUrl);
  });

  it("should update a page in the index", () => {
    const exampleUrl = "https://www.example.com";
    addPageToIndex(index, exampleUrl, "This is a sample web page about dogs");
    updatePageInIndex(
      index,
      exampleUrl,
      "This is a different web page, concerning cats"
    );
    expect(getPagesForKeyword(index, "dogs")).toBeUndefined();
    expect(getPagesForKeyword(index, "cats")).toContain(exampleUrl);
  });
  it("should remove a page from the index", () => {
    const exampleUrl = "https://www.example.com";
    addPageToIndex(index, exampleUrl, "This is a sample web page about dogs");
    removePageFromIndex(index, exampleUrl);
    expect(getPagesForKeyword(index, "dogs")).toBeUndefined();
  });
  it("should remove only one page from the index", () => {
    //edge case, deleting too many keywords
    const lionsUrl = "https://www.lions.com";
    const tigersUrl = "https://www.tigers.com";
    addPageToIndex(index, lionsUrl, "a lion is a cat");
    addPageToIndex(index, tigersUrl, "a tiger is a cat");
    removePageFromIndex(index, lionsUrl);

    const lionsPages = getPagesForKeyword(index, "lion");
    expect(lionsPages ? lionsPages.size : 0).toBe(0);

    const tigersPages = getPagesForKeyword(index, "tiger");
    expect(tigersPages ? tigersPages.size : 0).toBe(1);
  });
  it("should match keywords regardless of their case", () => {
    const catsUrl = "thecatsurl";
    addPageToIndex(index, catsUrl, "Old Deuteronomy is from CATS");
    const results = getPagesForKeyword(index, "cats");
    expect(results).toContain(catsUrl);
  });
});
