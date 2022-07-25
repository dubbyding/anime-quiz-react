import React, { useState } from 'react';

import Landing from './components/landingPage/Landing';

export default function () {
	const [gameStart, setGameStart] = useState(0);

	function startGame() {
		setGameStart((prevState) => {
			if (prevState < 2) {
				return prevState + 1;
			} else {
				return prevState - 1;
			}
		});
	}

	return (
		<React.Fragment>
			{!gameStart && <Landing startGame={startGame} />}
		</React.Fragment>
	);
}
