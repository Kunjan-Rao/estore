import React, { Fragment, useState } from 'react';
import { themeSettings, text } from '../../lib/settings';
import {
	Grid,
	TextField,
	ListItemIcon,
	ListItem,
	Container,
	ListItemText,
	Button,
	ListItemSecondaryAction,
	Card,
	IconButton,
	withStyles,
	CardActions,
} from '@material-ui/core';
import styles from './account-jss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddressEditCard from '../common/AddressEditCard';
import { get } from 'lodash';
import AddressCard from '../common/AddressCard';
const Addresses = (props) => {
	const { addresses, stateCodes, classes, onSave, onDelete, onSelectCountry } = props;
	const [editable, setEditable] = useState(!addresses || addresses.length < 1 || false);
	const [editAddress, setEditAddress] = useState({});
	const handleNewAddress = () => {
		setEditable(true);
		setEditAddress({});
	};
	const handleEditAddress = (address) => {
		setEditable(true);
		setEditAddress(address);
	};
	const handleSave = (address) => {
		setEditable(false);
		onSave(address);
	};
	const handleClose = () => {
		setEditable(false);
	};

	const renderEditAddress = (address) => (
		<AddressEditCard
			address={address}
			onClose={handleClose}
			onSelectCountry={onSelectCountry}
			stateCodes={stateCodes}
			onDelete={onDelete}
			onSubmit={handleSave}
		/>
	);
	return (
		<Fragment>
			<ListItem ContainerComponent="div">
				<ListItemIcon>
					<LocationOnIcon />
				</ListItemIcon>
				<ListItemText primary={'Addresses'} />
				<ListItemSecondaryAction>
					<Button variant="outlined" onClick={handleNewAddress}>
						{editable ? 'Back To Address' : 'Add New Address'}
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
			{editable
				? renderEditAddress(editAddress)
				: addresses.map((address) => <AddressCard onEdit={handleEditAddress} address={address} onDelete={onDelete} />)}
		</Fragment>
	);
};

export default withStyles(styles)(Addresses);
