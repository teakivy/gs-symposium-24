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
	if (event.toString().toLowerCase().includes('purple')) {
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
window.api.user.load();

function App() {
	let [messages, setMessages] = useState([
		{ text: 'Hello', userType: 'assistant' },
	]);

	window.api.on('message', () => {
		let user = window.api.user.getUser();

		let messages = user.messages;
		// get the last 8 messages
		messages = messages.slice(Math.max(messages.length - 8, 0));
		// remove system messages
		messages = messages.filter((m) => m.userType !== 'system');
		messages = messages.map((m) => {
			return {
				text: m.text,
				userType: m.userType,
			};
		});
		setMessages(messages);
	});

	return (
		<>
			<Face />
			<p className='message-box'>
				{messages.map((m) => {
					return m.userType === 'assistant' ? (
						<div className='message-container'>
							<p className='bot-message'>{m.text}</p>
						</div>
					) : (
						<div className='message-container'>
							<p className='user-message'>{m.text}</p>
						</div>
					);
				})}
			</p>
			<div className='press-to-record'>
				<p>Press space to start recording</p>
			</div>
		</>
	);
}
setTimeout(() => {
	hover();
	blink();
}, 2000);

export default App;
