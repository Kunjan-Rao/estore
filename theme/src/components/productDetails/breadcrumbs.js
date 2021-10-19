import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { Breadcrumbs } from '@material-ui/core';

const ProductBreadcrumbs = ({ product, categories }) => {
	const items = helper.getProductBreadcrumbs(product, categories);
	return (
		<Breadcrumbs>
			<NavLink to="/">{text.home}</NavLink>
			{items}
		</Breadcrumbs>
	);
};

export default ProductBreadcrumbs;
