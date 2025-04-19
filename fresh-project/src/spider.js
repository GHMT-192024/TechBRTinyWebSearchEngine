// src/spider.js
async function crawl(url, index) { // Expecting 'index' as the second argument
  try {
    // ... your crawling logic ...
    const content = /* extracted page content */;
    index.addPageToIndex(url, content); // Using the passed 'index' object
    // ... more crawling logic ...
  } catch (error) {
    console.error(`Error crawling ${url}:`, error.message);
  }
}

module.exports = { crawl };
