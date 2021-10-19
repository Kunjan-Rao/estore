import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { text } from '../lib/settings';
import * as helper from '../lib/helper';
import { Breadcrumbs } from '@material-ui/core';

const CategoryBreadcrumbs = ({ currentCategory, categories }) => {
	const items = helper.getCategoryBreadcrumbs(currentCategory.category_id, categories);
	return (
		<Breadcrumbs aria-label="breadcrumbs">
			<NavLink to="/">{text.home}</NavLink>
			{items}
			<a href={currentCategory.path} aria-current="page">
				{currentCategory.name}
			</a>
		</Breadcrumbs>
	);
};

CategoryBreadcrumbs.propTypes = {
	currentCategory: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CategoryBreadcrumbs;
