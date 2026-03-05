/**
 * Step A: Project Initialization
 * Creates the Drive Folder and Input Card.
 */
function createProject(clientName, topic, location) {
    // 1. Get Root Folder (ideally defined in Properties, fallback to Root)
    let rootFolder;
    try {
        const rootId = PropertiesService.getScriptProperties().getProperty('ROOT_FOLDER_ID');
        rootFolder = rootId ? DriveApp.getFolderById(rootId) : DriveApp.getRootFolder();
    } catch (e) {
        rootFolder = DriveApp.getRootFolder();
    }

    // 2. Create Client Folder (if needed)
    const clientIter = rootFolder.getFoldersByName(clientName);
    let clientFolder;
    if (clientIter.hasNext()) {
        clientFolder = clientIter.next();
    } else {
        clientFolder = rootFolder.createFolder(clientName);
    }

    // 3. Create Project Folder
    const folderName = `${topic} - ${location}`;
    const projectFolder = clientFolder.createFolder(folderName);

    // 4. Create Topic Card (Input)
    const doc = DocumentApp.create(`00_Topic_Card`);
    const body = doc.getBody();
    body.setText(`TOPIC: ${topic}\nLOCATION: ${location}\n\nKey Requirements:\n- [Adjective 1]\n- [Adjective 2]\n\nNotes:\n[Enter specific notes here]`);

    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(projectFolder);

    return {
        folderId: projectFolder.getId(),
        folderUrl: projectFolder.getUrl(),
        cardUrl: doc.getUrl()
    };
}
