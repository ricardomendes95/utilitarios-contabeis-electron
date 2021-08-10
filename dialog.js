const win = require("./index");
// const electron = require("electron");

const { dialog, BrowserWindow } = require("electron"),
  WIN = new BrowserWindow({ width: 800, height: 600 });

/*
//renderer.js - a renderer process
const {remote} = require('electron'),
dialog = remote.dialog,
WIN = remote.getCurrentWindow();
*/

let options = {
  // See place holder 1 in above image
  title: "Custom title bar",

  // See place holder 2 in above image
  defaultPath: "D:\\electron-app",

  // See place holder 3 in above image
  buttonLabel: "Custom button",

  // See place holder 4 in above image
  filters: [
    { name: "Images", extensions: ["jpg", "png", "gif"] },
    { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
    { name: "Custom File Type", extensions: ["as"] },
    { name: "All Files", extensions: ["*"] },
  ],
  properties: ["openFile", "multiSelections"],
};

//Synchronous
// let filePaths = dialog.showOpenDialog(WIN, options)
// console.log('filePaths)

//Or asynchronous - using callback

module.exports = {
  async getDirectory() {
    const result = await dialog.showOpenDialog(WIN, options, (filePaths) => {
      return result;
    });
    return result;
  },
};
