import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import * as helper from '../../lib/helper';
import {
	Button,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	IconButton,
	ListItemSecondaryAction,
	Drawer,
	Grid,
	withStyles,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styles from './header-jss';
const CartItem = ({ item, deleteCartItem, settings, classes }) => {
	const thumbnail = helper.getThumbnailUrl(item.product_image, themeSettings.cartThumbnailWidth);
	const price = item.prices.list.special || item.prices.list.default;
	return (
		<ListItem divider className={classes.cart_item}>
			<ListItemAvatar>
				<NavLink to={item.path || ''}>
					<Avatar variant="rounded" src={thumbnail.replace('stage', 'cdn2')} />
				</NavLink>
			</ListItemAvatar>
			<ListItemText
				primary={<h5>{item.name + ' ' + item.code}</h5>}
				secondary={
					<div>
						<small>{`${helper.formatCurrency(price, settings)} x ${item.quantity}  `}</small>
						<span>{helper.formatCurrency(item.price_total, settings)}</span>
					</div>
				}
			/>
			{/* <ListItemSecondaryAction> */}
			<IconButton onClick={() => deleteCartItem(item.id)}>
				<CancelIcon />
			</IconButton>
			{/* </ListItemSecondaryAction> */}
		</ListItem>
	);
};

export default withStyles(styles)(CartItem);
