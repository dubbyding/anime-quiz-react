import React from 'react';

import SingleQuestion from './SingleQuestion';

import './question.css';

export default function (props) {
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
			<button className='btn qa-button' onClick={props.gameEndStatus}>
				{buttonValue}
			</button>
		</section>
	);
}
