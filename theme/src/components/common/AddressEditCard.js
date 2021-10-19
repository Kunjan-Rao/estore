import React, { Fragment, useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import {
	TextField,
	IconButton,
	Grid,
	CardContent,
	Card,
	ListItem,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	ListItemText,
	Checkbox,
	CardActions,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import country_codes from '../../../../data/country_code.json';
import { get } from 'lodash';
import CaptionField from './CaptionField';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import InputField from './inputField';
import SelectField from './SelectField';
import RadiosField from './RadiosField';
const validateEmail = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const validateRequired = (value) => (value && value.length > 0 ? undefined : text.required);

const AddressEditCard = (props) => {
	const { title, address, handleSubmit, stateCodes, classes, onClose, initialize, onSelectCountry } = props;
	console.log(stateCodes);
	const handleSelectCountry = (value) => {
		onSelectCountry(value.code);
	};
	useEffect(() => {
		const type = address.default_billing ? 'billing' : address.default_shipping ? 'shipping' : 'other';
		initialize({ ...address, type });
	}, []);
	const renderAddressEdit = () => (
		<Grid spacing={2} container>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					variant="outlined"
					required
					name="first_name"
					id="first_name"
					type="text"
					fullWidth
					validate={validateRequired}
					label={'First Name'}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					fullWidth
					variant="outlined"
					required
					name="last_name"
					id="last_name"
					type="text"
					label={'Last Name'}
					validate={validateRequired}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					required
					variant="outlined"
					fullWidth
					name="email"
					id="email"
					autoComplete="new-password"
					type="email"
					label={'Email'}
					validate={validateRequired}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					variant="outlined"
					required
					fullWidth
					name="phone"
					id="phone"
					type="tel"
					validate={validateRequired}
					label={'Phone'}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					fullWidth
					variant="outlined"
					required
					name="address1"
					id="address1"
					type="text"
					label={'Address1'}
					validate={validateRequired}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					variant="outlined"
					fullWidth
					name="address2"
					id="address2"
					type="text"
					label={'Address2'}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field component={SelectField} required id="state" options={stateCodes} name="state" label={'State'} />
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={SelectField}
					id="country"
					required
					options={country_codes}
					onSelectChange={handleSelectCountry}
					// validate={validateRequired}
					name="country"
					label={'Country'}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field
					component={InputField}
					variant="outlined"
					fullWidth
					name="postal_code"
					id="postal_code"
					label={'Postal Code'}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Field component={InputField} variant="outlined" fullWidth name="city" id="city" type="text" label={'City'} />
			</Grid>
			<Grid item xs={12}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Type</FormLabel>
					<Field component={RadiosField} aria-label="type" name="type">
						<FormControlLabel value="shipping" control={<Radio />} label="Default to Shipping Address" />
						<FormControlLabel value="billing" control={<Radio />} label="Default to Billing Address" />
						<FormControlLabel value="other" control={<Radio />} label="No Default" />
					</Field>
				</FormControl>
			</Grid>
		</Grid>
	);
	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardActions>
					<IconButton type="submit">
						<SaveIcon />
					</IconButton>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
					{title && <ListItemText primary={title} />}
					{/* {editable ? (
					<IconButton onClick={handleSave} type="submit">
						<SaveIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => setEditable(true)}>
						<EditIcon />
					</IconButton>
				)} */}
				</CardActions>
				{renderAddressEdit()}
			</Card>
		</form>
	);
};

export default reduxForm({
	form: 'AddressEditCard',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(AddressEditCard);
