import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			user: {
				addUser: (user: User) => User;
				getUser: (id: string) => User | undefined;
				createUser: (name: string) => User;
				addMessage: (
					user: User,
					from: "system" | "assistant" | "user",
					text: string
				) => void;
			};
			openai: {
				test: (text: string) => Promise<void>;
			};
			audio: {
				startRecording: () => void;
				stopRecording: () => void;
			};
		};
	}
}
