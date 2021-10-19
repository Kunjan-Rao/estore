import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import { Chip, FormControl, RadioGroup, Radio, FormControlLabel, Tooltip } from '@material-ui/core';
import namedColors from '../../../locales/colornames.json';
import { get } from 'lscache';

const Option = ({ option, onChange, value }) => {
	// const values = option.values
	// 	.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
	// 	.map((value, index) => (
	// 		<option key={index} value={value.id}>
	// 			{value.name}
	// 		</option>
	// 	));

	// const notSelectedTitle = `${text.selectOption} ${option.name}`;
	const color = namedColors.find((e) => e.name.toLowerCase().includes(option.color.toLowerCase())) || {};
	return (
		<NavLink to={option.slug}>
			<Tooltip title={option.color}>
				<Radio
					checked={value === option.slug}
					style={{ backgroundColor: color.hex || '#000', boxShadow: '1px 1px #888888' }}
					value={option.slug}
				/>
			</Tooltip>
		</NavLink>
	);
};

const Options = ({ options, onChange, value }) => {
	// const [value, setValue]=useState(defaultValue)
	// const onChange=(event)=>{
	// 	setValue(event.target.value)
	// 	onChange(event.target.value)
	// }
	if (options && options.length > 0) {
		const items = options.map((option, index) => <Option key={index} option={option} value={value} />);

		// return <div className="product-options">{items}</div>;
		return (
			<div className="product-options">
				<RadioGroup aria-label="quiz" name="quiz" row>
					{items}
				</RadioGroup>
			</div>
		);
	} else {
		return null;
	}
};
export default Options;
