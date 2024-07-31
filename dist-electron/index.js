"use strict";
const electron = require("electron");
const path = require("path");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    //
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true
      //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL(
      `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`
    );
  }
};
electron.app.whenReady().then(createWindow);
