import React from 'react';

import './singleQuestion.css';

export default function (props) {
	const answersMap = props.answers.map((answer, answerNumber) => {
		let styles;
		if (answer.clickStatus) {
			styles = {
				background: '#D6DBF5',
			};
		} else {
			styles = {
				background: '#ffffff',
			};
		}

		return (
			<span
				className='answer'
				key={answer.answer}
				style={styles}
				onClick={() => {
					return props.gameStatus
						? props.answerOnClick(answerNumber, props.questionNum)
						: '';
				}}
			>
				{answer.answer}
			</span>
		);
	});

	return (
		<section className='question--section'>
			<h1 className='questions'>{props.questions}</h1>
			<div className='answer--section'>{answersMap}</div>
		</section>
	);
}
