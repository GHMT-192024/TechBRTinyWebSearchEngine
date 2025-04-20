const path = require("path");
const { createIndex, addPageToIndex } = require("../src/searchIndex.js");
const searchAlgorithmPath = path.resolve(
  __dirname,
  "../src/searchAlgorithm.js"
);
const { search } = require(searchAlgorithmPath);

describe("Search Algorithm", () => {
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

  it("should find pages containing a single keyword", () => {
    const results = search(index, "cats");
    expect(results).toContain("https://www.example.com/cats");
    expect(results).toContain("https://www.example.com/cats-and-dogs");
    expect(results.length).toBe(2);
  });

  it("should find pages containing multiple keywords", () => {
    const results = search(index, "dogs training", { matchAllKeywords: true }); // Use the option
    expect(results).toContain("https://www.example.com/dogs");
    expect(results.length).toBe(1);
  });

  it("should perform case-insensitive search", () => {
    const results = search(index, "CaTs");
    expect(results).toContain("https://www.example.com/cats");
    expect(results).toContain("https://www.example.com/cats-and-dogs");
    expect(results.length).toBe(2);
  });

  it("should return an empty array for no matching keywords", () => {
    const results = search(index, "birds");
    expect(results).toEqual([]);
  });

  it("should find pages with partial keyword matches", () => {
    const results = search(index, "train");
    expect(results).toContain("https://www.example.com/dogs");
    expect(results.length).toBe(1);
  });

  it("should handle duplicate URLS from multiple keywords and return unique results", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This page is about dogs and cats"
    );
    const results = search(index, "dogs cats"); // Default is OR
    expect(results).toContain("https://www.example.com");
    expect(new Set(results).size).toBe(results.length);
  });
});
