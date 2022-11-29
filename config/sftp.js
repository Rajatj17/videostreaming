require('dotenv/config');

module.exports = {
    host: process.env.SFTP_HOST,
    username: process.env.SFTP_USERNAME,
    sftpPrivateKeyLocation: process.env.SFTP_PRIVATE_KEY_LOCATION
}