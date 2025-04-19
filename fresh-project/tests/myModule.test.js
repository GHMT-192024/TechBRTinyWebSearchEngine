const path = require("path");
const myModulePath = path.resolve(__dirname, "../src/myModule.js"); // Go up, then into src
const { myFunction } = require(myModulePath);

describe("My Test", () => {
  it("should run", () => {
    expect(myFunction()).toBe("Hello");
  });
});
