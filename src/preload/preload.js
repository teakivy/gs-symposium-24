import { test } from "./core/openai";
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	ping: () => test(),
});
