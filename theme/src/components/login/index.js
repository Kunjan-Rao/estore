import React from 'react';
import AuthHeader from '../../../../src/api/server/lib/auth-header';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import Login from './login';
import LoginCard from './LoginCard';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleFormSubmit = (values) => {
		let cartLayer = false;
		if (this.props.location !== undefined && this.props.location.state !== undefined) {
			if (this.props.location.state.cartLayer && Lscache.get('auth_data') === null) {
				cartLayer = true;
			}
		}

		this.props.loginUser({
			email: values.email,
			password: AuthHeader.encodeUserPassword(values.password),
			history: this.props.history,
			cartLayer: cartLayer,
		});
	};

	render() {
		const { settings, customerProperties, cartlayerBtnInitialized } = this.props.state;

		return (
			<Login
				settings={settings}
				customerProperties={customerProperties}
				cartlayerBtnInitialized={cartlayerBtnInitialized}
				onSubmit={this.handleFormSubmit}
			/>
		);
	}
}
