const test = async () => {
	const response = await window.electron.ping();
	console.log(response); // prints out 'pong'
};

function App() {
	return (
		<>
			<button onClick={test}>Test</button>
		</>
	);
}

export default App;
