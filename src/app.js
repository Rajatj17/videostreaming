const express = require('express');
const schedule = require('node-schedule');
const app = express();

const ProcessStreams = require('./boot/process-streams');
const TransferStreams = require('./boot/transfer-streams');

app.use(express.urlencoded({ extended: true }));

new ProcessStreams().init();
schedule.scheduleJob('*/2 * * * *', function(){
    console.log(`Starting transfer of streams @ ${(new Date()).toUTCString()}`);
    new TransferStreams().Init();
});

module.exports = app;
