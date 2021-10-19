import { pull } from 'lodash';

export const stringToURL = str =>
	str
		.split(' ')
		.join('-')
		.toLowerCase();
export const urlToString = url =>
	url
		.split('-')
		.join(' ')
		.toLowerCase();
export const getColName = name => {
	const nameArray = name.split(' ');
	if (nameArray.length === 0) return '';
	const colName =
		nameArray[0].toLowerCase() === 'tl'
			? (nameArray[0] + ' ' + nameArray[1]).toUpperCase()
			: nameArray[0].toUpperCase();
	return colName;
};
export const getProductName = name => {
	const nameArray = name.split(' ');
	if (nameArray.length === 0) return '';
	const colName =
		nameArray[0].toLowerCase() === 'tl'
			? (nameArray[0] + ' ' + nameArray[1]).toUpperCase()
			: nameArray[0].toUpperCase();
	return name.substring(colName.length);
};
export const getCategoryName = (name, level) => {
	let nameArray = name.split(' ');
	nameArray = nameArray.map(e => e.toLowerCase());
	if (level === 0) {
		nameArray = pull(
			nameArray,
			'leather',
			'italian',
			'for',
			'men',
			'women',
			"men's"
		);
	} else {
		nameArray = pull(nameArray, 'leather', 'italian', 'bags', 'for', 'and');
	}

	nameArray = nameArray.map(e => e.toUpperCase());
	return nameArray.join(' ');
};
