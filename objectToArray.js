/**
 * @param {object}
 * @returns {array}
 */
function objectToArray(data) {
	let arr = [];
	let obj = Object.entries(data);

	for (let i in obj) {
		arr[i] = {key: obj[i][0], value: obj[i][1]};
	}

	return arr;
}
