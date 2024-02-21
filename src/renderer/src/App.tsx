import React, { useState } from "react";

function App() {
	let [text, setText] = useState("");
	return (
		<>
			<button
				onClick={() => {
					window.api.openai.test("Hello!");
				}}
			>
				Test "Hello!"
			</button>
			<br />
			<button
				onClick={() => {
					window.api.openai.test("What is the speed limit on I-16?");
				}}
			>
				Test "What is the speed limit on I-16?"
			</button>
			<br />
			<button
				onClick={() => {
					window.api.openai.test("Thank you!");
				}}
			>
				Test "Thank you!"
			</button>
			<br />
			<button
				onClick={() => {
					window.api.openai.test("What is your favorite color?");
				}}
			>
				Test "What is your favorite color?"
			</button>
			<br />
			<button
				onClick={() => {
					window.api.openai.test("Who are you?");
				}}
			>
				Test "Who are you?"
			</button>
			<br />
			<button
				onClick={() => {
					window.api.openai.test(text);
					setText("");
				}}
			>
				<i>Test Custom</i>
			</button>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</>
	);
}

export default App;
