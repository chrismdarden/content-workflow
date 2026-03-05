/**
 * Jina AI Reader Client for Google Apps Script
 * Converts complex URLs into LLM-friendly Markdown.
 */
class JinaClient {
  constructor(apiKey) {
    this.apiKey = apiKey || ''; // Optional for free tier, but good to have
    this.baseUrl = 'https://r.jina.ai/';
  }

  /**
   * Scrapes a URL and returns clean Markdown.
   * @param {string} url The target URL to read.
   * @returns {string} The markdown content.
   */
  read(url) {
    const target = this.baseUrl + url;
    
    const options = {
      method: 'get',
      headers: {
        'X-Retain-Images': 'none', // We only want text
        'X-With-Links-Summary': 'true'
      },
      muteHttpExceptions: true
    };

    if (this.apiKey) {
      options.headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    try {
      const response = UrlFetchApp.fetch(target, options);
      if (response.getResponseCode() !== 200) {
        console.warn(`Jina Read Error (${url}): ${response.getContentText()}`);
        return ""; // Return empty on failure so we don't break the whole loop
      }
      return response.getContentText();
    } catch (e) {
      console.warn(`Jina Network Error (${url}): ${e.message}`);
      return "";
    }
  }

  /**
   * Batch reads a list of URLs (Sequential to avoid rate limits).
   * @param {string[]} urls List of URLs.
   * @returns {Object[]} Array of { url, content }.
   */
  batchRead(urls) {
    return urls.map(url => ({
      url: url,
      content: this.read(url)
    })).filter(item => item.content.length > 500); // Filter out empty or failed reads
  }
}
