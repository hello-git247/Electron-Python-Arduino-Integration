const serialPortSelect = document.getElementById('serialPortSelect');

// Ensure elements are loaded before adding event listeners
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const ports = await window.electron.getSerialPorts(); // Use the exposed API from preload.js

        if (ports && ports.length > 0) {
            ports.forEach((port) => {
                const option = document.createElement('option');
                option.value = port;
                option.innerText = port;
                serialPortSelect.appendChild(option);
            });
        } else {
            alert('No serial ports found!');
        }
    } catch (error) {
        console.error('Error fetching serial ports:', error);
    }

    // Add event listener to connect button
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const selectedPort = serialPortSelect.value;
            if (selectedPort) {
                window.electron.connectToArduino(selectedPort); // Use the exposed function in preload.js
            } else {
                alert('Please select a serial port.');
            }
        });
    } else {
        console.error('Connect button not found!');
    }

    // Add event listener for running the Python code
    const runCodeBtn = document.getElementById('runCodeBtn');
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', () => {
            const pythonCode = document.getElementById('pythonCode').value;
            window.electron.runPythonCode(pythonCode); // Use the exposed function in preload.js
        });
    } else {
        console.error('Run code button not found!');
    }
});
