const app = require('electron').app;
const Window = require('electron').BrowserWindow; // jshint ignore:line
const Tray = require('electron').Tray; // jshint ignore:line
const Menu = require('electron').Menu; // jshint ignore:line
const fs = require('fs');

const server = require('./index');

let mainWindow = null;

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });

app.on('ready', function () { 
    const path = require('path');

    mainWindow = new Window({
        width: 1280,
        height: 1024,
        autoHideMenuBar: true, 
        useContentSize: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        },
    });
    mainWindow.loadURL('http://localhost:8081/');
    mainWindow.focus();

});

// shut down all parts to app after windows all closed.
app.on('window-all-closed', function () {
    app.quit();
});