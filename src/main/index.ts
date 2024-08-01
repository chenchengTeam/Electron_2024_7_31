import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// TODO：主进程
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 130,
    transparent: false,
    backgroundColor: '#00000000',
    show: false,
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
    autoHideMenuBar: true,
    icon: join(__dirname, '../../resources/icon.png'),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false //关闭原生导航栏
  })

  // 固定 取消固定
  ipcMain.on('anchor', () => {
    console.log('固定、取消固定')
    if (mainWindow.isAlwaysOnTop()) {
      mainWindow.setAlwaysOnTop(false)
      console.log('窗口不再始终在顶层。')
    } else {
      mainWindow.setAlwaysOnTop(true)
      console.log('窗口现在始终在顶层。')
    }
  })

  // 缩小
  ipcMain.on('min', () => {
    console.log('缩小')
    mainWindow.minimize()
  })

  // 放大
  ipcMain.on('max', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
      console.log('恢复')
    } else {
      console.log('最大化')
      mainWindow.maximize()
    }
  })
  // 关闭
  ipcMain.on('close', () => mainWindow.close())

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // NOTE: 测试 IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
