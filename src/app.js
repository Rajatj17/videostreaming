const express = require('express');
const app = express();

const ProcessStreams = require('./boot/process-streams');

app.use(express.urlencoded({ extended: true }));

new ProcessStreams().init();

module.exports = app;
