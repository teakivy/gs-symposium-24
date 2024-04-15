import { transcribeAudio } from '../googlecloud/SpeechToText';
import { capture } from '../video/VideoRecorder';

let recorder: MediaRecorder | null = null;
let chunks: Blob[] = [];

export function startRecording() {
	const constraints = { audio: true };
	navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
		recorder = new MediaRecorder(stream, {
			mimeType: 'audio/webm; codecs=opus',
			bitsPerSecond: 128000,
		});
		recorder.ondataavailable = (e) => {
			chunks.push(e.data);
		};
		recorder.start();
	});

	capture();
}

export function stopRecording() {
	setTimeout(() => {
		if (recorder) {
			recorder.stop();
			recorder = null;
		}

		// set tiemout to allow the recorder to finish
		setTimeout(async () => {
			const blob = new Blob(chunks, { type: 'audio/wav' });
			// chunks = [];
			// const audioURL = URL.createObjectURL(blob);
			// console.log(audioURL);
			// const audio = new Audio(audioURL);
			// audio.play();
			let result = await transcribeAudio(blob);

			setTimeout(() => {
				chunks = [];
			}, 500);
		}, 200);
	}, 200);
}
