import React, { useState } from "react";

function App() {
	let [text, setText] = useState("");
	return (
		<>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				onClick={() => {
					window.api.openai.test(text);
				}}
			>
				Test
			</button>
		</>
	);
}

export default App;
