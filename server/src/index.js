const express = require('express');
const mySql = require('mysql2');
require('./app/components/shared/models');
const bodyParser = require('body-parser');

const routing = require('./app/routes');
const config = require('./config/app');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', routing());

const appPort = config.appPort;

const connection = mySql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
});
connection.connect(function (err) {
    if (err) {
        console.log(`Error connecting to ${config.host}`, err)
    } else {
        connection.query("CREATE DATABASE if not exists userManagement", function (err, result) {
            if (err) {
                console.log(`Error creating database userManagement`, err)
            } else {
                console.log("Database created");
                app.listen(appPort, () => console.log(`Listen on port: ${appPort}`));
            }
        });
    }
});