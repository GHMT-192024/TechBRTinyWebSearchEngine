const {
  createIndex,
  addPageToIndex,
  getPagesForKeyword,
} = require("../src/searchIndex.js");

describe("Search Index Component", () => {
  let index;

  beforeEach(() => {
    index = createIndex();
  });

  describe("createIndex", () => {
    it("should create an empty index object", () => {
      expect(index).toEqual({});
    });
  });

  describe("addPageToIndex", () => {
    it("should add a page and its content to the index", () => {
      const testUrl = "https://www.example.com";
      const testContent = "This is a test page.";
      addPageToIndex(index, testUrl, testContent);
      expect(index[testUrl]).toBeDefined();
      expect(index[testUrl].content).toBe(testContent.toLowerCase());
    });

    it("should convert content to lowercase before adding to the index", () => {
      const testUrl = "https://www.example.com";
      const testContent = "This IS a Test PAGE.";
      addPageToIndex(index, testUrl, testContent);
      expect(index[testUrl].content).toBe("this is a test page.");
    });

    it("should handle multiple additions to the same URL", () => {
      const testUrl = "https://www.example.com";
      addPageToIndex(index, testUrl, "First part.");
      addPageToIndex(index, testUrl, "Second part.");
      addPageToIndex(index, testUrl, "Third part.");
      const expectedContent = "first part. second part. third part.";
      expect(index[testUrl].content).toBe(expectedContent);
    });

    it("should handle adding content with special characters", () => {
      const testUrl = "https://special.com";
      const testContent = "Content with !@#$%^&*()_+";
      addPageToIndex(index, testUrl, testContent);
      expect(index[testUrl].content).toBe(testContent.toLowerCase());
    });
  });

  describe("getPagesForKeyword", () => {
    beforeEach(() => {
      addPageToIndex(
        index,
        "https://www.example.com/about",
        "This is about cats."
      );
      addPageToIndex(
        index,
        "https://www.example.com/dogs",
        "This is about dogs and training."
      );
      addPageToIndex(
        index,
        "https://www.example.com/cats-and-dogs",
        "This is about both cats and dogs."
      );
      addPageToIndex(
        index,
        "https://www.example.com/unrelated",
        "Totally unrelated content."
      );
    });

    it("should find pages containing a single keyword", () => {
      const results = getPagesForKeyword(index, "cats");
      expect(results).toContain("https://www.example.com/about");
      expect(results).toContain("https://www.example.com/cats-and-dogs");
      expect(results).not.toContain("https://www.example.com/dogs");
      expect(results).not.toContain("https://www.example.com/unrelated");
      expect(results.length).toBe(2);
    });

    it("should perform case-insensitive search", () => {
      const results = getPagesForKeyword(index, "CAts");
      expect(results).toContain("https://www.example.com/about");
      expect(results).toContain("https://www.example.com/cats-and-dogs");
      expect(results.length).toBe(2);
    });

    it("should return an empty array if no pages match the keyword", () => {
      const results = getPagesForKeyword(index, "birds");
      expect(results).toEqual([]);
    });

    it("should find pages where the keyword is part of a word", () => {
      const results = getPagesForKeyword(index, "train");
      expect(results).toContain("https://www.example.com/dogs");
    });
  });
});
