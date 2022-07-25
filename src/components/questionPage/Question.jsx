import React, { useState } from 'react';

import SingleQuestion from './SingleQuestion';

import './question.css';

export default function (props) {
	console.log('This is rendering');

	/**
	 * if ans is not submitted or all answers are not selected then it gives false else true
	 */
	const gameStatus = props.gameStart === 1 || !props.gameEnd;

	const buttonValue = gameStatus ? 'Check answers' : 'Play again';

	const questionJSX = props.question.map((value, index) => {
		return (
			<SingleQuestion
				questions={value.question}
				answers={value.answer}
				correctAnswer={value.correctAnswer}
				answerOnClick={props.answerOnClick}
				key={index}
				questionNum={index}
				gameStatus={gameStatus}
			/>
		);
	});

	return (
		<section className='questions--container'>
			{questionJSX}
			<footer className='question--footer'>
				{!gameStatus && (
					<span className='correctAnswer'>
						You scored {props.totalCorrect}/{props.question.length} correct
						answers
					</span>
				)}
				<button className='btn qa-button' onClick={props.gameEndStatus}>
					{buttonValue}
				</button>
			</footer>
		</section>
	);
}
