const electron = require('electron')
const url = require('url')
const path = require('path')
var $ = require( 'jquery' )
const os = require('os')

const https = require('https')
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
https.globalAgent.options.rejectUnauthorized = false

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow;

require("@electron/remote/main").initialize();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.allowRendererProcessReuse = true;



//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
process.env["NODE_EXTRA_CA_CERTS"] = './kernel/llaves/cert.pem'

const mainMenuWindow = [
    {
        label : 'Archivo'
    }
];

 
 // SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {   
    event.preventDefault();
    callback(true);
});

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
   console.log('certificado select-client-certificate');
   event.preventDefault()
   callback(list[0])
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        fullscreen: false,
				width: 1024,
				heigh: 768,
				minWidth: 1024,
				minHeigth: 768,
        titleBarStyle : 'Consola de Control de Desarrollo',
        simpleFullscreen: true,
        fullscreenWindowTitle: true,
        skipTaskbar: true,
				nodeIntegration: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,								
            enableRemoteModule: true,
            webviewTag: true,
        },
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    //const mainMenu = Menu.buildFromTemplate(mainMenuWindow)
    //Menu.setApplicationMenu(mainMenu)
    //mainWindow.webContents.openDevTools();
})

ipcMain.on('maximizarVentana', () => { 
    console.log('Conectando interfaz');
})