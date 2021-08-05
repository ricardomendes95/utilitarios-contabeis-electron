const { app, BrowserWindow, nativeImage } = require("electron");

// esta é a linha que faz toda a diferença!
const express = require("./api/src/app.js");

function createWindow() {
  // Adicionando um ícone na barra de tarefas/dock
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);
  if (app.dock) {
    app.dock.setIcon(icon);
  }

  console.log(express);
  let win = new BrowserWindow({
    icon,
    width: 1366,
    height: 700,
    webPreferences: { nodeIntegration: true },
  });
  // win.webContents.openDevTools()
  win.loadURL("http://localhost:3001/");

  win.focus();
}

app.whenReady().then(createWindow);
