/**
 * Step B: Strategic Intelligence Module
 * Generates a Content Strategy Brief using AI-driven intent analysis.
 * Replaces expensive web scraping with deep behavioral simulation.
 */
function runStepB(folderId, topic, location) {
    // 1. Initialize Gemini Client
    const gemini = new GeminiClient(PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY'));

    // 2. Intelligence Prompt (Simulated User Intent & Psychology)
    // Focused on: Gap analysis, Pain Points, and Keyword Alignment.
    const intelPrompt = `You are a high-level Content Strategist and SEO Expert.
  Your task is to generate a Strategic Intelligence Brief for the topic: "${topic}" in "${location}".
  
  Do NOT perform external searches. Use your deep knowledge of human behavior, search intent, and the trade service industry.
  
  Structure the brief into these 4 sections:
  
  1. USER INTENT ANALYSIS:
     - What is the user's primary "Search Goal"? (e.g., Solving an emergency vs. researching long-term costs).
     - What is their "Anxiety Level"? (e.g., Fear of being overcharged, fear of property damage).
  
  2. CUSTOMER PAIN POINTS & PSYCHOLOGY:
     - List 5 specific questions this user has that they are UNLIKELY to find clear answers for on generic competitor sites.
     - What are the "Invisible Objections"? (The things they think but don't say).
  
  3. SEARCH ALIGNMENT & KEYWORDS:
     - Primary Keyword focus.
     - 5-7 LSI (Semantically Related) terms that MUST be included to demonstrate authority.
     - Recommended Content Type (e.g., Detailed Guide, "How-To" with local emphasis).
  
  4. THE "DIFFERENTIATOR" ANGLE:
     - How should this piece stand out from common "low-hanging fruit" content?
     - Suggest one high-value "Lead Magnet" or CTA specific to this topic.
  
  Tone: Professional, Actionable, Strategic.`;

    // 3. Generate Brief
    const briefContent = gemini.generate(intelPrompt, "You are a senior content strategist specialized in semantic SEO and consumer psychology.", { maxTokens: 4096 });

    // 4. Save to Drive
    const folder = DriveApp.getFolderById(folderId);
    const doc = DocumentApp.create(`01_Strategy_Brief - ${topic}`);
    const body = doc.getBody();
    body.setText(briefContent);

    // Metadata Footer
    body.appendParagraph("\n\n---");
    body.appendParagraph(`Generated via Anti-Gravity Semantic Engine (No External API used)`);
    body.appendParagraph(`Date: ${new Date().toLocaleDateString()}`);

    // Move file to project folder
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);

    return doc.getUrl();
}
