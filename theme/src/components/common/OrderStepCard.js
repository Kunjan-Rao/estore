import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckIcon from '@material-ui/icons/Check';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import StepConnector from '@material-ui/core/StepConnector';
import { Avatar, Badge, withStyles } from '@material-ui/core';
import styles from './cart-jss';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	const icons = {
		1: <PaymentIcon />,
		2: <LocalShippingIcon />,
		3: <AssignmentTurnedInIcon />,
	};

	return (
		<Badge
			overlap="circular"
			badgeContent={
				<Avatar>
					<CheckIcon />
				</Avatar>
			}>
			<Avatar ownerState={{ completed, active }} className={className}>
				{icons[String(props.icon)]}
			</Avatar>
		</Badge>
	);
}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const OrderStepCard = () => {
	return (
		<Card>
			<Stepper alternativeLabel activeStep={1} connector={<StepConnector />}>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
					</Step>
				))}
			</Stepper>
		</Card>
	);
};
export default withStyles(styles)(OrderStepCard);
