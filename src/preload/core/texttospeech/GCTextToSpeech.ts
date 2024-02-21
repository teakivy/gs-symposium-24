import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient();

export async function synthesizeSpeech(text: string) {
	// Construct the request
	const request = {
		input: { text: text },
		// Select the language and SSML voice gender (optional)
		voice: {
			languageCode: "en-US",
			name: "en-US-Neural2-F",
		},
		// select the type of audio encoding
		audioConfig: {
			audioEncoding: "MP3",
			effectsProfileId: ["headphone-class-device"],
			pitch: 0,
			speakingRate: 1,
		},
	};

	// Performs the text-to-speech request
	// @ts-ignore
	const [response] = await client.synthesizeSpeech(request);
	// Write the binary audio content to a local file

	const blob = new Blob([response.audioContent], { type: "audio/mp3" });
	const url = URL.createObjectURL(blob);

	new Audio(url).play();
	console.log("Audio played");
}
