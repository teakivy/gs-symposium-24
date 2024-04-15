import OpenAI from 'openai';
import { config } from 'dotenv';
import { User } from '../user/UserTypes';
import { ChatCompletionMessageParam } from 'openai/resources';
import { addMessage, getUser } from '../user/UserManager';
import { synthesizeSpeech } from '../googlecloud/TextToSpeech';
import { ipcRenderer } from 'electron';
import api from '../../preload';

config();

const openai = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
	dangerouslyAllowBrowser: true,
});

export async function test(text: string) {
	api.send('message', 'user://' + text);
	let user = getUser();
	if (!user) {
		user = {
			id: 'test',
			messages: [],
		};
	}
	let messages = getMessages(user);
	addMessage(user, 'user', text);
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			...messages,
			{
				role: 'user',
				content: text,
			},
		],
		model: 'gpt-3.5-turbo',
	});
	if (chatCompletion.choices.length === 0) return;
	if (chatCompletion.choices[0].message.content === null) return;
	addMessage(user, 'assistant', chatCompletion.choices[0].message.content);
	synthesizeSpeech(chatCompletion.choices[0].message.content);
}

export function getMessages(user: User) {
	let messages: ChatCompletionMessageParam[] = [];
	for (let message of user.messages) {
		messages.push({ role: message.userType, content: message.text });
	}
	return messages;
}
