const fs = require('fs');
const path = require(`path`)
const ytdl = require('ytdl-core')


async function downloadVideo(idVideo, doc) {

	ytdl.getInfo(`${idVideo}`)
		.then(info => {
			console.group('YtDownload')
			console.log(info)
			console.groupEnd()

			let downloadDetails = {
				savePath: path.join('media',`${info.videoDetails.title}.mp4`),
				counterSize: 0,
				quality: [],
				fullDetails: info
			}

			ytdl(`${idVideo}`, {highWaterMark: 4096,dlChunkSize: 0, quality: 'highest'})
				.on('start', () => {
					console.log('Start Download')

					doc.querySelector('#videoName').textContent = info.videoDetails.title
				})
				.on('progress', (event) => {
					let size = ((downloadDetails.counterSize += event)/1000/1000).toFixed(2)

					doc.querySelector('#currentSize').textContent = `${size} mb`
				})
				.on('end', () => {
					console.log('Download completed')
				})
				.pipe(fs.createWriteStream(downloadDetails.savePath))
		})
}

module.exports = {downloadVideo}

