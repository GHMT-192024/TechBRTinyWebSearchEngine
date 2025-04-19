// src/searchIndex.js
function createIndex() {
  return {}; // Or your initial index structure (e.g., a Map)
}

function addPageToIndex(index, url, content) {
  if (!index[url]) {
    index[url] = { content: "" };
  }
  index[url].content += " " + content.toLowerCase();
}

function getPagesForKeyword(index, keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();
  for (const url in index) {
    if (
      index.hasOwnProperty(url) &&
      index[url].content.includes(lowerKeyword)
    ) {
      results.push(url);
    }
  }
  return results;
}

module.exports = { createIndex, addPageToIndex, getPagesForKeyword };
