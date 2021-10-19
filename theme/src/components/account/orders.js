import React, { Fragment, useState } from 'react';
import { themeSettings, text } from '../../lib/settings';
import {
	Grid,
	FormControlLabel,
	Checkbox,
	TextField,
	ListItemIcon,
	ListItem,
	Container,
	Divider,
	ListItemText,
	Button,
	ListItemSecondaryAction,
	Paper,
	Card,
	ListItemAvatar,
	Avatar,
	withStyles,
	CardActionArea,
	Chip,
} from '@material-ui/core';
import { keys } from 'lodash';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import styles from './account-jss';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { format } from 'date-fns';
import TotalPriceCard from '../common/totalPriceCard';
import SimpleAddressCard from '../common/SimpleAddressCard';
import OrderStepCard from '../common/OrderStepCard';
const OrderHistory = (props) => {
	const { orderHistory, classes, settings } = props;
	console.log(orderHistory);
	const [detailOrder, setDetailOrder] = useState();
	const getStatusLabel = (order) => {
		return order.delivered
			? 'Delivered'
			: order.cancelled
			? 'Cancelled'
			: order.closed
			? 'Closed'
			: order.paid
			? 'Paid'
			: 'Pending';
	};
	const getStatusColor = (order) => {
		return order.delivered
			? 'success'
			: order.cancelled
			? 'success'
			: order.closed
			? 'error'
			: order.paid
			? 'info'
			: 'default';
	};
	const renderOrder = (order) => (
		<CardActionArea key={order.id} onClick={() => setDetailOrder(order)}>
			<Card className={classes.rowCard}>
				<p>{order.id}</p>
				<p>
					<Chip label={getStatusLabel(order)} color={getStatusColor(order)} />
				</p>
				<p>{format(new Date(order.date_created), 'yyyy-MM-dd')}</p>
				<p>{order.grand_total}</p>
			</Card>
		</CardActionArea>
	);
	const renderDetailOrder = (order) => (
		<>
			<OrderStepCard />
			<div>
				<p>Order ID: {order.id}</p>
				{order.date_placed && <p>Placed on: {format(new Date(order.date_placed), 'dd MMM,yyyy')}</p>}
				{order.date_delivered && <p>Delivered on: {format(new Date(order.date_delivered), 'dd MMM,yyyy')}</p>}
			</div>
			<Card>
				{order.items.map((item) => (
					<ListItem>
						<ListItemAvatar>
							<Avatar src={item.product_image.url.replace('stage', 'cdn2')} variant="square" />
						</ListItemAvatar>
						<ListItemText
							primary={`${item.name} ${item.code}`}
							secondary={
								<span className={classes.product_price}>
									{`${helper.formatCurrency(item.price, settings)} x ${item.quantity}  `}
									<span>{helper.formatCurrency(item.price_total, settings)}</span>
								</span>
							}
						/>
						<ListItemText primary={item.color} />
					</ListItem>
				))}
			</Card>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<SimpleAddressCard title="Shipping Address" address={order.shipping_address} />
						</Grid>
						<Grid item xs={12}>
							<SimpleAddressCard title="Billing Address" address={order.billing_address} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TotalPriceCard order={order} settings={settings} showShipping />
				</Grid>
			</Grid>
		</>
	);
	return (
		<Fragment>
			<ListItem ContainerComponent="div">
				<ListItemIcon>
					<LocalShippingIcon />
				</ListItemIcon>
				<ListItemText primary={'My Orders'} />
			</ListItem>

			{orderHistory && orderHistory.length > 0 ? (
				detailOrder ? (
					renderDetailOrder(detailOrder)
				) : (
					<>
						<Card elevation={0} className={classes.rowCard} style={{ backgroundColor: 'transparent' }}>
							<h5>Order #</h5>
							<h5>Status</h5>
							<h5>Date purchased</h5>
							<h5>Total</h5>
						</Card>
						{orderHistory.map(renderOrder)}
					</>
				)
			) : (
				<p>Empty</p>
			)}
		</Fragment>
	);
};

export default withStyles(styles)(OrderHistory);
