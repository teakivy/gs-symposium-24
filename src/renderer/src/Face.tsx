import React from 'react';
import './Face.css';
import { gsap } from 'gsap';
import { getRecording } from './App';

function Face() {
	return <RoboDixie />;
}

export function blink() {
	const tl = gsap.timeline();
	tl.to('#robodixie-u-left-eye', {
		ry: 20,
		transformOrigin: 'center',
		duration: 0.05,
	});
	tl.to('#robodixie-u-left-eye', {
		ry: 80,
		transformOrigin: 'center',
		duration: 0.1,
	});
	const t2 = gsap.timeline();
	t2.to('#robodixie-u-right-eye', {
		ry: 20,
		transformOrigin: 'center',
		duration: 0.05,
	});
	t2.to('#robodixie-u-right-eye', {
		ry: 80,
		transformOrigin: 'center',
		duration: 0.1,
	});

	tl.eventCallback('onComplete', () => {
		const random = Math.floor(Math.random() * 3000) + 4000;
		setTimeout(() => {
			blink();
		}, random);
	});
}

export function hover() {
	const randomUp = Math.floor(Math.random() * 3) + 2;
	const randomDown = Math.floor(Math.random() * 3) + 3;
	const tl = gsap.timeline();
	tl.to('#robodixie', {
		translateY: -10,
		duration: randomUp,
	});
	tl.to('#robodixie', {
		translateY: 10,
		duration: randomDown,
	});
	const t2 = gsap.timeline();
	t2.to('#robodixie-u-left-arm', {
		rotateZ: 15,
		duration: randomUp,
		transformOrigin: 'top',
	});
	t2.to('#robodixie-u-left-arm', {
		rotateZ: 30,
		duration: randomDown,
		transformOrigin: 'top',
	});
	if (!getRecording()) {
		const t3 = gsap.timeline();
		t3.to('#robodixie-u-right-arm', {
			rotateZ: -15,
			duration: randomUp,
			transformOrigin: 'top',
		});
		t3.to('#robodixie-u-right-arm', {
			rotateZ: -30,
			duration: randomDown,
			transformOrigin: 'top',
		});
	}

	// loop
	tl.eventCallback('onComplete', () => {
		hover();
	});
}

export default Face;

