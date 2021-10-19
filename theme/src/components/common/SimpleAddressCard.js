import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import PropTypes from 'prop-types';
import * as helper from '../../lib/helper';
import {
	ListItem,
	ListItemText,
	CardContent,
	Card,
	IconButton,
	ButtonGroup,
	CardMedia,
	ListItemSecondaryAction,
	Button,
	Grid,
	Divider,
	Box,
	withStyles,
} from '@material-ui/core';
import styles from './cart-jss';
import { get } from 'lodash';

const TotalPriceCard = (props) => {
	const { address, title, settings, classes } = props;
	return (
		<Card>
			<h5>{title}</h5>
			<p>
				{address.first_name} {address.last_name} {address.phone}
			</p>
			<p>
				{address.address2} {address.address1} {address.city} {get(address, 'state.name')} {get(address, 'country.name')}
			</p>
		</Card>
	);
};

export default withStyles(styles)(TotalPriceCard);
