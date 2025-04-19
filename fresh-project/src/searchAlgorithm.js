function search(index, query) {
  console.log("Index:", index);
  console.log("Query:", query);
  const results = [];
  const keywords = query.toLowerCase().split(" ");

  for (const url in index) {
    if (index.hasOwnProperty(url)) {
      const content = index[url].content.toLowerCase();
      let allKeywordsFound = true;
      for (const keyword of keywords) {
        if (!content.includes(keyword)) {
          allKeywordsFound = false;
          break;
        }
      }
      if (allKeywordsFound) {
        results.push(url);
      }
    }
  }
  console.log("Search Results:", results);
  return results;
}

module.exports = { search };
