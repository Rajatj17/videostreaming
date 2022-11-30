require('dotenv/config');

module.exports = {
    app: {
        remoteFileTransaferPath: process.env.REMOTE_FILE_TRANSFER_PATH
    },
    sftpConfig: {
        host: process.env.SFTP_HOST,
        username: process.env.SFTP_USERNAME,
        sftpPrivateKeyLocation: process.env.SFTP_PRIVATE_KEY_LOCATION
    }
}