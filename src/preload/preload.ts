import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { User } from './core/user/UserTypes';
import {
	addUser,
	getUser,
	createUser,
	addMessage,
	load,
	save,
	setupUser,
} from './core/user/UserManager';
import { test } from './core/openai/OpenAI';
import { startRecording, stopRecording } from './core/audio/AudioRecorder';
import { init, savePhoto } from './core/video/VideoRecorder';
import { synthesizeSpeech } from './core/googlecloud/TextToSpeech';

// Custom APIs for renderer
const api = {
	user: {
		addUser: (user: User) => {
			return addUser(user);
		},
		getUser: () => {
			return getUser();
		},
		createUser: (name: string) => {
			return createUser();
		},
		addMessage: (
			user: User,
			from: 'system' | 'assistant' | 'user',
			text: string
		) => {
			return addMessage(user, from, text);
		},
		load: () => {
			return load();
		},
		setupUser: () => {
			return setupUser();
		},
	},
	openai: {
		test: async (text: string) => {
			return await test(text);
		},
	},
	audio: {
		startRecording: () => {
			startRecording();
		},
		stopRecording: () => {
			stopRecording();
		},
		speak: (text: string) => {
			synthesizeSpeech(text);
		},
	},
	video: {
		init: () => {
			init();
		},
		capture: () => {
			// capture();
		},
	},
	demo: {
		savePhoto: (id: number) => {
			savePhoto(id);
		},
	},

	/**
	 * Send a message to the renderer process
	 * @param event Event name
	 * @param args Arguments
	 */
	send: (event: string, args?: any) => {
		ipcRenderer.send(event, args);
	},
	/**
	 * Subscribe to an event
	 * @param channel Channel to subscribe to
	 * @param callback Callback to call when the channel is called
	 */
	on: (channel: string, callback: Function) => {
		ipcRenderer.on(channel, (_, data) => callback(data));
	},
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}

export default api;
