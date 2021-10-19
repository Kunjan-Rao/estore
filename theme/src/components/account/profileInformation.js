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
} from '@material-ui/core';
import { keys } from 'lodash';
import CaptionField from '../common/CaptionField';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import styles from './account-jss';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
const ProfileInformation = (props) => {
	const { information, classes, onSave } = props;
	const [editable, setEditable] = useState(false);
	const [info, setInfo] = useState(information.customer_settings);
	const handleChange = (event) => {
		setInfo({ ...info, [event.target.name]: event.target.value });
	};
	const handleSave = () => {
		onSave(info);
		setEditable(false);
	};
	const render = () => {
		return !editable ? (
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Card>
						<ListItem ContainerComponent="div">
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText primary={info.first_name + ' ' + info.last_name} />
						</ListItem>
					</Card>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Card>
								<h3>{information.order_statuses.total_count}</h3>
								<small>All orders</small>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={12}>
					<Card>
						<Grid container spacing={2}>
							<Grid item>
								<CaptionField label={'Full Name'} text={info.first_name + ' ' + info.last_name} />
							</Grid>
							<Grid item>
								<CaptionField label={'Email'} text={info.email} />
							</Grid>
							<Grid item></Grid>
							<Grid item>
								<CaptionField label={text.phone} text={info.phone} />
							</Grid>
							<Grid item>
								<CaptionField label={'Birth Date'} text={info.birthdate} />
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
		) : (
			<Card component="form" onSubmit={handleSave} className={classes.edit_card}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							variant="outlined"
							required
							name="first_name"
							variant="outlined"
							id="customer.first_name"
							type="text"
							onChange={handleChange}
							label={text.first_name}
							value={info.first_name}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							variant="outlined"
							required
							name="last_name"
							variant="outlined"
							id="customer.last_name"
							type="text"
							onChange={handleChange}
							label={text.last_name}
							value={info.last_name}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							variant="outlined"
							required
							name="email"
							variant="outlined"
							id="customer.email"
							type="text"
							onChange={handleChange}
							label={text.email}
							value={info.email}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							variant="outlined"
							name="phone"
							variant="outlined"
							id="customer.phone"
							type="text"
							onChange={handleChange}
							label={text.phone}
							value={info.phone}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <MuiPickersUtilsProvider>
						<KeyboardDatePicker
							disableToolbar
							variant="outlined"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Date picker inline"
							//   value={selectedDate}
							//   onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/></MuiPickersUtilsProvider> */}
					</Grid>
				</Grid>
				<Button onClick={handleSave} variant="contained">
					Save Changes
				</Button>
			</Card>
		);
	};
	return (
		<Fragment>
			<ListItem ContainerComponent="div">
				<ListItemIcon>
					<PersonOutlineIcon />
				</ListItemIcon>
				<ListItemText primary={text.account_profile_headline} />
				<ListItemSecondaryAction>
					<Button variant="outlined" onClick={() => setEditable(!editable)}>
						{editable ? 'Back To Profile' : 'Edit Profile'}
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
			{render()}
		</Fragment>
	);
};

export default withStyles(styles)(ProfileInformation);
