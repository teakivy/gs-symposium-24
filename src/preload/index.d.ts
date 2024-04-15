import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			user: {
				addUser: (user: User) => User;
				getUser: () => User | undefined;
				createUser: (name: string) => User;
				addMessage: (
					user: User,
					from: 'system' | 'assistant' | 'user',
					text: string
				) => void;
				load: () => void;
				setupUser: () => void;
			};
			openai: {
				test: (text: string) => Promise<void>;
			};
			audio: {
				startRecording: () => void;
				stopRecording: () => void;
				speak: (text: string) => void;
			};
			video: {
				init: () => void;
				capture: () => void;
			};
			demo: {
				savePhoto: (id: number) => void;
			};
			send: (event: string, args?: any) => void;
			on: (channel: string, callback: Function) => void;
		};
	}
}
