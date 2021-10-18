const Client = require('ssh2-sftp-client');
const fs = require('fs');

const { sftpConfig } = require('../../config');

module.exports = class Sftp {
    constructor() {
        this._sftp = null;
    }

    get SftpClient() {
        this._sftp;
    }

    GenerateNewClient() {
        const sftp = new Client();
        this._sftp = sftp;
       
        return sftp;
    }

    async GetConnection({ generateNewClient = true }) {
        let sftp;
        if (generateNewClient) {
            sftp = this.GenerateNewClient();
        } else {
            if (this.SftpClient !== undefined && this.SftpClient !== null) {
                sftp = this.SftpClient;
            } else {
                sftp = this.GenerateNewClient();
            }
        }

        await sftp.connect({
            host: sftpConfig.host,
            username: sftpConfig.username,
            privateKey: fs.readFileSync(sftpConfig.sftpPrivateKeyLocation)
        });

        return sftp;
    }

    async TransferFile({ localFile, remoteFile }) {
        const client = await this.GetConnection({});

        return client.fastPut(localFile, remoteFile);
    }

    async CreateDirectoryIfDoesNotExist({ directoryPath, createRecursiveDir = true }) {
        const client = await this.GetConnection({});

        const doesExist = await this.CheckIfFileExists({ filePath: directoryPath });
        
        if (!doesExist) {
            return client.mkdir(directoryPath, createRecursiveDir)
        }

        return;
    }

    async ChangePermission({ filePath, permissionCode }) {
        const client = await this.GetConnection({});

        return client.chmod(filePath, permissionCode)
    }

    async TransferDirectory({ localDir, remoteDir }) {
        const client = await this.GetConnection({});

        return client.uploadDir(localDir, remoteDir);
    }

    async ListFilesInDirectory({ directoryPath }) {
        const client = await this.GetConnection({});

        return client.list(directoryPath);
    }

    async CheckIfFileExists({ filePath }) {
        const client = await this.GetConnection({});

        return client.exists(filePath);
    }
}