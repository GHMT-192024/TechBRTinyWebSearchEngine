const {
  //object destructuring syntax
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
} = require("../searchIndex");
// const wholeImport = require("../searchIndex") // the long way without destructuring
// const createIndexTheLongDeclaration = wholeImport.createIndex;
// console.log(wholeImport);

describe("Search Index", () => {
  let index;

  beforeEach(() => {
    index = createIndex();
  });

  it.only("should add a new page to the index", () => {
    //arrange
    const exampleUrl = "https://www.example.com";
    //act
    addPageToIndex(
      index,
      exampleUrl,
      "This is a sample web page about dogs. This web page talks about dogs a lot. dogs"
    );
    //assert
    expect(getPagesForKeyword(index, "dogs")).toContain(exampleUrl);
  });
  it("should update a page in the index", () => {
    //arrange
    const exampleUrl = "https://www.example.com";
    addPageToIndex(index, exampleUrl, "This is a sample web page about dogs");
    //act
    updatePageInIndex(
      index,
      exampleUrl,
      "This is a different web page, concerning cats"
    );
    //assert
    expect(getPagesForKeyword(index, "dogs")).not.toContain(exampleUrl);
    expect(getPagesForKeyword(index, "cats")).toContain(exampleUrl);
  });
});
