export interface User {
	id: string;
	messages: Message[];
}

export interface Message {
	id: number;
	text: string;
	userType: 'user' | 'system' | 'assistant';
	userId?: string;
}
