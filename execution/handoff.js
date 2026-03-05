/**
 * Handoff Utilities
 * Packages and exports finalized content.
 */
const HandoffUtils = {
  /**
   * Creates a Google Doc with the finalized content and applies basic formatting.
   * @param {string} title The document title.
   * @param {string} content The markdown or plain text content.
   * @param {string} folderId The target folder ID.
   */
  exportToDoc(title, content, folderId) {
    const doc = DocumentApp.create(title);
    const body = doc.getBody();
    
    // Simplistic markdown-to-doc conversion (can be expanded)
    body.setText(content);
    
    const file = DriveApp.getFileById(doc.getId());
    const folder = DriveApp.getFolderById(folderId);
    file.moveTo(folder);
    
    return doc.getUrl();
  }
};
