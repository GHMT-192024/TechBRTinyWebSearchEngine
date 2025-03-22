function createIndex() {
  return {};
}

function addPageToIndex(index, url, pageContent) {
  const extractedKeywords = extractKeywords(pageContent);
  const words = pageContent.toLowerCase().split(" ");
  const allKeywords = new Set([...extractedKeywords, ...words]);

  allKeywords.forEach((keyword) => {
    if (!index[keyword]) {
      index[keyword] = new Set();
    }
    index[keyword].add(url);
  });
}

function updatePageInIndex(index, url, pageContent) {
  removePageFromIndex(index, url);
  addPageToIndex(index, url, pageContent);
}

function removePageFromIndex(index, url) {
  for (const keyword in index) {
    if (index[keyword].has(url)) {
      index[keyword].delete(url);
      if (index[keyword].size === 0) {
        delete index[keyword];
      }
    }
  }
}

function getPagesForKeyword(index, keyword) {
  return index[keyword];
}

function extractKeywords(pageContent) {
  let words = pageContent.toLowerCase().split(/[^a-z0-9]+/);
  const stopWords = ["the", "is", "and", "a", "an", "in", "on", "at", "by"];
  return words.filter((word) => word.length && !stopWords.includes(word));
}

module.exports = {
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
};
