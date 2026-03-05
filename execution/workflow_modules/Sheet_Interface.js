/**
 * Sheet Interface Module
 * Connects the Google Sheet UI to the Content Pipeline Logic.
 */

const SHEET_NAME = "Content_Pipeline_v1";
const HEADERS = [
    "Status", "Client", "Topic", "Location",
    "Folder URL", "Research Brief", "Outline", "Draft Doc",
    "Notes", "Last Updated"
];

/**
 * runSetup: Scaffolds the spreadsheet with columns, validation, and formatting.
 * User runs this once from the menu.
 */
function setupSpreadsheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
    }

    sheet.activate();

    // 1. Set Headers
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f3f3f3");
    sheet.setFrozenRows(1);

    // 2. Data Validation for Status
    const statusRange = sheet.getRange(2, 1, 999, 1);
    const rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(["Pending", "Project Created", "Researching", "Brief Ready", "Outlining", "Drafting", "Done"], true)
        .setAllowInvalid(false)
        .build();
    statusRange.setDataValidation(rule);

    // 3. Column Widths
    sheet.setColumnWidth(1, 120); // Status
    sheet.setColumnWidth(2, 150); // Client
    sheet.setColumnWidth(3, 250); // Topic
    sheet.setColumnWidth(4, 150); // Location

    SpreadsheetApp.getUi().alert("Spreadsheet Staged Successfully!");
}

/**
 * Menu Action: Step A - Create Project (Folder + Card)
 */
function menu_StepA_Init() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveCell().getRow();

    if (row === 1) return; // Skip header

    // Read Data
    const client = sheet.getRange(row, 2).getValue();
    const topic = sheet.getRange(row, 3).getValue();
    const location = sheet.getRange(row, 4).getValue();

    if (!client || !topic) {
        SpreadsheetApp.getUi().alert("Error: Please fill in Client and Topic.");
        return;
    }

    // Update Status
    sheet.getRange(row, 1).setValue("Initializing...");
    SpreadsheetApp.flush();

    try {
        // Call the core logic (StepA_Init.js)
        const result = createProject(client, topic, location);

        // Write Results Back to Sheet
        sheet.getRange(row, 5).setValue(result.folderUrl); // Folder URL
        sheet.getRange(row, 1).setValue("Project Created");
        sheet.getRange(row, 10).setValue(new Date());      // Last Updated

        // Store Folder ID in a hidden note or property (Simplest: Extract from URL or Store in Hidden Col)
        // For V1, we'll store the ID in the Cell Note of the "Folder URL" cell
        sheet.getRange(row, 5).setNote(`ID:${result.folderId}`);

    } catch (e) {
        sheet.getRange(row, 1).setValue("Error");
        SpreadsheetApp.getUi().alert(`Error: ${e.message}`);
    }
}

/**
 * Menu Action: Step B - Fan-Out Research
 */
function menu_StepB_Research() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveCell().getRow();
    if (row === 1) return;

    const topic = sheet.getRange(row, 3).getValue();
    const location = sheet.getRange(row, 4).getValue();
    const folderCell = sheet.getRange(row, 5);

    // Retrieve Folder ID from Cell Note (saved in Step A)
    const note = folderCell.getNote();
    const folderId = note.split("ID:")[1];

    if (!folderId) {
        SpreadsheetApp.getUi().alert("Error: Folder not found. Run Step A first.");
        return;
    }

    sheet.getRange(row, 1).setValue("Researching...");
    SpreadsheetApp.flush();

    try {
        // Call Core Logic (StepB_FanOut.js)
        const docUrl = runStepB(folderId, topic, location);

        sheet.getRange(row, 6).setValue(docUrl); // Research Brief Column
        sheet.getRange(row, 1).setValue("Brief Ready");
        sheet.getRange(row, 10).setValue(new Date());

    } catch (e) {
        sheet.getRange(row, 1).setValue("Error");
        SpreadsheetApp.getUi().alert(`Error: ${e.message}`);
    }
}


/**
 * Menu Action: Step C - Generate Outline
 */
function menu_StepC_Outline() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveCell().getRow();
    if (row === 1) return;

    const folderCell = sheet.getRange(row, 5);
    const briefUrl = sheet.getRange(row, 6).getValue();

    // Retrieve Folder ID
    const note = folderCell.getNote();
    const folderId = note.split("ID:")[1];

    if (!folderId || !briefUrl) {
        SpreadsheetApp.getUi().alert("Error: Missing Folder ID or Research Brief. Run Step B first.");
        return;
    }

    sheet.getRange(row, 1).setValue("Outlining...");
    SpreadsheetApp.flush();

    try {
        const docUrl = runStepC(folderId, briefUrl);

        sheet.getRange(row, 7).setValue(docUrl); // Outline Column
        sheet.getRange(row, 1).setValue("Outline Ready");
        sheet.getRange(row, 10).setValue(new Date());

    } catch (e) {
        sheet.getRange(row, 1).setValue("Error");
        SpreadsheetApp.getUi().alert(`Error: ${e.message}`);
    }
}

/**
 * Menu Action: Step D - Draft Content
 */
function menu_StepD_Draft() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveCell().getRow();
    if (row === 1) return;

    const folderCell = sheet.getRange(row, 5);
    const outlineUrl = sheet.getRange(row, 7).getValue();

    // Retrieve Folder ID
    const note = folderCell.getNote();
    const folderId = note.split("ID:")[1];

    if (!folderId || !outlineUrl) {
        SpreadsheetApp.getUi().alert("Error: Missing Folder ID or Outline. Run Step C first.");
        return;
    }

    sheet.getRange(row, 1).setValue("Drafting...");
    SpreadsheetApp.flush();

    try {
        const docUrl = runStepD(folderId, outlineUrl);

        sheet.getRange(row, 8).setValue(docUrl); // Draft Column
        sheet.getRange(row, 1).setValue("Draft Ready");
        sheet.getRange(row, 10).setValue(new Date());

    } catch (e) {
        sheet.getRange(row, 1).setValue("Error");
        SpreadsheetApp.getUi().alert(`Error: ${e.message}`);
    }
}

/**
 * onOpen: Adds the Custom Menu to the Sheet
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('🚀 Content Pipeline')
        .addItem('1. Setup Spreadsheet', 'setupSpreadsheet')
        .addSeparator()
        .addItem('2. Run Step A (Init Project)', 'menu_StepA_Init')
        .addItem('3. Run Step B (Research)', 'menu_StepB_Research')
        .addItem('4. Run Step C (Outline)', 'menu_StepC_Outline')
        .addItem('5. Run Step D (Draft)', 'menu_StepD_Draft')
        .addToUi();
}
