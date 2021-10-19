import React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import { Field, reduxForm } from 'redux-form';
import AuthHeader from '../../../../src/api/server/lib/auth-header';
import api from '../../../dist/lib/api';
import { themeSettings, text } from '../../lib/settings';
import OrderHistory from './orderHistory';
import Orders from './orders';
import {
	Tabs,
	Button,
	Tab,
	Paper,
	Grid,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
	Box,
	Container,
	withStyles,
} from '@material-ui/core';
import ProfileInformation from './profileInformation';
import Addresses from './addresses';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import styles from './account-jss';
import Typography from 'material-ui/styles/typography';
class AccountForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profileSection: 1,
			profileEdit: false,
			reinitialized: false,
			cartLayer: false,
		};
	}

	handleTab = (event, newValue) => {
		this.setState({ profileSection: newValue, profileEdit: false });
	};

	handleContactsEdit = () => {
		this.setState({ profileEdit: !this.state.profileEdit });
	};

	handlecustomerProperties = () => {
		this.props.customerData({
			token: Lscache.get('auth_data'),
		});
	};

	handleFormSubmit = (values) => {
		this.props.changecustomerProperties({
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			phone: values.phone,
			token: Lscache.get('auth_data'),
			history: this.props.history,
		});
	};
	handleChangeAddress = (address, deleteAddress) => {
		this.props.changecustomerProperties({
			token: Lscache.get('auth_data'),
			changeAddress: true,
			address,
			deleteAddress,
			history: this.props.history,
		});
	};

	render() {
		const {
			classes,
			state: { settings, customerProperties, addressStates },
		} = this.props;
		Lscache.flushExpired();

		if (Lscache.get('auth_data') === null && customerProperties === undefined) {
			Lscache.flush();
			return (
				<Redirect
					to={{
						pathname: '/login',
					}}
				/>
			);
		} else {
			const cacheTimeStamp = localStorage.getItem('lscache-auth_data-cacheexpiration');
			if (Number(cacheTimeStamp) <= Math.floor(new Date().getTime() / 1000)) {
				Lscache.flush();
				return (
					<Redirect
						to={{
							pathname: '/login',
						}}
					/>
				);
			}

			if (customerProperties !== undefined) {
				if (this.state.profileEdit && !this.state.reinitialized) {
					this.setInitialValues();
				}
				console.log(customerProperties);
				const renderTabPanel = (index) => {
					switch (index) {
						case 1:
							return <ProfileInformation onSave={this.handleFormSubmit} information={customerProperties} />;
						case 2:
							return (
								<Addresses
									addresses={customerProperties.customer_settings.addresses}
									onDelete={(address) => this.handleChangeAddress(address, true)}
									onSave={this.handleChangeAddress}
									stateCodes={addressStates}
									onSelectCountry={this.props.getstateCodes}
								/>
							);
						case 3:
							return <Orders orderHistory={customerProperties.order_statuses.data} settings={settings} />;
						default:
							return <div></div>;
					}
				};
				return (
					<Container component="section" fixed>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<Paper className={classes.profile_menu_card}>
									<ListItem
										classes={{ selected: classes.selected }}
										selected={this.state.profileSection === 1}
										button
										className={classes.profile_menu_item}
										onClick={() => this.setState({ profileSection: 1 })}>
										<ListItemIcon>
											<PersonIcon />
										</ListItemIcon>
										<ListItemText primary={text.profile} />
									</ListItem>
									<ListItem
										classes={{ selected: classes.selected }}
										selected={this.state.profileSection === 2}
										button
										className={classes.profile_menu_item}
										onClick={() => this.setState({ profileSection: 2 })}>
										<ListItemIcon>
											<LocationOnIcon />
										</ListItemIcon>
										<ListItemText primary={'Addresses'} />
									</ListItem>
									<ListItem
										classes={{ selected: classes.selected }}
										selected={this.state.profileSection === 3}
										button
										className={classes.profile_menu_item}
										onClick={() => this.setState({ profileSection: 3 })}>
										<ListItemIcon>
											<ShoppingBasketIcon />
										</ListItemIcon>
										<ListItemText primary={text.orders} />
										{/* <ListItemSecondaryAction>
										<span></span>
									</ListItemSecondaryAction> */}
									</ListItem>
								</Paper>
							</Grid>
							<Grid onSubmit={this.props.onSubmit} item xs={12} md={8} className={classes.panel}>
								{renderTabPanel(this.state.profileSection)}
							</Grid>
						</Grid>
					</Container>
				);
			}
			return <></>;
		}
	}
}
export default reduxForm({
	form: 'AccountForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(withStyles(styles)(AccountForm));
