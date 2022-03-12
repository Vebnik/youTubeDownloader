const fs = require('fs');
const path = require(`path`)
const ytdl = require('ytdl-core')
const {mkdir} = require("ffmpeg/lib/utils");


async function downloadVideo(idVideo, doc) {

	ytdl.getInfo(`${idVideo}`)
		.then(info => {
			let downloadDetails = {
				savePath: path.join(__dirname,'media',`${info.videoDetails.title}.mp4`),
				counterSize: 0,
				quality: [],
				fullDetails: info
			}

			mkdir(path.join(__dirname, 'media'))

			ytdl(`${idVideo}`, {highWaterMark: 4096,dlChunkSize: 0, quality: 'highest'})
				.on('progress', (event) => {
					let size = ((downloadDetails.counterSize += event)/1000/1000).toFixed(2)

					doc.querySelector('#currentSize').textContent = `${size} mb`
					doc.querySelector('#videoName').textContent = info.videoDetails.title
				})
				.on('end', () => {
					console.log('Download completed')
				})
				.pipe(fs.createWriteStream(downloadDetails.savePath))
		})
}

module.exports = {downloadVideo}
