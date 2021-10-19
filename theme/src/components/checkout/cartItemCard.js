import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import {
	ListItem,
	ListItemText,
	CardContent,
	Card,
	Grid,
	IconButton,
	Box,
	CardMedia,
	ListItemSecondaryAction,
	Button,
	ListItemIcon,
	withStyles,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styles from './cart-jss';
const CartItemCard = ({ settings, item, onUpdateQuantity, classes }) => {
	const thumbnail = helper.getThumbnailUrl(item.product_image, themeSettings.cartThumbnailWidth * 3);
	const [quantity, setQuantity] = useState(item.quantity);

	const handleIncrease = () => {
		setQuantity(quantity + 1);
		onUpdateQuantity(item.id, quantity + 1);
	};
	const handleDecrease = () => {
		setQuantity(quantity - 1);
		onUpdateQuantity(item.id, quantity - 1);
	};
	const price = item.prices.list.special || item.prices.list.default;
	return (
		<Card className={classes.product_card} key={item.id}>
			<CardMedia className={classes.product_card_image} component="img" src={thumbnail.replace('stage', 'cdn2')} />
			<CardContent className={classes.product_card_content}>
				<ListItem ContainerComponent="div">
					<ListItemText primary={`${item.name} ${item.code}`} />
					<ListItemSecondaryAction>
						<IconButton>
							<CancelIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem ContainerComponent="div">
					<ListItemText
						primary={
							<span className={classes.product_price}>
								{`${helper.formatCurrency(price, settings)} x ${item.quantity}  `}
								<span>{helper.formatCurrency(item.price_total, settings)}</span>
							</span>
						}
					/>
					<ListItemSecondaryAction>
						<IconButton
							size="small"
							variant="outlined"
							disabled={quantity === item.available_quantity}
							onClick={() => handleIncrease()}
							classes={{ root: classes.quantity_button }}>
							<AddIcon />
						</IconButton>
						<span className={classes.quantity_text}>{quantity}</span>
						<IconButton
							size="small"
							disabled={quantity === 1}
							classes={{ root: classes.quantity_button, disabled: classes.disabled }}
							variant="outlined"
							onClick={() => handleDecrease()}>
							<RemoveIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				{/* <div>
					<NavLink to={item.path || ''}>{item.name}</NavLink>
				</div> */}
				{/* <div className="qty">
					<span>{text.qty}:</span>
					<span className="select is-small">
						<select
							onChange={(e) => {
								updateCartItemQuantiry(item.id, e.target.value);
							}}
							value={item.quantity}>
							{qtyOptions}
						</select>
					</span>
				</div> */}
			</CardContent>
			{/* <ListItemAvatar className="column is-3">
				<div className="image">
					<NavLink to={item.path || ''}>
						<Avatar
							className="product-image"
							src={item.image_url.replace('stage', 'cdn2')}
							alt={item.name}
							title={item.name}
						/>
					</NavLink>
				</div>
			</ListItemAvatar> */}
			{/* <ListItemText className="column">
				<div>
					<NavLink to={item.path || ''}>{item.name}</NavLink>
				</div> */}
			{/* {item.variant_name.length > 0 && (
					<div className="cart-option-name">{item.variant_name}</div>
				)} */}
			{/* <div className="qty">
					<span>{text.qty}:</span>
					<span className="select is-small">
						<select
							onChange={(e) => {
								updateCartItemQuantiry(item.id, e.target.value);
							}}
							value={item.quantity}>
							{qtyOptions}
						</select>
					</span>
				</div>
			</ListItemText> */}
			{/* <div className="column is-3 has-text-right price">{helper.formatCurrency(item.price_total, settings)}</div> */}
		</Card>
	);
};

export default withStyles(styles)(CartItemCard);
