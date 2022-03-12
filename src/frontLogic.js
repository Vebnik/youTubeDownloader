const {downloadVideo} = require('./index.js')

window.addEventListener('load', () => {

	function closeMinApp () {
		document.querySelector('#close')
			.addEventListener('click', () => { window.close() })
	}
	closeMinApp()

	function downloadVid() {
		let idVideo = document.querySelector('.input').value
		downloadVideo(idVideo, document)
			.then(info => {
				console.log('Start Download')
			})
	}

	function logic() {
		document.querySelector('#myDowButton')
			.addEventListener('click', downloadVid)
	}
	logic()

});