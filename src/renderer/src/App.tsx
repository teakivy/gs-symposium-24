import React, { useState } from 'react';
import Face, { blink, hover } from './Face';
import { gsap } from 'gsap';
import './App.css';

let recording = false;
window.electron.ipcRenderer.on('audio', (event, arg) => {
	if (arg.status === 'start') {
		window.api.audio.startRecording();
		startListening();
		recording = true;
	} else {
		window.api.audio.stopRecording();
		stopListening();
		recording = false;
	}
});

window.api.on('message', (event) => {
	console.log(event);
	console.log(event.toString().toLowerCase());
	console.log(event.toString().toLowerCase().includes('purple'));
	if (event.toString().toLowerCase().includes('purple')) {
		console.log('purple');
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const tl = gsap.timeline();
				tl.to('#robodixie-u-head', {
					rotateZ: 10 * (i % 2 === 0 ? 1 : -1),
					duration: 0.3,
					transformOrigin: 'bottom',
					// fill: 'red',
				});
			}, i * 300);
		}

		setTimeout(() => {
			const tl = gsap.timeline();
			tl.to('#robodixie-u-head', {
				rotateZ: 0,
				duration: 0.3,
				transformOrigin: 'bottom',
				// fill: 'red',
			});
		}, 1500);
	}
});

export function getRecording() {
	return recording;
}

function startListening() {
	const tl = gsap.timeline();
	tl.to('#robodixie-u-right-arm', {
		rotateZ: -150,
		duration: 0.3,
		transformOrigin: 'top',
		// fill: 'red',
	});
	const t2 = gsap.timeline();
	t2.to('#robodixie-u-head', {
		rotateZ: -10,
		duration: 0.3,
		transformOrigin: 'bottom',
	});

	tl.eventCallback('onComplete', () => {
		gsap.globalTimeline.pause();
	});
}

function stopListening() {
	gsap.globalTimeline.play();

	const tl = gsap.timeline();
	tl.to('#robodixie-u-right-arm', {
		rotateZ: -20,
		duration: 0.3,
		transformOrigin: 'top',
		// fill: 'red',
	});
	const t2 = gsap.timeline();
	t2.to('#robodixie-u-head', {
		rotateZ: 0,
		duration: 0.3,
		transformOrigin: 'bottom',
	});
}

function App() {
	let [messages, setMessages] = useState([{ text: 'Hello', userType: 'bot' }]);

	window.api.on('message', (message) => {
		let type = message.split('://')[0];
		message = message.split('://')[1];
		setMessages([...messages, { text: message, userType: type }]);
		console.log(messages);
	});
	return (
		<>
			<Face />
			<p className='text'>
				{messages.map((m) => {
					return m.userType === 'bot' ? (
						<p className='bot'>Bot: {m.text}</p>
					) : (
						<p className='user'>User: {m.text}</p>
					);
				})}
			</p>
		</>
	);
}
setTimeout(() => {
	hover();
	blink();
}, 2000);

export default App;
