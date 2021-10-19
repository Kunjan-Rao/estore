import React from 'react';
import * as auth from 'lib/auth';

export default class Logout extends React.Component {
	componentDidMount() {
		auth.removeToken();
	}

	render() {
		return null;
	}
}
