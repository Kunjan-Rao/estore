import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { get } from 'lodash';

const CartIcon = ({ cartIsActive }) => {
	if (!cartIsActive) {
		return <ShoppingCartIcon />;
	}
	return <CloseIcon />;
};
export default class CartIndicator extends React.PureComponent {
	render() {
		const { cart, cartIsActive } = this.props;
		let itemsCount = 0;
		if (cart && cart.items && cart.items.length > 0) {
			cart.items.forEach((item) => (itemsCount += item.quantity));
		}
		return (
			<Badge color="primary" badgeContent={itemsCount} invisible={!itemsCount > 0}>
				<CartIcon cartIsActive={cartIsActive} />
			</Badge>
		);
	}
}
