/**
 * Serper.dev API Client for Google Apps Script
 * Handles localized SEO reconnaissance.
 */
class SerperClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://google.serper.dev/search';
  }

  /**
   * Performs a localized search.
   * @param {string} query The search query.
   * @param {string} location The location (e.g., "Marysville, MI").
   * @returns {Object} The parsed JSON response.
   */
  search(query, location = 'United States') {
    const payload = JSON.stringify({
      q: query,
      location: location,
      gl: 'us',
      hl: 'en'
    });

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'X-API-KEY': this.apiKey
      },
      payload: payload,
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(this.baseUrl, options);
    const content = response.getContentText();
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`Serper API Error: ${content}`);
    }

    return JSON.parse(content);
  }

  /**
   * Extracts competitor titles and snippets from search results.
   */
  extractOrganic(results) {
    return (results.organic || []).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
    }));
  }

  /**
   * Extracts "People Also Ask" questions.
   */
  extractPAA(results) {
    return (results.peopleAlsoAsk || []).map(item => item.question);
  }
}
