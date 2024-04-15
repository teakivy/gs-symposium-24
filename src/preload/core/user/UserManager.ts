import { getSystemMessage } from '../settings/System';
import { User, Message } from './UserTypes';
import { v4 as uuidv4 } from 'uuid';
import face_record from '../../../../face_record.json';
import conversations from '../../../../conversations.json';
import { getMessages } from '../openai/OpenAI';
import fs from 'fs';
import { synthesizeSpeech } from '../googlecloud/TextToSpeech';
import { savePhoto } from '../video/VideoRecorder';
import api from '../../preload';

let users: User[] = [];

export function addUser(user: User) {
	users.push(user);
}

export function createUser(): User {
	let user: User = {
		id: uuidv4(),
		messages: [],
	};
	user.messages.push({
		id: 0,
		text: getSystemMessage(),
		userType: 'system',
	});
	addUser(user);

	return user;
}

export function addMessage(
	user: User,
	from: 'system' | 'assistant' | 'user',
	text: string
) {
	let message: Message = {
		id: user.messages.length,
		text,
		userType: from,
	};
	for (let u of users) {
		if (u.id === user.id) {
			console.log('Adding message to user: ', u.id);
			u.messages = [...u.messages, message];
			break;
		}
	}
}

export function getUser(): User | undefined {
	let response = fs.readFileSync('face_record.json', 'utf-8');
	let id = JSON.parse(response)
		[face_record.length - 1]['identity'].split('FaceDB\\')[1]
		.split('\\')[0];

	let u = users.find((u) => u.id === id);
	if (!u) {
		return undefined;
	}
	let user: User = {
		id,
		messages: u.messages || [],
	};

	return user;
}

export function load() {
	console.log('Loading users...');
	users = [];
	let conv = JSON.parse(fs.readFileSync('conversations.json', 'utf-8'));
	for (let key in conv) {
		let user: User = {
			id: key,
			messages: conv[key],
		};
		users.push(user);
	}

	setInterval(save, 1000 * 5);
}

export function save() {
	let conv = JSON.parse(fs.readFileSync('conversations.json', 'utf-8'));
	for (let user of users) {
		conv[user.id] = user.messages;
	}
	fs.writeFileSync('conversations.json', JSON.stringify(conv, null, 4));
}

let lastSetup = 0;
export function setupUser() {
	if (Date.now() - lastSetup < 1000 * 60) return;
	lastSetup = Date.now() - 1000;
	let id = Math.floor(Math.random() * 1000000);
	let user: User = {
		id: id.toString(),
		messages: [],
	};
	user.messages.push({
		id: 0,
		text: getSystemMessage(),
		userType: 'system',
	});
	addUser(user);
	api.send('message', 'setup://0');

	let message1 =
		'Hi! I’m Dixie, a smart voice assistant created by Collin Jones for the Georgia Southern Research Symposium. I can recognize, and remember who you are by using facial recognition technology. We can now set up your user profile. Don’t worry, I’ll instruct you through this whole process. First, we’re going to take a few photos, please look at the green dot at the top of the screen.';
	synthesizeSpeech(message1);

	setTimeout(() => {
		savePhoto(id);
		api.send('message', 'setup://1');

		let message2 =
			'Great! Now, look at the green dot on the left of the screen.';
		synthesizeSpeech(message2);

		setTimeout(() => {
			savePhoto(id);
			api.send('message', 'setup://2');

			let message3 =
				'Awesome! Now, look at the green dot on the right of the screen.';
			synthesizeSpeech(message3);

			setTimeout(() => {
				savePhoto(id);
				api.send('message', 'setup://3');

				let message4 =
					'Excellent! Now, look at the green dot at the bottom of the screen.';
				synthesizeSpeech(message4);

				setTimeout(() => {
					savePhoto(id);
					api.send('message', 'setup://4');

					let message5 =
						"Perfect! And that’s the end of the setup process! It’s so nice to meet you! I can’t wait to get to know you better! Just so you know, at any time you can press the spacebar to start recording a message, then press it again to stop recording and send it to me. Now, let's get started!";
					synthesizeSpeech(message5);
					setTimeout(() => {
						api.send('message', 'setup://5');
					}, 20 * 1000);
				}, 7 * 1000);
			}, 6 * 1000);
		}, 6 * 1000);
	}, 25 * 1000);
}
