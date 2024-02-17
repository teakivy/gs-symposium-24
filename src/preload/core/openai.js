import OpenAI from "openai";
import { config } from "dotenv";

config();

let messages = [{ role: "user", content: "Say this is a test" }];

const openai = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
	dangerouslyAllowBrowser: true,
});

export async function test() {
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: "Say this is a test" }],
		model: "gpt-3.5-turbo",
	});
	console.log(chatCompletion);
}
