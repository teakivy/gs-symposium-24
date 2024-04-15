import React from 'react';
import App from './App';
import Setup from './Setup';

function Page() {
	let [scene, setScene] = React.useState('app');

	window.electron.ipcRenderer.on('scene', (event, arg) => {
		setScene(arg);
		if (arg === 'setup') {
			console.log('setup');
			window.api.user.setupUser();
		}
	});

	window.api.video.init();
	return (
		<>
			{scene === 'setup' ? <Setup /> : <App />}

			<video id='video' autoPlay />
			<canvas id='canvas' />
			<div className='output'>
				<img id='photo' />
			</div>
		</>
	);
}

export default Page;
