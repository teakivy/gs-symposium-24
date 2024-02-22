import speech from "@google-cloud/speech";
import { test } from "../openai/OpenAI";

export async function transcribeAudio(audio: Blob) {
	const client = new speech.SpeechClient();
	client.initialize;
	const audioBuffer = await audio.arrayBuffer();
	const audioBytes = new Uint8Array(audioBuffer);

	const request = {
		audio: {
			content: Buffer.from(audioBytes).toString("base64"),
			// uri: "gs://cloud-samples-data/speech/brooklyn_bridge.raw",
		},
		config: {
			encoding: "WAV",
			sampleRateHertz: 48000,
			languageCode: "en-US",
		},
	};

	// @ts-ignore
	const [response] = await client.recognize(request);
	const transcription = response.results
		.map((result) => result.alternatives[0].transcript)
		.join("\n")
		.split("\n")
		.reverse()[0];
	console.log(transcription);

	test(transcription);
}
