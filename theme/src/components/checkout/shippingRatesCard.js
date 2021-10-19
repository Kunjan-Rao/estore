import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { FormControl, FormLabel, RadioGroup, Radio, Card, FormControlLabel } from '@material-ui/core';
import { get, keys } from 'lodash';

const ShippingRatesCard = (props) => {
	const { cart, settings, onSelect } = props;
	const carrierLevels = keys(get(cart, 'shipping_methods.rate'));
	const handleChange = (event) => {
		onSelect({ carrier: event.target.value.replace(event.target.name, ''), carrier_service_level: event.target.name });
	};
	const renderCarriers = (carrierLevel) => (
		<RadioGroup
			aria-label={carrierLevel}
			name={carrierLevel}
			value={cart.carrier_service_level + cart.carrier}
			onChange={handleChange}>
			{cart.shipping_methods.rate[carrierLevel].length > 0 &&
				cart.shipping_methods.rate[carrierLevel].map((carrier) => (
					<FormControlLabel
						key={carrierLevel + carrier.carrier}
						value={carrierLevel + carrier.carrier}
						control={<Radio />}
						label={carrier.carrier + ' ' + helper.formatCurrency(carrier.rate, settings)}
					/>
				))}
		</RadioGroup>
	);
	return (
		<Card>
			{carrierLevels &&
				carrierLevels.length > 0 &&
				carrierLevels.map((carrierLevel) => (
					<FormControl component="fieldset" key={carrierLevel}>
						<FormLabel component="legend">{carrierLevel}</FormLabel>
						{renderCarriers(carrierLevel)}
					</FormControl>
				))}
		</Card>
	);
};
export default ShippingRatesCard;
