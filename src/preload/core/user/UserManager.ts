import { getSystemMessage } from "../settings/System";
import { User, Message } from "./UserTypes";
import { v4 as uuidv4 } from "uuid";

let users: User[] = [
	{
		id: "test",
		name: "Anonymous",
		messages: [
			{
				id: 0,
				text: getSystemMessage(),
				userType: "system",
			},
		],
	},
];

export function addUser(user: User) {
	users.push(user);
}

export function createUser(name: string): User {
	let user: User = {
		id: uuidv4(),
		name,
		messages: [],
	};
	user.messages.push({
		id: 0,
		text: getSystemMessage(),
		userType: "system",
	});
	addUser(user);
	return user;
}

export function addMessage(
	user: User,
	from: "system" | "assistant" | "user",
	text: string
) {
	let message: Message = {
		id: user.messages.length,
		text,
		userType: from,
	};
	for (let u of users) {
		if (u.id === user.id) {
			u.messages.push(message);
		}
	}
}

export function getUser(id: string): User | undefined {
	let user = users.find((user) => user.id === id);

	if (!user) {
		return {
			id: "test",
			name: "Anonymous",
			messages: [
				{
					id: 0,
					text: getSystemMessage(),
					userType: "system",
				},
			],
		};
	}

	return users.find((user) => user.id === id);
}
