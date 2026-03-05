/**
 * Step D: Drafting Module (CoVe Edition)
 * The "Writer" phase. Uses Chain of Verification to ensure E-E-A-T and factual accuracy.
 */
function runStepD(folderId, outlineUrl, brandingText = "") {
  const gemini = new GeminiClient(PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY'), 'gemini-1.5-pro'); // Pro for CoVe precision

  // 1. Read the Outline
  const outlineDoc = DocumentApp.openByUrl(outlineUrl);
  const outlineText = outlineDoc.getBody().getText();

  // 2. CoVe Step 1: Generate Baseline Draft
  const baselinePrompt = `
  You are an Expert Content Writer. 
  Task: Write a comprehensive baseline article based on the provided Outline and Branding Guidelines.
  
  OUTLINE:
  ${outlineText}
  
  BRANDING & VOICE:
  ${brandingText || "Professional, authoritative, and helpful."}
  
  Requirements:
  - Follow the H2/H3 structure exactly.
  - Infuse "Experience" (E-E-A-T) by using first-person insights where appropriate.
  - High quality, no fluff.
  `;
  const baselineDraft = gemini.generate(baselinePrompt, "Write the initial draft.");

  // 3. CoVe Step 2: Generate Verification Questions
  // We ask Gemini to audit its own draft for factual claims or weak E-E-A-T points.
  const verificationQuestionsPrompt = `
  Review your initial draft below. 
  Identify 5-7 key factual claims, technical specifications, or "Experience" statements that require verification to ensure 100% accuracy and E-E-A-T compliance.
  
  DRAFT:
  ${baselineDraft.substring(0, 5000)}
  
  Return a list of specific verification questions.
  `;
  const verificationQuestions = gemini.generate(verificationQuestionsPrompt, "You are a fact-checker and editor.");

  // 4. CoVe Step 3: Execute Verification
  // Answer the questions independently of the draft context.
  const verificationAnswersPrompt = `
  Answer the following questions as an objective expert using the highest standards of accuracy.
  If a claim cannot be verified, state "Unverified - Remove or flag."
  
  QUESTIONS:
  ${verificationQuestions}
  `;
  const verificationAnswers = gemini.generate(verificationAnswersPrompt, "You are a subject matter expert.");

  // 5. CoVe Step 4: Final Refined Synthesis
  const finalPrompt = `
  You are a Senior Editor. Create the FINAL DRAFT.
  
  Inputs:
  1. Baseline Draft: [Previously Generated]
  2. Verified Data/Corrections: ${verificationAnswers}
  
  Instructions:
  - Finalize the article incorporating all corrections.
  - Ensure SEO-EEAT standards: clear H1/H2 hierarchy, primary keywords included, and "Voice of Experience" is strong.
  - If any claim was "Unverified," remove it or rephrase it as a helpful suggestion rather than a fact.
  - Final output must be clean Markdown.
  
  ORIGINAL OUTLINE FOR REFERENCE:
  ${outlineText}
  
  DRAFT TO REFINE:
  ${baselineDraft}
  `;

  const finalDraft = gemini.generate(finalPrompt, "Generate the polished, verified final content.", { maxTokens: 8192 });

  // 6. Save to Drive
  const folder = DriveApp.getFolderById(folderId);
  const topic = outlineDoc.getName().replace("02_Outline - ", "");

  const doc = DocumentApp.create(`03_Final_Draft - ${topic}`);
  const body = doc.getBody();
  body.setText(finalDraft);

  // Save CoVe Logs for Audit (Human-in-the-Loop transparency)
  const logDoc = DocumentApp.create(`LOG_CoVe_Verification - ${topic}`);
  logDoc.getBody().setText(`VERIFICATION QUESTIONS:\n${verificationQuestions}\n\nVERIFIED ANSWERS:\n${verificationAnswers}`);
  DriveApp.getFileById(logDoc.getId()).moveTo(folder);

  // Move final draft
  const file = DriveApp.getFileById(doc.getId());
  file.moveTo(folder);

  return doc.getUrl();
}
