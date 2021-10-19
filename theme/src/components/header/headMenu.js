import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Tab, Tabs } from '@material-ui/core';
import { themeSettings, text } from '../../lib/settings';
import { getCategoryName } from '../../lib/functions';

// class HeadMenuItem extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			isActive: false,
// 			anchorE1: null
// 		};
// 	}

// 	onMouseEnterHandler = event => {
// 		console.log(event.currentTarget)
// 		this.setState({
// 			anchorE1: event.currentTarget
// 		});
// 		if (!this.props.isMobile && this.props.level === 1) {
// 			this.setState({
// 				isActive: true,
// 				anchorE1: event.currentTarget
// 			});
// 		}
// 	};

// 	onMouseLeaveHandler = () => {
// 		this.setState({
// 			anchorE1: null
// 		});
// 		if (!this.props.isMobile && this.props.level === 1) {
// 			this.setState({
// 				isActive: false,
// 				anchorE1: null
// 			});
// 		}
// 	};

// 	isActiveToggle = () =>
// 		this.setState({
// 			isActive: !this.state.isActive
// 		});

// 	render() {
// 		const { categories, category, onClick, level, isMobile } = this.props;
// 		const items = categories
// 			.filter(item => item.parent_category_id === category.category_id)
// 			.map((subcategory, index) => (
// 				// <HeadMenuItem
// 				// 	key={index}
// 				// 	category={subcategory}
// 				// 	onClick={onClick}
// 				// 	categories={categories}
// 				// 	level={level + 1}
// 				// 	isMobile={isMobile}
// 				// />
// 				<MenuItem component={NavLink} to={subcategory.path}

// 				onClick={this.onMouseLeaveHandler}
// 				>
// 				{subcategory.name}
// 				</MenuItem>
// 			));
// 		const hasItems = items.length > 0;

// 		return (
// 			<li
// 				// onMouseEnter={this.onMouseEnterHandler}
// 				// onMouseOver={this.onMouseEnterHandler}
// 				// onMouseLeave={this.onMouseLeaveHandler}
// 				onClick={this.onMouseEnterHandler}
// 				// onMouseUp={this.onMouseLeaveHandler}
// 				className={
// 					(level === 2 ? 'column is-3' : '') +
// 					(this.state.isActive ? ' is-active' : '') +
// 					(hasItems ? ' has-items' : '')
// 				}
// 			>
// 				<div className="cat-parent">
// 					<NavLink
// 						activeClassName="is-active"
// 						className={hasItems ? 'has-items' : ''}
// 						to={category.path}
// 						onClick={onClick}
// 					>
// 						{getCategoryName(category.name, level)}
// 					</NavLink>
// 					{hasItems && isMobile && <span onClick={this.isActiveToggle} />}
// 				</div>
// 				<Menu
// 					anchorE1={this.state.anchorE1}
// 					keepMounted
// 					open={Boolean(this.state.anchorE1)}
// 					getContentAnchorEl={null}
// 					onClose={this.onMouseLeaveHandler}
// 					// anchorOrigin={{
// 					// 	vertical: 'bottom',
// 					// 	horizontal: 'center',
// 					// }}
// 					// transformOrigin={{
// 					// 	vertical: 'top',
// 					// 	horizontal: 'center',
// 					// }}
// 				>
// 						{items}
// 				</Menu>
// 				{/* {hasItems && (
// 					<ul
// 						className={
// 							(level === 1 ? 'columns is-gapless is-multiline' : '') +
// 							' nav-level-' +
// 							level
// 						}
// 					>
// 					</ul>
// 				)} */}
// 			</li>
// 		);
// 	}
// }

const HeadMenuItem = ({ category, categories, level }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const items = categories
		.filter((item) => item.parent_category_id === category.category_id)
		.map((subcategory, index) => (
			<MenuItem key={subcategory.id} onClick={handleClose}>
				<NavLink to={subcategory.path}>{subcategory.title || getCategoryName(subcategory.name, level)}</NavLink>
			</MenuItem>
		));
	return (
		<li>
			<Tab
				aria-controls="sub-category-menu"
				aria-haspopup="true"
				classes={{ root: 'tab-root', wrapper: 'tab-wrapper' }}
				// onMouseLeave={handleClose}
				label={category.title || getCategoryName(category.name, level)}
				onClick={handleClick}
			/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				getContentAnchorEl={null}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}>
				{items}
			</Menu>
		</li>
	);
};

export default class HeadMenu extends React.PureComponent {
	render() {
		const { categories, onClick, isMobile } = this.props;
		let addItemsToMenu = [];
		if (themeSettings.header_menu && themeSettings.header_menu.length > 0) {
			addItemsToMenu = themeSettings.header_menu.map((item) => ({
				name: item.text,
				path: item.url,
				id: item.id || '',
				parent_category_id: item.parent_category_id || null,
			}));
		}
		const menuItems = [...categories, ...addItemsToMenu];
		const items = categories
			.filter((category) => !category.parent_category_id)
			.map((category, index) => (
				<HeadMenuItem
					key={index}
					category={category}
					onClick={onClick}
					categories={categories}
					level={1}
					isMobile={isMobile}
				/>
			));

		return <ul style={{ display: 'flex', flexDirection: 'row' }}>{items}</ul>;
	}
}
