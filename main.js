const {app, BrowserWindow, protocol} = require('electron')
const path = require('path')
const fs = require('fs')

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'img-stream',
    privileges: {
      supportFetchAPI: true,
      secure: true,
    },
  }
]);

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
  let createdStream = 0;
  let closedStream = 0;
  protocol.registerStreamProtocol('img-stream', (request, callback) => {
    createdStream++;
    const stream = fs.createReadStream('c:/bigfile.gif')
      .on('close', () => {
        console.log('[stream]')
        console.log('created:', createdStream)
        console.log('closed:', closedStream)
        console.log('not closed:', createdStream - ++closedStream);
      });
    callback(stream);
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
