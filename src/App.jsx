import React, { useState, useEffect } from 'react';

import Landing from './components/landingPage/Landing';
import Utils from './utils';

export default function () {
	const [gameStart, setGameStart] = useState(0);

	const [gameAPIFetch, setGameAPIFetch] = useState(0);

	const [question, setQuestion] = useState('');

	function startGame() {
		setGameStart((prevState) => {
			if (prevState < 2) {
				return prevState + 1;
			} else {
				return prevState - 1;
			}
		});
		setGameAPIFetch((prevState) => {
			if (prevState === 1) return 0;
			else return 1;
		});
	}

	/**
	 * It takes an array of questions, decodes the base64 encoding, shuffles the answers, and returns an
	 * array of objects with the question, answers, and correct answer
	 * @returns An array of objects with the following properties:
	 * 	question: a string
	 * 	answer: an array of objects with the following properties:
	 * 		answer: a string
	 * 		clickStatus: a boolean
	 * 	correctAnswer: a string
	 */
	function setQuestionAnswersArray(arrayOfQuestions) {
		const utils = new Utils();
		return arrayOfQuestions.results.map((value) => {
			const question = utils.decodeBase64(value.question);

			const correctAnswer = utils.decodeBase64(value.correct_answer);
			const correctAnswerObj = [
				{
					answer: correctAnswer,
					clickStatus: false,
				},
			];

			const answer = utils.shuffle(
				correctAnswerObj.concat([
					...value.incorrect_answers.map((ans) => {
						return {
							answer: utils.decodeBase64(ans),
							clickStatus: false,
						};
					}),
				])
			);

			return { question, answer, correctAnswer };
		});
	}

	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=10&type=multiple&encode=base64')
			.then((response) => response.json())
			.then((value) => {
				setQuestion(setQuestionAnswersArray(value));
			});
	}, [gameAPIFetch]);

	return (
		<React.Fragment>
			{!gameStart && <Landing startGame={startGame} />}
		</React.Fragment>
	);
}
