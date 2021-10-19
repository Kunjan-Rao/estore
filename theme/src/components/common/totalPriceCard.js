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

const TotalPriceCard = (props) => {
	const { order, settings, classes, showShipping } = props;
	return (
		<Card>
			<Box className={classes.price_box}>
				<p>{text.subtotal}</p>
				<p className={classes.price_value}>{helper.formatCurrency(order.sub_total, settings)}</p>
			</Box>
			{showShipping && (
				<Box className={classes.price_box}>
					<p>{text.shipping}</p>
					<p className={classes.price_value}>{helper.formatCurrency(order.shipping_price, settings)}</p>
				</Box>
			)}
			<Divider />
			<Box className={classes.price_box}>
				<p>{text.grandTotal}</p>
				<p className={classes.price_value}>{helper.formatCurrency(order.grand_total, settings)}</p>
			</Box>
		</Card>
	);
};

export default withStyles(styles)(TotalPriceCard);
