import React, { Fragment, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { FormControl, Button, FormControlLabel, Radio, RadioGroup, Grid, FormLabel, Card } from '@material-ui/core';
import TotalPriceCard from './totalPriceCard';
import { PayPalButton } from 'react-paypal-button-v2';
import api from '../../lib/api';

const PaymentStep = (props) => {
	const {
		loadPaymentMethods,
		updateCart,
		checkout,
		state: { cart, settings, paymentMethods },
		onPrev,
	} = props;
	const [formsettings, setFormSettings] = useState(null);
	const [loading, setLoading] = useState(false);
	const fetchFormSettings = () => {
		setLoading(true);
		api.ajax.paymentFormSettings
			.retrieve()
			.then(({ status, json }) => {
				setLoading(false);
				setFormSettings(json);
			})
			.catch((e) => {
				setLoading(false);
				setFormSettings(null);
				console.log(e);
			});
	};

	useEffect(() => {
		fetchFormSettings();
	}, []);
	const handleSelect = (event) => {
		updateCart({
			payment_method_id: event.target.value,
		});
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={8}>
				<Card>
					<FormControl component="fieldset">
						<FormLabel component="legend">{'Payment Methds'}</FormLabel>
						<RadioGroup aria-label="payment-methods" defaultValue={cart.payment_method_id} onChange={handleSelect}>
							{paymentMethods.length > 0 &&
								paymentMethods.map((paymentMethod) => (
									<FormControlLabel
										key={paymentMethod.id}
										value={paymentMethod.id}
										control={<Radio />}
										label={paymentMethod.name}
									/>
								))}
						</RadioGroup>
					</FormControl>
					{formsettings && (
						<PayPalButton
							clientId={formsettings.client}
							createOrder={(data, actions) => {
								return actions.order.create({
									purchase_units: [
										{
											amount: {
												value: formsettings.amount,
												currency: formsettings.currency,
											},
										},
									],
									// application_context: {
									//   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
									// }
								});
							}}
							onApprove={(data, actions) => {
								// Capture the funds from the transaction
								return actions.order.capture().then(function (details) {
									// Show a success message to your buyer
									console.log('Transaction completed by ' + details.payer.name.given_name);
									checkout();
								});
							}}
							onButtonReady={() => this.setState({ showLoading: false })}
						/>
					)}
				</Card>
				<Button onClick={onPrev} fullWidth variant="outlined">
					Back To Check Details
				</Button>
				<Button onClick={checkout} fullWidth variant="contained">
					Checkout
				</Button>
			</Grid>
			<Grid item xs={12} md={4}>
				<Card>
					<TotalPriceCard cart={cart} settings={settings} showShipping />
				</Card>
			</Grid>
		</Grid>
	);
};
export default PaymentStep;
