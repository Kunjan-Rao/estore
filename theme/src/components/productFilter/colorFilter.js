import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import namedColors from '../../../locales/colornames.json';
import { Button, Grid, Tooltip, withStyles } from '@material-ui/core';
import { get } from 'lodash';
import styles from './productFilter-jss';
class AttributeValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	onChange = (event) => {
		const { attributeName, valueName, setFilterAttribute, unsetFilterAttribute } = this.props;
		const checked = event.target.checked;

		this.setState({ checked: checked });

		if (checked) {
			setFilterAttribute(attributeName, valueName);
		} else {
			unsetFilterAttribute(attributeName, valueName);
		}
	};

	render() {
		const { valueName, count } = this.props;
		const isDisabled = count === 0;
		const classChecked = this.state.checked ? 'attribute-checked' : '';
		const classDisabled = isDisabled ? 'attribute-disabled' : '';

		return (
			<label className={classChecked + ' ' + classDisabled}>
				<input type="checkbox" disabled={isDisabled} onChange={this.onChange} checked={this.state.checked} />
				{valueName}
			</label>
		);
	}
}

const AttributeSet = ({ attribute, setFilterAttribute, unsetFilterAttribute }) => {
	const values = attribute.values.map((value, index) => (
		<AttributeValue
			key={index}
			attributeName={attribute.name}
			valueName={value.name}
			checked={value.checked}
			count={value.count}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return (
		<div className="attribute">
			<div className="attribute-title">{attribute.name}</div>
			{values}
		</div>
	);
};

const ColorFilter = ({ colors, onSelect, classes }) => {
	const items = colors.map((color) => (
		<Grid item>
			<Tooltip title={color._id}>
				<Button
					key={color._id}
					style={{
						backgroundColor: get(
							namedColors.find((e) => e.name.toLowerCase().includes(color._id.toLowerCase())),
							'hex'
						),
					}}
					variant="contained"
					className={classes.color_filter_button}
					onClick={() => onSelect(color._id)}
				/>
			</Tooltip>
		</Grid>
	));

	return (
		<Grid container justifyContent="space-around" spacing={1}>
			<Grid item>
				<Button variant="contained" className={classes.color_filter_button} onClick={() => onSelect('')}>
					All
				</Button>
			</Grid>
			{items}
		</Grid>
	);
};

export default withStyles(styles)(ColorFilter);
