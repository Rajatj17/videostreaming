const http = require('http');

const app = require('./src/app');

const { getEnvAsInteger } = require('./src/utils/env-utilities');

server = http.createServer(app);

const port = getEnvAsInteger('PORT', '8000');

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});     