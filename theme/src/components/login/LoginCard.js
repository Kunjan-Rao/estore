import React, { useState } from 'react';
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
	FormLabel,
	CardContent,
	Input,
	CardActions,
	Button,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const LoginCard = (props) => {
	const { handleSubmit, customerProperties, cartlayerBtnInitialized } = props;
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event) => event.preventDefault();
	return (
		<Card component="form" onSubmit={handleSubmit} style={{ width: '40vw' }}>
			<CardHeader title="Welcome to Bella Eshop" subheader="Log in with email & password" />
			<CardContent>
				<FormControl fullWidth component="fieldset" variant="outlined" required>
					<FormLabel component="legend">{'Email'}</FormLabel>
					<OutlinedInput
						required
						id="email-input"
						placeholder="example@email.com"
						aria-describedby="login-email"
						inputProps={{
							'aria-label': 'email',
						}}
					/>
					<FormHelperText required id="login-email-error-text">
						email is required
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth component="fieldset" variant="outlined" required>
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
			</CardContent>
			<CardActions>
				<Button fullWidth variant="contained" type="submit" color="primary">
					{text.login}
				</Button>
				<div>
					Don’t have account?
					<NavLink to="/register">{text.register}</NavLink>
				</div>
			</CardActions>
		</Card>
	);
};
export default LoginCard;
