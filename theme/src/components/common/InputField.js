import React from 'react';
import { TextField } from '@material-ui/core';

const InputField = ({ meta: { touched, error }, input, ...rest }) => (
	<TextField {...rest} {...input} error={touched && Boolean(error)} />
);

export default InputField;
