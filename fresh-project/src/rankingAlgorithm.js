// In your src/rankingAlgorithm.js
function rankSearchResults(index, query, searchResults) {
  console.log("Index:", index);
  console.log("Query:", query);
  console.log("SearchResults:", searchResults);

  const scores = {};
  const keywords = query.toLowerCase().split(" ");

  for (const url of searchResults) {
    const content = index[url] ? index[url].content : ""; // Assuming your index structure
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, "gi");
      const matches = content.match(regex);
      score += matches ? matches.length : 0;
    }
    scores[url] = score;
    console.log(`Score for ${url}:`, score);
  }

  const rankedResults = searchResults.sort((a, b) => scores[b] - scores[a]);
  console.log("Ranked Results:", rankedResults);
  return rankedResults;
}

module.exports = { rankSearchResults };
