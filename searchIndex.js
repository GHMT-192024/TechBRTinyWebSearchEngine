function createIndex() {
  return {}; // Using an object as the index
}

function addPageToIndex(index, url, pageContent) {
  const keywords = pageContent.toLowerCase().split(" ");
  keywords.forEach((keyword) => {
    if (!index[keyword]) {
      index[keyword] = new Set();
    }
    index[keyword].add(url);
  });
}

function updatePageInIndex(index, url, pageContent) {
  for (const keyword in index) {
    index[keyword].delete(url);
  }

  addPageToIndex(index, url, pageContent);
}

function removePageFromIndex(index, url) {
  if (!index || !url) {
    return; // Corrected: return is now inside the if block
  }

  for (const keyword in index) {
    if (index.hasOwnProperty(keyword)) {
      if (index[keyword] && index[keyword].delete) {
        index[keyword].delete(url);

        if (index[keyword].size === 0) {
          delete index[keyword];
        }
      }
    }
  }
}

function getPagesForKeyword(index, keyword) {
  return index[keyword];
}

module.exports = {
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
};
