// require('electron-reload')(__dirname)
const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  let min = 375, max = 530
  mainWindow = new BrowserWindow({
    width: min,
    // minWidth: min,
    // maxWidth: min,
    height: max,
    // minHeight: max,
    // maxHeight: max,
    // maximizable: false,
    // minimizable: false,
    // fullscreenable: false
  })

  let template = [
		{
			label: 'Let\'s Tell Time',
			submenu: [
				{
					role: 'quit'
				}
			]
		},
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Toggle Numbers',
          type: 'checkbox',
          checked: true,
          click (item, browserWindow) {
            browserWindow.focus();
            browserWindow.webContents.send('toggleNumbers');
          }
        },
        {type: 'separator'},
        {
          label: 'Don\'t round',
          type: 'radio',
          checked: true,
          click (item, browserWindow) {
            browserWindow.focus();
            browserWindow.webContents.send('roundTo', false);
          }
        },
        {
          label: 'Round to 5 minutes',
          type: 'radio',
          checked: false,
          click (item, browserWindow) {
            browserWindow.focus();
            browserWindow.webContents.send('roundTo', 5);
          }
        },
        {
          label: 'Round to 15 minutes',
          type: 'radio',
          checked: false,
          click (item, browserWindow) {
            browserWindow.focus();
            browserWindow.webContents.send('roundTo', 15);
          }
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
  ]
  //
  let settings = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(settings)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
