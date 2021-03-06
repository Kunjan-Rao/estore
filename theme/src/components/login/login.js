import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { Link, Redirect, NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import { TextField, IconButton, InputAdornment, OutlinedInput, Card, Button, CardHeader } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const validateRequired = (value) => (value && value.length > 0 ? undefined : text.required);

const validateEmail = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};

const InputField = ({ meta: { touched, error }, input, ...rest }) => (
	<TextField {...rest} {...input} error={touched && Boolean(error)} />
);

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			unauthorized: false,
		};
	}

	verifyAuth() {
		this.setState({ unauthorized: true });
	}

	getField = (fieldName) => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find((item) => item.name === fieldName);
		return field;
	};

	getFieldStatus = (fieldName) => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = (fieldName) => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	isFieldHidden = (fieldName) => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	getFieldValidators = (fieldName) => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}

		return validatorsArray;
	};

	getFieldPlaceholder = (fieldName) => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : '';
	};

	getFieldLabelText = (fieldName) => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'email':
					return text.email;
					break;
				case 'password':
					return text.password;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	getFieldLabel = (fieldName) => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName) ? `${labelText} (${text.optional})` : labelText;
	};

	render() {
		const { handleSubmit, customerProperties, cartlayerBtnInitialized } = this.props;

		if (this.props.customerProperties !== undefined && Lscache.get('auth_data') !== null) {
			return (
				<Redirect
					to={{
						pathname: '/customer-account',
					}}
				/>
			);
		}

		if (this.props.customerProperties !== undefined) {
			if (!this.props.customerProperties.authenticated) {
				if (!this.state.unauthorized) {
					this.verifyAuth();
				}
			}
		}

		const loginForm =
			this.props.cartlayerBtnInitialized !== undefined && this.props.cartlayerBtnInitialized
				? 'login-form login-form login-form-with-guest'
				: 'login-form';

		return (
			<div className="login-container">
				<form onSubmit={handleSubmit} className={loginForm}>
					<Card className="login-section">
						<CardHeader title={<h2>{text.login_title}</h2>} />
						{this.props.customerProperties !== undefined && this.props.customerProperties.loggedin_failed ? (
							<p className={errorAlertText}>{text.login_failed}</p>
						) : (
							''
						)}
						{!this.isFieldHidden('email') && (
							<Field
								name="email"
								id="customer.email"
								component={InputField}
								type="email"
								fullWidth
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>
						)}

						{!this.isFieldHidden('password') && (
							<Field
								name="password"
								id="customer.password"
								component={InputField}
								fullWidth
								type="password"
								label={this.getFieldLabel('password')}
								validate={this.getFieldValidators('password')}
								placeholder={this.getFieldPlaceholder('password')}
								// endAdornment={
								// 	<InputAdornment position="end">
								// 		<IconButton
								// 			aria-label="Toggle password visibility"
								// 			// onClick={handleClickShowPassword}
								// 			// onMouseDown={handleMouseDownPassword}
								// 		>
								// 			{/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
								// 			<Visibility />
								// 		</IconButton>
								// 	</InputAdornment>
								// }
							/>
						)}
						<div className="login-link-wrap">
							<Link to="/forgot-password">{text.forgot_password}</Link>
						</div>
						<div className="login-button-wrap">
							<Button variant="contained" type="submit" fullWidth>
								{text.login}
							</Button>
						</div>

						<NavLink className="logo-image" to="/register">
							<div className="login-button-wrap">
								<Button variant="contained" type="button" fullWidth onClick={this.switchRegister}>
									{text.register}
								</Button>
							</div>
						</NavLink>
					</Card>
				</form>
			</div>
		);
	}
}
export default reduxForm({
	form: 'Login',
})(Login);
