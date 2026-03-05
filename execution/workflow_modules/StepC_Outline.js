/**
 * Step C: Outlining Module
 * The "Architect" phase. Reads Strategy Brief -> Creates Outline.
 */
function runStepC(folderId, briefUrl) {
  // 1. Initialize Clients
  const gemini = new GeminiClient(PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY'));

  // 2. Read the Strategy Brief
  const briefDoc = DocumentApp.openByUrl(briefUrl);
  const briefText = briefDoc.getBody().getText();

  // 3. Generate Outline via Gemini
  const prompt = `
  You are a Senior Content Editor and Strategic Architect. 
  Based on the following Strategic Intelligence Brief, create a comprehensive Content Outline.
  
  STRATEGY BRIEF:
  ${briefText.substring(0, 10000)}
  
  REQUIREMENTS:
  - Create a compelling H1 title focused on the "Differentiator" angle.
  - Structure with H2s and H3s that address the "Customer Pain Points" identified.
  - Under each header, add bullet points for what specific information to cover, ensuring we hit the "LSI Keywords" mentioned.
  - Ensure the flow is logical and builds "Trust" (E-E-A-T).
  - Include a "Key Takeaways" or "Next Steps" section.
  
  Output formatted Markdown or plain text structure.
  `;

  const outlineContent = gemini.generate(prompt, "You are an expert editor and strategist.", { maxTokens: 4096 });

  // 4. Save to Drive
  const folder = DriveApp.getFolderById(folderId);
  const topic = briefDoc.getName().replace("01_Strategy_Brief - ", "");

  const doc = DocumentApp.create(`02_Outline - ${topic}`);
  const body = doc.getBody();

  body.setText("CONTENT OUTLINE - STRATEGIC PLAN\n\n");
  body.appendParagraph(outlineContent);

  // Add instructions for user
  body.appendHorizontalRule();
  body.appendParagraph("INSTRUCTIONS: Review and edit this outline. The Drafter (Step D) will follow this structure and strategy exactly.");

  // Move file
  const file = DriveApp.getFileById(doc.getId());
  file.moveTo(folder);

  return doc.getUrl();
}
