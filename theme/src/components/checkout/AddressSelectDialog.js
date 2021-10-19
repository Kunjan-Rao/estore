import React, { Fragment, useState } from 'react';
import { Button, Grid, Zoom, Dialog, IconButton, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddressCard from '../common/AddressCard';
import AddressEditCard from '../common/AddressEditCard';

const AddressSelectDialog = (props) => {
	const { addresses, open, stateCodes, onSelectCountry, onClose, onSave, onSelect, onDelete } = props;
	const [selectedAddress, setSelectedAddress] = useState({});
	const [edit, setEdit] = useState(false);
	const [editAddress, setEditAddress] = useState({});
	const handleOk = () => {
		if (edit) {
		} else {
			onClose();
			onSelect(selectedAddress);
			setSelectedAddress({});
		}
		setEdit(false);
	};
	const handleClose = () => {
		onClose();
		setEdit(false);
	};
	const handleAdd = () => {
		setEdit(true);
		setEditAddress({});
	};
	const handleEdit = (address) => {
		setEdit(true);
		setEditAddress(address);
	};
	const handleSave = (address) => {
		setEdit(false);
		onSave(address);
	};
	return (
		<Dialog open={open} onClose={onClose} TransitionComponent={Zoom}>
			<DialogTitle disableTypography>
				<h2>Chose the Address</h2>
				<IconButton onClick={handleAdd}>
					<AddIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{edit ? (
					<AddressEditCard
						onSelectCountry={onSelectCountry}
						stateCodes={stateCodes}
						onSubmit={handleSave}
						onClose={() => setEdit(false)}
						address={editAddress}
					/>
				) : (
					<Grid container spacing={2}>
						{addresses &&
							addresses.length > 0 &&
							addresses.map((address) => (
								<Grid item xs={12} key={address.id}>
									<AddressCard
										onSelect={setSelectedAddress}
										onEdit={handleEdit}
										onDelete={onDelete}
										selected={address === selectedAddress}
										address={address}
									/>
								</Grid>
							))}
					</Grid>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={handleOk}>
					{'OK'}
				</Button>
				<Button variant="contained" color="primary" onClick={handleClose}>
					{'Cancel'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default AddressSelectDialog;
