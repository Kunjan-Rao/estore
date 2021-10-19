import React, { Fragment, useState, useEffect } from 'react';
import Lscache from 'lscache';
import { Button, Grid, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { get, first, find } from 'lodash';
import ShippingRatesCard from './shippingRatesCard';
import TotalPriceCard from './totalPriceCard';
import AddressCard from '../common/AddressCard';
import AddressSelectDialog from './AddressSelectDialog';

const AddressStep = (props) => {
	const {
		getstateCodes,
		changecustomerProperties,
		onNext,
		updateCart,
		state: { cart, settings, customerProperties, addressStates },
		onPrev,
	} = props;
	const [dialogVisible, setDialogVisible] = useState(false);
	const [addressType, setAddressType] = useState('shipping');
	const handleCloseDialog = () => {
		setDialogVisible(false);
	};
	const handleOpenDialog = () => {
		setDialogVisible(true);
	};
	const handleShippingAddress = () => {
		handleOpenDialog();
		setAddressType('shipping');
	};
	const handleBillingAddress = () => {
		handleOpenDialog();
		setAddressType('billing');
	};
	const handleSelectAddress = (address) => {
		addressType === 'shipping' && updateCart({ shipping_address: address });
		addressType === 'billing' && updateCart({ billing_address: address });
	};
	const handleSameAddress = () => {
		updateCart({ billing_address: cart.shipping_address });
	};

	const handleSaveAddress = (address, deleteAddress) => {
		changecustomerProperties({
			token: Lscache.get('auth_data'),
			changeAddress: true,
			deleteAddress,
			address,
		});
	};
	const handleUpdateCarrier = (carrierData) => {
		updateCart(carrierData);
	};
	useEffect(() => {}, []);
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={8}>
				<Grid container spacing={2}>
					<h3>
						{'Shipping Address'}
						<IconButton onClick={handleShippingAddress}>
							<ImportContactsIcon />
						</IconButton>
					</h3>
					<Grid item xs={12}>
						{get(cart, 'shipping_address.id') ? (
							<AddressCard selected address={cart.shipping_address} noAction />
						) : (
							<p>No Addresses. Please Add Address</p>
						)}
					</Grid>
					<h3>
						{'Billing Address'}
						<IconButton onClick={handleBillingAddress}>
							<ImportContactsIcon />
						</IconButton>
					</h3>
					<FormControlLabel
						control={
							<Checkbox checked={cart.shipping_address.id === cart.billing_address.id} onChange={handleSameAddress} />
						}
						label="Same as shipping address"
					/>
					<Grid item xs={12}>
						{get(cart, 'billing_address.id') ? (
							<AddressCard selected address={cart.billing_address} noAction />
						) : (
							<p>No Addresses. Please Add Address</p>
						)}
					</Grid>
					<Grid item xs={12} container justifyContent="space-between" spacing={2}>
						<Grid item xs={12} md={6}>
							<Button onClick={onPrev} fullWidth variant="outlined">
								Back To Cart
							</Button>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button onClick={onNext} fullWidth variant="contained">
								Proceed To Payment
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={4}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShippingRatesCard cart={cart} settings={settings} onSelect={handleUpdateCarrier} />
					</Grid>
					<Grid item xs={12}>
						<TotalPriceCard cart={cart} settings={settings} showShipping />
					</Grid>
				</Grid>
			</Grid>
			<AddressSelectDialog
				addresses={get(customerProperties, 'customer_settings.addresses')}
				open={dialogVisible}
				onClose={handleCloseDialog}
				onSave={handleSaveAddress}
				onSelect={handleSelectAddress}
				stateCodes={addressStates}
				onSelectCountry={getstateCodes}
				onDelete={(address) => handleSaveAddress(address, true)}
			/>
		</Grid>
	);
};
export default AddressStep;
