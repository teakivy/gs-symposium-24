import React, { useState } from 'react';
import Face from './Face';
import './Setup.css';

function Setup() {
	let [stage, setStage] = useState('0');

	window.api.on('message', (event) => {
		if (event.toString().startsWith('setup://')) {
			setStage(event.toString().split('://')[1]);
		}
	});

	if (stage === '5') {
		window.api.send('scene', 'app');
		setStage('0');
	}

	return (
		<div>
			<Face />
			<p className='message-box'>
				{getMessages(stage).map((m) => {
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

			<div className={stage == '0' ? 'circle-top' : ''} />
			<div className={stage == '1' ? 'circle-left' : ''} />
			<div className={stage == '2' ? 'circle-right' : ''} />
			<div className={stage == '3' ? 'circle-bottom' : ''} />
		</div>
	);
}

function getMessages(stageStr: string) {
	let messages: { text: string; userType: 'assistant' }[] = [];
	let stage = parseInt(stageStr);

	let message1 =
		'Hi! I’m Dixie, a smart voice assistant created by Collin Jones for the Georgia Southern Research Symposium. I can recognize, and remember who you are by using facial recognition technology. We can now set up your user profile. Don’t worry, I’ll instruct you through this whole process. First, we’re going to take a few photos, please look at the green dot at the top of the screen.';
	let message2 = 'Great! Now, look at the green dot on the left of the screen.';
	let message3 =
		'Awesome! Now, look at the green dot on the right of the screen.';
	let message4 =
		'Excellent! Now, look at the green dot at the bottom of the screen.';
	let message5 =
		"Perfect! And that’s the end of the setup process! It’s so nice to meet you! I can’t wait to get to know you better! Just so you know, at any time you can press the spacebar to start recording a message, then press it again to stop recording and send it to me. Now, let's get started!";
	if (stage == 0) {
		messages.push({ text: message1, userType: 'assistant' });
	}
	if (stage == 1) {
		messages.push({ text: message2, userType: 'assistant' });
	}
	if (stage == 2) {
		messages.push({ text: message3, userType: 'assistant' });
	}
	if (stage == 3) {
		messages.push({ text: message4, userType: 'assistant' });
	}
	if (stage == 4) {
		messages.push({ text: message5, userType: 'assistant' });
	}

	return messages;
}

export default Setup;
