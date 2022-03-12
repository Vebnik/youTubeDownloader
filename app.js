const { app, BrowserWindow } = require('electron')
const  path = require('path')

function createWindow() {

	let renderHtml = path.join(__dirname, 'html', 'index.html')
	const win = new BrowserWindow({
		width: 400,
		height: 250,
		resizable: false,
		frame: false,
		hasShadow: true,
		webPreferences: {
			preload: path.join(__dirname, 'src', 'frontLogic.js')
		},
	})

	win.loadFile(renderHtml)
		.then(winInfo => {
			console.log(winInfo)
		})

	win.on('close', () => {
		app.quit()
	})

}

function readyApp() {
	app.on('ready', () => {
		createWindow()
	})
}
readyApp()
