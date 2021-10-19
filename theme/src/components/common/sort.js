import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../../lib/settings';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const Sort = ({ defaultSort, currentSort, setSort }) => (
	<FormControl variant="outlined" fullWidth>
		<InputLabel id="demo-simple-select-outlined-label">Sort:</InputLabel>

		<Select
			label={text.sort}
			onChange={(e) => {
				setSort(e.target.value);
			}}
			value={currentSort}>
			<MenuItem value={defaultSort}>{text.sortFavorite}</MenuItem>
			<MenuItem value={themeSettings.sortNewest}>{text.sortNewest}</MenuItem>
			<MenuItem value={themeSettings.sortPriceLow}>{text.sortPriceLow}</MenuItem>
			<MenuItem value={themeSettings.sortPriceHigh}>{text.sortPriceHigh}</MenuItem>
		</Select>
	</FormControl>
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired,
};

export default Sort;
