import OpenAI from "openai";
import { config } from "dotenv";
import { User } from "../user/UserTypes";
import { ChatCompletionMessageParam } from "openai/resources";
import { addMessage, getUser } from "../user/UserManager";

config();

const openai = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"],
	dangerouslyAllowBrowser: true,
});

export async function test(text: string) {
	let user = getUser("test");
	if (!user) {
		user = {
			id: "test",
			name: "Collin Jones",
			messages: [],
		};
	}
	let messages = getMessages(user);
	console.log(messages);
	addMessage(user, "user", text);
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			...messages,
			{
				role: "user",
				content: text,
			},
		],
		model: "gpt-3.5-turbo",
	});
	if (chatCompletion.choices.length === 0) return;
	if (chatCompletion.choices[0].message.content === null) return;
	addMessage(user, "assistant", chatCompletion.choices[0].message.content);
	console.log(chatCompletion.choices[0].message.content);
}

export function getMessages(user: User) {
	let messages: ChatCompletionMessageParam[] = [];
	for (let message of user.messages) {
		messages.push({ role: message.userType, content: message.text });
	}
	return messages;
}
