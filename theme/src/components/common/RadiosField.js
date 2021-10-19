import React from 'react';
import { RadioGroup } from '@material-ui/core';

const RadiosField = ({ input, children, ...rest }) => (
	<RadioGroup {...input} {...rest}>
		{children}
	</RadioGroup>
);

export default RadiosField;
