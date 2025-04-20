const path = require("path");
const { myFunction } = require(path.resolve(__dirname, "../src/myModule.js"));

describe("myFunction", () => {
  it('should return the string "Hello"', () => {
    const result = myFunction();
    expect(result).toBe("Hello");
  });
});
