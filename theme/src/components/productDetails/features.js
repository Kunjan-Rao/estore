import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import { keys, get } from 'lodash';
import { Typography, ListItem, ListItemText, Grid } from '@material-ui/core';

const Feature = ({ name, array }) => (
	<div>
		<Typography variant="h3">{name}:</Typography>
		{array.map((value) => (
			<li key={value}>{value}</li>
		))}
	</div>
);

const Features = ({ features }) => {
	const reskeys = keys(features);
	if (reskeys && reskeys.length > 0) {
		const items = reskeys.map((key, index) => (
			<Grid item xs={12} md={6} key={index}>
				<Feature array={get(features, key)} name={key} />
			</Grid>
		));

		return <Grid container>{items}</Grid>;
	} else {
		return null;
	}
};
export default Features;
