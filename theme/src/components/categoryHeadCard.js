import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from './common/sort';
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs';
import * as helper from '../lib/helper';
import { Container, Card, Hidden, Grid } from '@material-ui/core';

const CategoryHeadCard = ({ categoryDetails, categories, settings, setSort, productFilter }) => {
	return (
		<Card>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					{themeSettings.show_category_breadcrumbs && (
						<CategoryBreadcrumbs currentCategory={categoryDetails} categories={categories} />
					)}
					<h1 className="category-title">{categoryDetails.name}</h1>
					<div
						className="category-description is-hidden-mobile content"
						dangerouslySetInnerHTML={{ __html: categoryDetails.description }}
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<Sort defaultSort={settings.default_product_sorting} currentSort={productFilter.sort} setSort={setSort} />
				</Grid>
			</Grid>
		</Card>
	);
};

CategoryHeadCard.propTypes = {
	categoryDetails: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CategoryHeadCard;
