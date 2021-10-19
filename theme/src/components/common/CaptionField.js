import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';

const CaptionField = (props) => {
	const { label, text } = props;
	return (
		<Grid container>
			<Typography variant="caption">{`${label}:`}</Typography>
			<Typography variant="caption">{text}</Typography>
		</Grid>
	);
};
export default CaptionField;
