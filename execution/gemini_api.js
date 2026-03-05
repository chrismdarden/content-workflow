/**
 * Gemini API Client for Google Apps Script
 * Supports Gemini 1.5 Pro and Flash.
 */
class GeminiClient {
  constructor(apiKey, model = 'gemini-1.5-flash') {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  }

  /**
   * Generates content from a prompt.
   * @param {string} prompt The user prompt.
   * @param {string} systemInstruction Optional system instruction.
   * @param {Object} options Configuration options (temperature, topP, etc.)
   */
  generate(prompt, systemInstruction = '', options = {}) {
    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: options.temperature || 0.7,
        topP: options.topP || 0.95,
        topK: options.topK || 64,
        maxOutputTokens: options.maxTokens || 8192,
        responseMimeType: options.jsonMode ? 'application/json' : 'text/plain'
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const fetchOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(this.baseUrl, fetchOptions);
    const content = response.getContentText();
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`Gemini API Error: ${content}`);
    }

    const json = JSON.parse(content);
    return json.candidates[0].content.parts[0].text;
  }
}
