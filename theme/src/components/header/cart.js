import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import * as helper from '../../lib/helper';
import { Button, List, Drawer, Grid, withStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styles from './header-jss';
import CartItem from './cartItem';

const Cart = (props) => {
	const { cart, deleteCartItem, settings, cartToggle, anchor, onClose, open, classes } = props;
	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(
			(item) =>
				item && (
					<CartItem key={item.id} item={item} deleteCartItem={deleteCartItem} settings={settings} key={item.path} />
				)
		);
		return (
			<Drawer open={open} anchor={anchor} onClose={onClose} classes={{ paper: classes.cartRoot }}>
				<List className={classes.cartList}>{items}</List>
				<Grid container justifyContent="space-between">
					<Grid item>
						<b>{text.subtotal}</b>
					</Grid>
					<Grid item>
						<b>{helper.formatCurrency(cart.sub_total, settings)}</b>
					</Grid>
				</Grid>
				<NavLink
					// className="button is-primary is-fullwidth has-text-centered"
					to={{
						pathname: Lscache.get('auth_data') !== null ? '/checkout' : '/login',
						state: { cartLayer: true },
					}}
					onClick={cartToggle}>
					<Button variant="contained" color="primary" fullWidth>
						{text.proceedToCheckout}
					</Button>
					{/* <Button
						variant="outlined"
						color="primary"
						classes={{ root: 'fullwidth-button' }}>
						{'Checkout Now'}
					</Button> */}
				</NavLink>
			</Drawer>
		);
	}
	return (
		<div className="mini-cart">
			<p>{text.cartEmpty}</p>
		</div>
	);
};
export default withStyles(styles)(Cart);
