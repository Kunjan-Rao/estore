import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import CartItemCard from './cartItemCard';
import TotalPriceCard from './totalPriceCard';

const CartStep = (props) => {
	const {
		updateCartItemQuantiry,
		state: { cart, settings },
		onNext,
	} = props;
	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(
			(item) =>
				item && <CartItemCard key={item.id} item={item} onUpdateQuantity={updateCartItemQuantiry} settings={settings} />
		);
		return (
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					{items}
				</Grid>
				<Grid item xs={12} md={4}>
					<TotalPriceCard cart={cart} settings={settings} />
					<Button onClick={onNext} fullWidth variant="contained">
						Checkout Now
					</Button>
				</Grid>
			</Grid>
		);
	}
	return null;
};

CartStep.propTypes = {
	updateCartItemQuantiry: PropTypes.func.isRequired,
	state: PropTypes.shape({
		cart: PropTypes.shape({}),
		settings: PropTypes.shape({}).isRequired,
	}).isRequired,
};

export default CartStep;
