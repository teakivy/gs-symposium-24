import { v4 } from 'uuid';

let recording = false;

export function init() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			const video = document.querySelector('video');
			if (!video) return;
			video.srcObject = localMediaStream;

			video.onloadedmetadata = () => {
				video.play();
			};
		})
		.catch((error) => {
			console.log('Rejected!', error);
		});
	if (!recording) setInterval(capture, 500);
	recording = true;
}

export function capture() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const context = canvas.getContext('2d');

	const video = document.querySelector('video');
	if (!video) return;
	video.pause();
	canvas.width = 640;
	canvas.height = 480;
	context?.drawImage(video, 0, 0, 640, 480);
	const data = canvas.toDataURL('image/png');
	video.play();

	document.getElementById('photo')?.setAttribute('src', data);

	// Save data to file
	let buffer = Buffer.from(
		data.replace(/^data:image\/\w+;base64,/, ''),
		'base64'
	);
	const fs = require('fs');
	fs.writeFile('current.png', buffer, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
}

export function savePhoto(id: number) {
	const fs = require('fs');
	fs.mkdir(
		`C:\\Users\\legoc\\AppData\\Roaming\\FaceDB\\${id}`,
		{
			recursive: true,
		},
		(err: any) => {
			if (err) {
				console.error(err);
				return;
			}
		}
	);
	fs.copyFile(
		'current.png',
		`C:\\Users\\legoc\\AppData\\Roaming\\FaceDB\\${id}\\${v4()}.png`,
		(err) => {
			if (err) {
				console.error(err);
				return;
			}
		}
	);
}
