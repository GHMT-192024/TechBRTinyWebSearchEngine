const path = require("path");
const { createIndex, addPageToIndex } = require("../src/searchIndex.js");
// Construct the absolute path to searchAlgorithm.js
const searchAlgorithmPath = path.resolve(
  __dirname,
  "../src/searchAlgorithm.js"
);
const { search } = require(searchAlgorithmPath);
// const { rankSearchResults } = require("../rankingAlgorithm"); // Not needed in this file

describe("Search Algorithm", () => {
  let index;

  // Initialize a new index before each test
  beforeEach(() => {
    index = createIndex();
    // Populate the index with some sample data
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

  // Test 1: Basic keyword search
  it("should find pages containing a single keyword", () => {
    const results = search(index, "cats");
    expect(results).toContain("https://www.example.com/cats");
    expect(results).toContain("https://www.example.com/cats-and-dogs");
    expect(results.length).toBe(2); // Checks the number of results
  });

  // Test 2: Search with multiple keywords
  it("should find pages containing multiple keywords", () => {
    const results = search(index, "dogs training");
    expect(results).toContain("https://www.example.com/dogs");
    expect(results.length).toBe(1);
  });

  // Test 3: Case-insensitive search
  it("should perform case-insensitive search", () => {
    const results = search(index, "CaTs");
    expect(results).toContain("https://www.example.com/cats");
    expect(results).toContain("https://www.example.com/cats-and-dogs");
    expect(results.length).toBe(2);
  });

  // Test 4: Search with no matching keywords
  it("should return an empty array for no matching keywords", () => {
    const results = search(index, "birds");
    expect(results).toEqual([]);
  });

  // Test 5: Test for partial matches. (Important!)
  it("should find pages with partial keyword matches", () => {
    const results = search(index, "train");
    expect(results).toContain("https://www.example.com/dogs");
    expect(results.length).toBe(1);
  });

  // Test 6: Search with multiple keywords resulting in duplicate URLs
  it("should handle duplicate URLS from multiple keywords and return unique results", () => {
    addPageToIndex(
      index,
      "https://www.example.com",
      "This page is about dogs and cats"
    );
    const results = search(index, "dogs cats");
    expect(results).toContain("https://www.example.com");
    expect(new Set(results).size).toBe(results.length); // Ensure there are no duplicates
  });
});
