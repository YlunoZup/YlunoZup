const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,  // Adjust as needed
    height: 600, // Adjust as needed
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Optional, if you need it
    }
  });

  win.loadFile('index.html'); // Load your HTML file
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
