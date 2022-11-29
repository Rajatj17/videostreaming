/**
 * 
 * This functions creates a folder structure to
 * be used at the remote location. This function
 * assumes file is always in the format
 * YYYY-MM-DD-HH-MM-AssetName-TimeStamp.mp4
 * @param {*} file 
 */
const createFolderStructure = (file) => {
    const splittedString = file.split('-');

    if (splittedString.length < 7) return;

    const zone = splittedString[0];
    const assetName = splittedString[1];
    const year = splittedString[2];
    const month = splittedString[3];
    const day = splittedString[4];
    const hour = splittedString[5];
    const minute = splittedString[6];
    const second = splittedString[7];
    const timestamp = splittedString[8];

    return {
        folderStructure: `${zone}/${assetName}/${year}/${month}/${day}/${hour}/${minute}/${second}`,
        fileName: `${assetName}-${timestamp}`
    }
};

const checkIfFileAndCurrentMinCollide = (file) => {
    const splittedString = file.split('-');

    if (splittedString.length < 7) return;

    const fileYear = splittedString[0];
    const fileMonth = splittedString[1];
    const fileDay = splittedString[2];
    const fileHour = splittedString[3];
    const fileMinute = splittedString[4];
    const currDate = new Date();
}

module.exports = {
    createFolderStructure,
    checkIfFileAndCurrentMinCollide
}