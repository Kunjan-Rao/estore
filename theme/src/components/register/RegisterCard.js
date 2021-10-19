import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { Link, Redirect, NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import {
	FormControl,
	InputAdornment,
	FormHelperText,
	OutlinedInput,
	Card,
	IconButton,
	CardHeader,
	CardContent,
	Input,
	CardActions,
	Button,
	FormLabel,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const RegisterCard = (props) => {
	const { handleSubmit, customerProperties, cartlayerBtnInitialized } = props;
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event) => event.preventDefault();
	return (
		<Card component="form" onSubmit={handleSubmit} style={{ width: '40vw' }}>
			<CardHeader title="Welcome to Bella Eshop" subheader="Log in with email & password" />
			<CardContent>
				<FormControl fullWidth variant="outlined" required>
					<FormLabel component="legend">{'Email'}</FormLabel>
					<OutlinedInput
						required
						id="email-input"
						aria-describedby="login-email"
						inputProps={{
							'aria-label': 'email',
						}}
					/>
					<FormHelperText required id="login-email-error-text">
						email is required
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth variant="outlined" required>
					<FormLabel component="legend">{'First Name'}</FormLabel>
					<OutlinedInput
						required
						id="email-input"
						aria-describedby="login-first_name"
						inputProps={{
							'aria-label': 'first_name',
						}}
					/>
					<FormHelperText required id="login-first_name-error-text">
						first_name is required
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth variant="outlined" required>
					<FormLabel component="legend">{'Last Name'}</FormLabel>
					<OutlinedInput
						required
						id="email-input"
						aria-describedby="login-last_name"
						inputProps={{
							'aria-label': 'first_name',
						}}
					/>
					<FormHelperText required id="login-last_name-error-text">
						last_name is required
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth variant="outlined" required>
					<FormLabel component="legend">{'Password'}</FormLabel>
					<OutlinedInput
						required
						id="email-password"
						aria-describedby="login-password"
						inputProps={{
							'aria-label': 'password',
						}}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText required id="login-password-error-text">
						password is required
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth variant="outlined" required>
					<FormLabel component="legend">{'Password Confirmed'}</FormLabel>
					<OutlinedInput
						required
						id="email-password"
						aria-describedby="login-password"
						inputProps={{
							'aria-label': 'password',
						}}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText required id="login-password-error-text">
						password is required
					</FormHelperText>
				</FormControl>
			</CardContent>
			<CardActions>
				<Button fullWidth variant="contained" type="submit" color="primary">
					{text.register}
				</Button>
			</CardActions>
		</Card>
	);
};
export default RegisterCard;
