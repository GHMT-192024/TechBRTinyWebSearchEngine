console.log();
const { createIndex } = require("../src/searchIndex.js");

describe("Search Index", () => {
  it("should create an index", () => {
    const index = createIndex();
    expect(index).toBeTruthy();
  });
});
