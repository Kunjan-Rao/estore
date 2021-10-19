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
	const { cart, settings, classes, showShipping } = props;
	if (cart && cart.items && cart.items.length > 0) {
		const subTotal = cart.items.map((item) => item.price_total).reduce((a, b) => Number(a) + Number(b), 0);
		return (
			<Card>
				<Box className={classes.price_box}>
					<p>{text.subtotal}</p>
					<p className={classes.price_value}>{helper.formatCurrency(cart.sub_total, settings)}</p>
				</Box>
				{showShipping && (
					<Box className={classes.price_box}>
						<p>{text.shipping}</p>
						<p className={classes.price_value}>{helper.formatCurrency(cart.shipping_total, settings)}</p>
					</Box>
				)}

				{/* <div className="column is-7">{text.subtotal}</div>
				<div className="column is-5 has-text-right price">{helper.formatCurrency(cart.sub_total, settings)}</div>
				<div className="column is-7">{text.shipping}</div>
				<div className="column is-5 has-text-right price">{helper.formatCurrency(cart.shipping_price, settings)}</div>
				{cart.discount_total > 0 && <div className="column is-7">{text.discount}</div>}
				{cart.discount_total > 0 && (
					<div className="column is-5 has-text-right price">{helper.formatCurrency(cart.discount_total, settings)}</div>
				)} */}
				<Divider />
				<Box className={classes.price_box}>
					<p>{text.grandTotal}</p>
					<p className={classes.price_value}>{helper.formatCurrency(cart.grand_total, settings)}</p>
				</Box>
				{/* <div className="column is-6 total-text">{text.grandTotal}</div>
				<div className="column is-6 total-price">{helper.formatCurrency(cart.grand_total, settings)}</div> */}
			</Card>
		);
	}
	return null;
};

export default withStyles(styles)(TotalPriceCard);
