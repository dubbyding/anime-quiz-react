import React from 'react';

import './landing.css';

export default function (props) {
	return (
		<section className='landing--section'>
			<h1 className='landing--header'>Quizzical</h1>
			<p className='landing--detail'>Some description if needed</p>
			<button className='btn landing--button' onClick={props.startGame}>
				Start Quiz
			</button>
		</section>
	);
}
