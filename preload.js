const { contextBridge, ipcRenderer } = require('electron');

// Expose the functionality to the renderer (UI)
contextBridge.exposeInMainWorld('electron', {
  // Function to get the serial ports
  getSerialPorts: () => ipcRenderer.invoke('get-serial-ports'),

  // Function to connect to Arduino
  connectToArduino: (port) => ipcRenderer.send('connect-to-arduino', port),

  // Function to run Python code
  runPythonCode: (pythonCode) => ipcRenderer.send('run-python-code', pythonCode),
});
