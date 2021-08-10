const {
  app,
  BrowserWindow,
  nativeImage,
  dialog,
  ipcMain,
} = require("electron");
const path = require("path");

const { setLocation } = require(path.join(
  __dirname,
  "api",
  "src",
  "utils",
  "getLocation.js"
));

// esta é a linha que faz toda a diferença!
const express = require("./api/src/app.js");
let win;

function createWindow() {
  // Adicionando um ícone na barra de tarefas/dock
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);
  if (app.dock) {
    app.dock.setIcon(icon);
  }

  console.log(express);
  win = new BrowserWindow({
    icon,
    width: 1366,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  // win.webContents.openDevTools()
  win.loadURL("http://localhost:3001/");

  win.focus();
}

app.whenReady().then(createWindow);

// Neste arquivo, você pode incluir o resto do processo principal específico do seu aplicativo
// código. Você também pode colocá-los em arquivos separados e solicitá-los aqui.
ipcMain.on("select-dirs", async (event, arg) => {
  const result = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  // locations(result.filePaths)
  setLocation(result.filePaths);
  console.log("directories selected", result.filePaths);
});

module.exports = win;
