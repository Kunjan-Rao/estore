import React from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { Card, CardHeader, Button, OutlinedInput, TextField } from '@material-ui/core';

const validateRequired = (value) => (value && value.length > 0 ? undefined : text.required);

const validateEmail = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const InputField = ({ meta: { touched, error }, input, ...rest }) => (
	<TextField fullwidth {...rest} {...input} error={touched && Boolean(error)} />
);

const initialData = {
	status: false,
	isRightToken: null,
	isCustomerSaved: null,
};

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comparePassword: '',
		};
	}

	passwordTemp = (value) => {
		this.setState({ comparePassword: value.currentTarget.defaultValue });
	};

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
		if (fieldName === 'password_verify') {
			validatorsArray.push(this.confirmPassword);
		}

		return validatorsArray;
	};

	confirmPassword = (value) => {
		if (value !== this.state.comparePassword) {
			return text.password_verify_failed;
		}
		return undefined;
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
				case 'first_name':
					return text.first_name;
					break;
				case 'last_name':
					return text.last_name;
					break;
				case 'email':
					return text.email;
					break;
				case 'password':
					return text.password;
					break;
				case 'password_verify':
					return text.password_verify;
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
		let { handleSubmit, registerProperties } = this.props;

		registerProperties = registerProperties === undefined ? initialData : registerProperties;

		const registerButtonClassName = 'account-button button';
		const inputClassName = 'login-input-field';
		const titleClassName = 'login-title';
		const successAlertText = 'success-alert-text';
		const errorAlertText = 'error-alert-text';
		const loginButtonClass = 'account-button button';
		return (
			<div className="login-container">
				<form onSubmit={handleSubmit} className="login-form">
					<Card>
						<CardHeader title={<h2>{text.register_title}</h2>} />
						{!registerProperties.status &&
						!registerProperties.isCustomerSaved &&
						registerProperties.isCustomerSaved !== null &&
						registerProperties.isRightToken ? (
							<p className={errorAlertText}>{text.registry_failed}</p>
						) : (
							''
						)}
						{registerProperties.status ? <p className={successAlertText}>{text.registry_doi_success}</p> : ''}
						{registerProperties.isCustomerSaved ? <p className={successAlertText}>{text.registry_completed}</p> : ''}
						{!registerProperties.isRightToken && registerProperties.isRightToken !== null ? (
							<p className={errorAlertText}>{text.registry_wrong_token}</p>
						) : (
							''
						)}
						{!registerProperties.isCustomerSaved && (
							<Field
								name="first_name"
								id="customer.first_name"
								component={InputField}
								type="text"
								fullWidth
								props={registerProperties !== undefined && registerProperties.status ? { disabled: true } : this.value}
								label={this.getFieldLabel('first_name')}
								validate={this.getFieldValidators('first_name')}
								placeholder={this.getFieldPlaceholder('first_name')}
							/>
						)}

						{!registerProperties.isCustomerSaved && (
							<Field
								name="last_name"
								id="customer.last_name"
								component={InputField}
								type="text"
								fullWidth
								props={registerProperties !== undefined && registerProperties.status ? { disabled: true } : this.value}
								label={this.getFieldLabel('last_name')}
								validate={this.getFieldValidators('last_name')}
								placeholder={this.getFieldPlaceholder('last_name')}
							/>
						)}

						{!registerProperties.isCustomerSaved && (
							<Field
								name="email"
								id="customer.reg_email"
								component={InputField}
								fullWidth
								type="email"
								props={registerProperties !== undefined && registerProperties.status ? { disabled: true } : this.value}
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>
						)}

						{!registerProperties.isCustomerSaved && (
							<Field
								name="password"
								id="customer.reg_password"
								component={InputField}
								fullWidth
								type="password"
								props={registerProperties !== undefined && registerProperties.status ? { disabled: true } : this.value}
								label={this.getFieldLabel('password')}
								onBlur={this.passwordTemp}
								validate={this.getFieldValidators('password')}
								placeholder={this.getFieldPlaceholder('password')}
							/>
						)}

						{!registerProperties.isCustomerSaved && (
							<Field
								name="password_verify"
								id="customer.reg_password_verify"
								component={InputField}
								fullWidth
								type="password"
								props={registerProperties !== undefined && registerProperties.status ? { disabled: true } : this.value}
								label={this.getFieldLabel('password_verify')}
								validate={this.getFieldValidators('password_verify')}
								placeholder={this.getFieldPlaceholder('password_verify')}
							/>
						)}

						<div className="login-button-wrap">
							{!registerProperties.isCustomerSaved && (
								<Button
									variant="contained"
									type="submit"
									className={registerButtonClassName}
									disabled={registerProperties !== undefined && registerProperties.status}>
									{text.register}
								</Button>
							)}
							{registerProperties.isCustomerSaved && (
								<Link to="/login" style={{ textDecoration: 'none' }} key={'back-to-login'} className={loginButtonClass}>
									{text.back_to_login}
								</Link>
							)}
						</div>
					</Card>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'Register',
})(Register);
