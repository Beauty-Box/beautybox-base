const express = require('express');
const http = require('http');
const app = express();
const crm = require('../crm/webpack/webpack-dev-server.config');
const link = require('../link/webpack/webpack-dev-server.config');
const auth = require('../auth/webpack/webpack-dev-server.config');

const server = http.createServer(app);

app.use('/cabinet', crm);
app.use('/auth', auth);
app.use(link);
server.listen(8080, () => {
    console.log('server start on port 8080');
});
