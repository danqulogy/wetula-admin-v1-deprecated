const electron = require('electron');
const autoUpdater = require("electron-updater").autoUpdater;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var http = require("http");
var fs = require('fs');
var port = process.argv[2] || 8888;
var express = require('express');

var serverApp = express();



const path = require('path');
const url = require('url');
const ngrok = require('ngrok');


const log = require('electron-log');
log.transports.file.level = 'info';
autoUpdater.logger = log;


let broadcastUrl;
let mainWindow;

const ROOT = path.join(path.resolve(__dirname, '..','build'));

serverApp.set('views', path.join(__dirname,'..','build'));
serverApp.set('view engine', 'html');
serverApp.use(express.static(ROOT,{index: false}));

serverApp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'..','build','index.html'));
});

serverApp.listen(4300, function () {
  console.log("server running at localhost:4300");
});


function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    acceptFirstMouse: true,
    center: true,
    title: "Metrostore - Modern inventory management",
    fullscreenWindowTitle:false,
    backgroundColor: "#111F2F",
    hasShadow: true,
    darkTheme: true,
    thickFrame:true,
    fullscreenable:true,
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      zoomFactor: 1.0,
      images:true
    }
  });

  // and load the index.html of the app.
    loadEntryURL(true);

    // initUpdater();
    // autoUpdater.checkForUpdates();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

async function loadEntryURL(isDev){
  if(isDev){
    mainWindow.loadURL('http://localhost:4200');
    broadcastUrl = await ngrok.connect({
      proto: "http",
      addr: 4200,
      host_header: "rewrite"
    });
    console.info("Broadcast Url: " + broadcastUrl.toString());
  }else{
    // createSandboxedServer();
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname,'..','build', 'index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));
    mainWindow.loadURL("http://localhost:4300");
    broadcastUrl = await ngrok.connect({
      proto: "http",
      addr: 4300,
      host_header: "rewrite"
    }).then(function (results) {
      console.info("Broadcast Url: " + broadcastUrl.toString());
    }).catch(function (reason) {
      console.info(reason);
    });

  }

}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
    // autoUpdater.checkForUpdates();
  }
});



