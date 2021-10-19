import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get } from 'lodash';

const SelectRedux = ({
	meta: { touched, error },
	input: { onChange, onBlur, ...inputRest },
	label,
	required,
	onSelectChange,
	...rest
}) => (
	<Autocomplete
		getOptionLabel={(option) => get(option, 'name')}
		renderOption={(option) => <span>{option.name}</span>}
		onChange={(_, v) => {
			onSelectChange && onSelectChange(v);
			onChange(v);
		}}
		{...inputRest}
		{...rest}
		renderInput={(params) => (
			<TextField
				error={touched && Boolean(error)}
				variant="outlined"
				required={required}
				fullWidth
				type="text"
				label={label}
				{...params}
			/>
		)}
	/>
);
export default SelectRedux;
