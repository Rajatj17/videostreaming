const fs = require('fs');
const { promisify } = require('util');

const { Sftp } = require('../libraries');
const { createFolderStructure, checkIfFileAndCurrentMinCollide } = require('../utils/misc');

module.exports = class TransferStreams {
    Init() {
        this.TransferFiles();
    }

    async TransferFiles() {
        const sftpInst = new Sftp();
        const files = await this.GetFilesInDir({});
        console.log(files);

        let i = 0;
        for (const file of files) {
            const numberOfCameras = process.env.CAMERA_NO || 2;
            if (i >= files.length - numberOfCameras) continue;

            const { folderStructure, fileName } = createFolderStructure(file);
            checkIfFileAndCurrentMinCollide(file);
            await sftpInst.CreateDirectoryIfDoesNotExist({ directoryPath: folderStructure });
            await sftpInst.TransferFile({ localFile: `src/storage/${file}`, remoteFile: `/home/ec2-user/${folderStructure}/${fileName}` })
                        
            this.DeleteFile({ path: `src/storage/${file}` });

            console.log('Transfered file', file);
            i++;
        }

        console.log(`Completed 1 round of transfer by ${(new Date()).toUTCString()}`);
    }

    async GetFilesInDir({  path = 'src/storage' }) {
        const readDirPromisified = promisify(fs.readdir);
        const files = await readDirPromisified(path);

        return files;
    }

    async DeleteFile({ path }) {
        const unlinkFilePromisified = promisify(fs.unlink);
        await unlinkFilePromisified(path);

        return false;
    }

    async CheckIfFileIsAlreadyOpen({ path }) {
        const openFilePromisified = promisify(fs.open);
        try {
            const file = await openFilePromisified(path, 'r+');
            console.log(file);
        } catch (error) {
            console.log('Error', error);
        }
    }
}