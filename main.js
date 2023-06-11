const { app, BrowserWindow, shell, Menu } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL('https://calendar.google.com/calendar/u/2/r/month')

  const menuTemplate = [
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Back',
          click: () => {
            mainWindow.webContents.goBack()
          }
        },
        {
          label: 'Forward',
          click: () => {
            mainWindow.webContents.goForward()
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault()
    shell.openExternal(url)
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})