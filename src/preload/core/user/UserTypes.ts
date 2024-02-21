export interface User {
	id: string;
	name: string;
	messages: Message[];
}

export interface Message {
	id: number;
	text: string;
	userType: "user" | "system" | "assistant";
	userId?: string;
}
