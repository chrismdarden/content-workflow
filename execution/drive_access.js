/**
 * Drive Access Utilities
 * Fetches guidelines and historical work from specific folders.
 */
const DriveUtils = {
  /**
   * Fetches the content of all relevant text files in a folder.
   * @param {string} folderId The Google Drive folder ID.
   * @returns {string} The aggregated content of files.
   */
  fetchFolderContext(folderId) {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    let context = '';

    while (files.hasNext()) {
      const file = files.next();
      const mime = file.getMimeType();

      // Only process Google Docs, Text, or PDF (simplistic handling)
      if (mime === MimeType.GOOGLE_DOCS || mime === MimeType.PLAIN_TEXT) {
        context += `\n--- FILE: ${file.getName()} ---\n`;
        context += this.getFileContent(file);
      }
    }

    return context;
  },

  /**
   * Extracts text content from a file.
   */
  getFileContent(file) {
    const mime = file.getMimeType();
    if (mime === MimeType.GOOGLE_DOCS) {
      return DocumentApp.openById(file.getId()).getBody().getText();
    } else {
      return file.getBlob().getDataAsString();
    }
  }
};
