import React, { Fragment, useState } from 'react';
import { themeSettings, text } from '../../lib/settings';
import { Card, IconButton, withStyles, CardActions } from '@material-ui/core';
import styles from './cart-jss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { get } from 'lodash';
const AddressCard = (props) => {
	const { address, classes, onDelete, onSelect, selected, onEdit, noAction } = props;
	const handleSelect = () => {
		onSelect(address);
	};
	return (
		<Card
			elevation={2}
			key={address.id}
			variant={selected ? 'outlined' : 'elevation'}
			className={classes.rowCard}
			onClick={handleSelect}>
			<p>{address.first_name + ' ' + address.last_name}</p>
			<p className={classes.long}>
				{address.address1 +
					', ' +
					address.address2 +
					', ' +
					address.city +
					' ' +
					get(address.state, 'name') +
					' ' +
					get(address.country, 'name')}
			</p>
			<p>{address.phone}</p>
			{!noAction && (
				<CardActions>
					<IconButton size="small" onClick={() => onEdit(address)}>
						<CreateIcon fontSize="small" color="error" />
					</IconButton>
					<IconButton color="error" size="small" onClick={() => onDelete(address)}>
						<DeleteIcon fontSize="small" color="error" />
					</IconButton>
				</CardActions>
			)}
		</Card>
	);
};

export default withStyles(styles)(AddressCard);
