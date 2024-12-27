const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const SerialPort = require('serialport'); // For serial communication

let mainWindow;

// Create the window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for security
      preload: path.join(__dirname, 'preload.js'), // Path to preload.js
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')); // Load the HTML file

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

// Quit app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle request for serial ports from renderer
ipcMain.handle('get-serial-ports', async () => {
  try {
    const ports = await SerialPort.list(); // Get the list of serial ports
    return ports.map(port => port.path); // Return the paths of the serial ports
  } catch (error) {
    console.error('Failed to list serial ports:', error);
    return []; // Return an empty array if there's an error
  }
});
