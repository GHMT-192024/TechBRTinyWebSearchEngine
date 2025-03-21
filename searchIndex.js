function createIndex() {
  return {
    
  }; // Using an object as the index
}

function addPageToIndex(index, url, pageContent) {
  const extractedKeywords = extractKeywords(pageContent);
  const words = pageContent.toLowerCase().split(" ");
  const allKeywords = new Set([...extractedKeywords, ...words]);

  allKeywords.forEach((keyword) => {
    if (!index[keyword]) {
      index[keyword] = [];
    }
    if (!index[keyword].includes(url)) {
      index[keyword].push(url);
    }
  });
}
function updatePageInIndex(index, url, pageContent) {
  for (const keyword in index) {
    if (index[keyword]) {
      index[keyword] = index[keyword].filter((u) => u !== url);
    }
  }
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

}
  if (!index || !url) {
<<<<<<< HEAD
    return;
  }
  for (const keyword in index) {
    
  }
    if (index.hasOwnProperty(keyword) && index[keyword]) {
      (index[keyword] = index[keyword]), filter((u) => u !== url);
      if (index[keyword].length === 0) {
        delete index[keyword];
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
  // if (keyword in index) {
  //  return index[keyword];
  // } else {
  // return [];
  // }
  for (key in index) {
    console.log(key);
  }
  return index[keyword] || [];
}

function extractKeywords(pageContent) {
  let words = pageContent.toLowerCase().split(/[^a-z0-9]+/);
  const stopWords = ["the", "is", "and", "a", "an", "in", "on", "at", "by"];
  return words.filter((word) => word.length && !stopWords.includes(word));
  return index[keyword];
}

module.exports = {
  createIndex,
  addPageToIndex,
  updatePageInIndex,
  removePageFromIndex,
  getPagesForKeyword,
};
