import React from 'react';

import './singleQuestion.css';

export default function (props) {
	const answersMap = props.answers.map((answer, answerNumber) => {
		let styles;

		if (props.gameStatus) {
			if (answer.clickStatus) {
				styles = {
					background: '#D6DBF5',
				};
			} else {
				styles = {
					background: '#ffffff',
				};
			}
		} else {
			if (props.correctAnswer === answer.answer) {
				styles = {
					background: '#94D7A2',
				};
			} else {
				if (answer.clickStatus) {
					styles = {
						background: '#F8BCBC',
					};
				} else {
					styles = {
						background: 'trasparent',
					};
				}
			}
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
			<h1 className='questions'>
				{props.questionNum + 1}) {props.questions}
			</h1>
			<div className='answer--section'>{answersMap}</div>
		</section>
	);
}
