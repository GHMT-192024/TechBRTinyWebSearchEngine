const path = require("path");

const {
  createIndex,
  addPageToIndex,
  getPageIndex,
} = require("../src/searchIndex.js");
const searchAlgorithmPath = path.resolve(
  __dirname,
  "../src/searchAlgorithm.js"
);
const { search } = require(searchAlgorithmPath);
const { rankSearchResults } = require("../src/rankingAlgorithm.js");

describe("Ranking Algorithm", () => {
  let index;

  beforeEach(() => {
    index = createIndex();
    addPageToIndex(
      index,
      "https://www.example.com/cats",
      "This is a page about cats"
    );
    addPageToIndex(
      index,
      "https://www.example.com/dogs",
      "This is a page about dogs and training"
    );
    addPageToIndex(
      index,
      "https://www.example.com/cats-and-dogs",
      "This is a page about both cats and dogs"
    );
    addPageToIndex(
      index,
      "https://www.example.com/ml",
      "This is a page about machine learning"
    );
  });

  it("should rank results based on keyword frequencies", () => {
    console.log("Index before search:", index);
    const searchResults = search(index, "cats"); // Default OR
    const rankedResults = rankSearchResults(index, "cats", searchResults);

    expect(rankedResults[0]).toBe("https://www.example.com/cats");
    expect(rankedResults[1]).toBe("https://www.example.com/cats-and-dogs");
  });

  it("should rank pages with more keyword matches higher", () => {
    console.log("Index before search:", index);
    const searchResults = search(index, "cats dogs"); // Default OR
    const rankedResults = rankSearchResults(index, "cats dogs", searchResults);

    expect(rankedResults[0]).toBe("https://www.example.com/cats-and-dogs");
    expect(rankedResults[1]).toBe("https://www.example.com/cats");
    expect(rankedResults[2]).toBe("https://www.example.com/dogs");
  });

  it("should return an empty array if there are no matches", () => {
    const searchResults = search(index, "birds"); // Default OR (will return [])
    const rankedResults = rankSearchResults(index, "birds", searchResults);

    expect(rankedResults).toEqual([]);
  });

  it("should handle ties in ranking", () => {
    const searchResults = search(index, "machine learning"); // Default OR
    const rankedResults = rankSearchResults(
      index,
      "machine learning",
      searchResults
    );

    expect(rankedResults.length).toBe(1);
    expect(rankedResults[0]).toBe("https://www.example.com/ml");
  });
});
