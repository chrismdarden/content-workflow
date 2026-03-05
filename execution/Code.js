/**
 * Anti-Gravity Content Pipeline: Master Orchestrator (Code.js)
 * Architecture: Logic (workflow_modules) <-> Orchestrator (Code.js) <-> Frontend (Index.html / Sheet)
 */

// --- Web App Entrance ---
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Anti-Gravity Intelligence Pipeline')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- API LAYER (Called by Frontend) ---

/**
 * api_runStrategy: Step B (Strategic Intelligence)
 * Replaces old keyword research with deep intent analysis.
 */
function api_runStrategy(topic, location, folderId) {
  try {
    // 1. Process Strategy (formerly Research)
    const strategyUrl = runStepB(folderId, topic, location);

    return {
      success: true,
      strategyUrl: strategyUrl,
      topic: topic
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * api_generateOutline: Step C (Structural Architect)
 */
function api_generateOutline(folderId, strategyUrl) {
  try {
    const outlineUrl = runStepC(folderId, strategyUrl);
    const outlineDoc = DocumentApp.openByUrl(outlineUrl);
    const outlineText = outlineDoc.getBody().getText();

    return {
      success: true,
      outlineUrl: outlineUrl,
      outlineText: outlineText
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * api_runDrafting: Step D (CoVe Drafting)
 */
function api_runDrafting(folderId, outlineUrl, brandingText = "") {
  try {
    // 1. Run the CoVe Drafting process
    const draftUrl = runStepD(folderId, outlineUrl, brandingText);

    return {
      success: true,
      draftUrl: draftUrl
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * api_getBranding: Fetches branding data from the folder (Topic Card or generic doc)
 */
function api_getBranding(folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFilesByName("00_Topic_Card");
    let branding = "";
    if (files.hasNext()) {
      branding = DocumentApp.openById(files.next().getId()).getBody().getText();
    }
    return { success: true, branding: branding };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// --- INITIALIZATION ---
function setup_System() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('GEMINI_API_KEY')) {
    props.setProperty('GEMINI_API_KEY', 'PASTE_KEY_HERE');
  }
  console.log("System properties initialized.");
}

