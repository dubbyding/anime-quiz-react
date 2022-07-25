import React, { useState, useEffect, useRef } from 'react';

import Landing from './components/landingPage/Landing';
import Question from './components/questionPage/Question';

import Utils from './utils';

export default function () {
	const [gameStart, setGameStart] = useState(0);

	const [gameAPIFetch, setGameAPIFetch] = useState(0);

	const [question, setQuestion] = useState('');

	const [gameEnd, setGameEnd] = useState(false);

	const firstLoad = useRef(false);

	const totalCorrect = useRef(0);

	/**
	 * If the game has not started, start the game. If the game has started, reset the game
	 */
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

	/**
	 * If the answerIndex and questionIndex match, then set the clickStatus to true, otherwise set it to
	 * false
	 */
	function answerOnClick(answerIndex, questionIndex) {
		setQuestion((prevState) => {
			return prevState.map((QA, qIndex) => {
				if (qIndex === questionIndex) {
					const answer = QA.answer.map((ans, aIndex) => {
						if (aIndex === answerIndex) {
							return {
								...ans,
								clickStatus: !ans.clickStatus,
							};
						} else {
							return {
								...ans,
								clickStatus: false,
							};
						}
					});
					return {
						...QA,
						answer,
					};
				} else {
					return QA;
				}
			});
		});
	}

	/**
	 * The function gameEndStatus() is a function that sets the state of the gameEnd variable to the
	 * opposite of what it was before
	 */
	function gameEndStatus() {
		/**
		 * first click is to show the answers and second is to restart the game
		 */
		if (gameEnd) {
			startGame();
		}
		setGameEnd((prevGameEnd) => !prevGameEnd);
	}

	/**
	 * If the game has started, display the question, otherwise display the landing page
	 * @returns A JSX element
	 */
	function displayJSX() {
		if (gameStart) {
			if (question != '') {
				return (
					<Question
						question={question}
						answerOnClick={answerOnClick}
						gameStart={gameStart}
						gameEnd={gameEnd}
						gameEndStatus={gameEndStatus}
						totalCorrect={totalCorrect.current}
					/>
				);
			}
		} else {
			return <Landing startGame={startGame} />;
		}
	}

	useEffect(() => {
		/* This is a useEffect hook that is used to fetch the questions from the API. The firstLoad.current
        is a boolean that is used to determine if the useEffect hook has been called before. If it has not
        been called before, then it will set the firstLoad.current to true. If it has been called before,
        then it will fetch the questions from the API. */
		if (firstLoad.current) {
			fetch(
				'https://opentdb.com/api.php?amount=10&category=31&type=multiple&encode=base64'
			)
				.then((response) => response.json())
				.then((value) => {
					setQuestion(setQuestionAnswersArray(value));
				});
		} else {
			firstLoad.current = !firstLoad.current;
		}
	}, [gameAPIFetch]);

	useEffect(() => {
		if (question) {
			const questionStatus = question.every((que) =>
				que.answer.some((ans) => ans.clickStatus)
			);
			totalCorrect.current = question.filter((que) => {
				const cAns = que.correctAnswer;

				return que.answer.some((ans) => {
					if (ans.answer === cAns && ans.clickStatus) {
						return true;
					} else {
						return false;
					}
				});
			}).length;

			if (questionStatus) {
				setGameStart(2);
			} else {
				setGameStart(1);
			}
		}
	}, [question]);

	return <React.Fragment>{displayJSX()}</React.Fragment>;
}
