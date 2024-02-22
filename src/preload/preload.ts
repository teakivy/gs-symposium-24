import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { User } from "./core/user/UserTypes";
import {
	addUser,
	getUser,
	createUser,
	addMessage,
} from "./core/user/UserManager";
import { test } from "./core/openai/OpenAI";
import { startRecording, stopRecording } from "./core/audio/AudioRecorder";

// Custom APIs for renderer
const api = {
	user: {
		addUser: (user: User) => {
			return addUser(user);
		},
		getUser: (id: string) => {
			return getUser(id);
		},
		createUser: (name: string) => {
			return createUser(name);
		},
		addMessage: (
			user: User,
			from: "system" | "assistant" | "user",
			text: string
		) => {
			return addMessage(user, from, text);
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
	},
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
