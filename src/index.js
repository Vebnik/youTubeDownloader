const fs = require('fs');
const path = require(`path`)
const ytdl = require('ytdl-core')
//const {mkdir} = require("ffmpeg/lib/utils");


async function downloadVideo(idVideo, doc) {

	ytdl.getInfo(`${idVideo}`)
		.then(async info => {
			let downloadDetails = {
				savePath: path.join(__dirname.split('resources')[0],'media',`${info.videoDetails.title}.mp4`),
				counterSize: 0,
				quality: [],
				fullDetails: info
			}

			console.log(__dirname)

			await fs.mkdir(path.join(__dirname.split('resources')[0], 'media'), (err) => {
				if (err) {
					console.log(err)
				} else {
					console.log('Dir successful')
				}
			})

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
