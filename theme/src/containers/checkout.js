import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MetaTags from '../components/metaTags';
import CartStep from '../components/checkout/cartStep';
import { Grid, Stepper, Step, StepButton, StepLabel, Container } from '@material-ui/core';
import AddressStep from '../components/checkout/addressStep';
import Lscache from 'lscache';
import PaymentStep from '../components/checkout/paymentStep';
const CheckoutContainer = (props) => {
	const {
		state: { pageDetails },
		loadShippingMethods,
		loadPaymentMethods,
		customerData,
		cartLayerInitialized,
		preCheckCart,
	} = props;
	useEffect(() => {
		loadShippingMethods();
		loadPaymentMethods();
		preCheckCart();
		customerData({
			token: Lscache.get('auth_data'),
		});
		({
			cartlayerBtnInitialized: false,
		});
	}, []);
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Cart', 'Address', 'Checkout', 'Review'];
	const handleCartNext = () => {
		setActiveStep(1);
	};
	const renderStep = () => {
		switch (activeStep) {
			case 1:
				return <AddressStep {...props} onPrev={() => setActiveStep(0)} onNext={() => setActiveStep(2)} />;
			case 2:
				return <PaymentStep {...props} onPrev={() => setActiveStep(1)} />;
			default:
				return <CartStep {...props} onNext={handleCartNext} />;
		}
	};
	return (
		<Fragment>
			<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>
			<Container component="section">
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label}>
							<StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
						</Step>
					))}
				</Stepper>
				{renderStep()}
			</Container>
		</Fragment>
	);
};

CheckoutContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({}),
	}).isRequired,
};

export default CheckoutContainer;