export function RoboDixie() {
	return (
		<svg
			id='robodixie'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			viewBox='0 0 800 800'
			shapeRendering='geometricPrecision'
			textRendering='geometricPrecision'
		>
			<ellipse
				id='robodixie-u-left-arm'
				rx='25.493951'
				ry='71.001344'
				transform='matrix(.93442 0.356173-.356173 0.93442 238.203022 513.354954)'
				fill='#fff'
				stroke='#4f1a6e'
				strokeWidth={5}
			/>
			<ellipse
				id='robodixie-u-right-arm'
				rx='25.493951'
				ry='71.001344'
				transform='matrix(.912587-.408883 0.408883 0.912587 563.297376 513.148555)'
				fill='#fff'
				stroke='#4f1a6e'
				strokeWidth={5}
			/>
			<g id='robodixie-u-body'>
				<path
					id='robodixie-u-rectangle'
					d='M0,48C0,21.490332,21.490332,0,48,0h175.769664c26.509668,0,48,21.490332,48,48l.356947,70.60414c1.078373,92.90611-46.862287,177.048518-135.362287,178.187007l.000008.000004C49.499182,296.548781,-0.431193,211.50687,0.356947,118.60414L0,48Z'
					transform='matrix(.999987 0.005055-.005055 0.999987 264.652343 377.345052)'
					fill='#fff'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-s-path1'
					d='M263.151946,495.949481h272.14078'
					transform='translate(0 0.79344)'
					fill='none'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-u-ellipse'
					d='M-120.530716,0.030167c0-43.417707.202296-43.390153,120.733013-43.390153s120.733015-.026805,120.733015,43.390153-34.516086,115.412773-120.935311,115.412773-120.530717-56.692544-120.530717-115.412773Z'
					transform='matrix(.805726 0 0 1.125178 400.587202 515.70628)'
					fill='#e9b8f1'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-s-path2'
					d=''
					fill='none'
					stroke='#3f5787'
					strokeWidth='1.6'
				/>
				<path
					id='robodixie-s-path3'
					d='M309.913696,556.259355c25.048689,55.138351,58.880727,70.6305,89.336105,70.6305c27.888968,0,64.368453-15.492149,91.962622-70.6305-10.504459,43.219607-39.198157,86.439214-91.372096,86.439214-57.730527,0-80.717127-44.205782-89.926631-86.439214Z'
					transform='translate(-.590525 0.000002)'
					fill='#e5a6ef'
					strokeWidth='1.6'
				/>
				<path
					id='robodixie-s-path4'
					d='M303.47247,626.889857l23.158144-18.884601'
					transform='translate(-5.728371-8.526292)'
					fill='none'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-s-path5'
					d='M475.472967,599.478964l28.91007,18.884601'
					transform='translate(0 0.000001)'
					fill='none'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-s-path6'
					d=''
					fill='none'
					stroke='#3f5787'
					strokeWidth='1.6'
				/>
			</g>
			<g id='robodixie-u-head'>
				<path
					id='robodixie-u-rectangle2'
					d='M0,15.34C0,0,0,0,15.34,0h.009168c8.472048,0,15.34,6.867952,15.34,15.34v42.403812c0,8.472048-6.867952,15.34-15.34,15.34h-.009168c-15.34,0-15.34,0-15.34-15.34L0,15.34Z'
					transform='translate(547.952791 308.092639)'
					fill='#fff'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-u-rectangle3'
					d='M0,15.34C0,0,0,0,15.34,0h.009168c8.472048,0,15.34,6.867952,15.34,15.34v42.403812c0,8.472048-6.867952,15.34-15.34,15.34h-.009168c-15.34,0-15.34,0-15.34-15.34L0,15.34Z'
					transform='matrix(-1 0 0 1 253.547607 308.092639)'
					fill='#fff'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-u-rectangle4'
					d='M0,15.34C0,0,0,0,15.34,0h.009168c8.472048,0,15.34,6.867952,15.34,15.34v42.403812c0,8.472048-6.867952,15.34-15.34,15.34h-.009168c-15.34,0-15.34,0-15.34-15.34L0,15.34Z'
					transform='matrix(0-1-1 0 435.764242 266.684056)'
					fill='#fff'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-u-ellipse2'
					d='M-174.496337,0c0-93.295072,113.447844-93.295072,174.496337-93.295072s174.496337-.000002,174.496337,93.295072-118.084575,93.295072-174.496337,93.295072-174.496337.000002-174.496337-93.295072Z'
					transform='matrix(.931522 0 0 1 400.750199 344.634545)'
					fill='#fff'
					stroke='#4f1a6e'
					strokeWidth={5}
				/>
				<path
					id='robodixie-u-ellipse3'
					d='M-136.445489,0c0-30.258667,36.571453-44.892647,136.445489-44.892647s136.445489,14.63398,136.445489,44.892647-21.396631,80.162417-136.445489,54.909862C-109.094285,80.162414,-136.445489,32.18132,-136.445489,0Z'
					transform='matrix(1 0 0 1.170465 399.222336 344.695289)'
					fill='#2d0a43'
					strokeWidth={0}
				/>
				<g id='robodixie-u-eyes'>
					<ellipse
						id='robodixie-u-left-eye'
						rx={80}
						ry={80}
						transform='matrix(.181444 0 0 0.181444 329.194734 353.932135)'
						fill='#e9b8f1'
						strokeWidth={0}
					/>
					<ellipse
						id='robodixie-u-right-eye'
						rx={80}
						ry={80}
						transform='matrix(.181444 0 0 0.181444 469.249938 353.932135)'
						fill='#e9b8f1'
						strokeWidth={0}
					/>
				</g>
			</g>
		</svg>
	);
}
