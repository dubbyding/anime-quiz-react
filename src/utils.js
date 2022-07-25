class Utils {
	/* Decoding a base64 string. */
	decodeBase64 = (value) => {
		return decodeURIComponent(window.atob(value));
	};
	/* Shuffling the array. */
	shuffle = (array) => {
		for (let index = array.length - 1; index > 0; index--) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
			[array[index], array[randomIndex]] = [array[randomIndex], array[index]];
		}
		return array;
	};
}

export default Utils;
