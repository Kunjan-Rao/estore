import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from '../components/common/sort';
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs';
import * as helper from '../lib/helper';
import { Container, Card, Hidden, Grid } from '@material-ui/core';
import CategoryHeadCard from '../components/categoryHeadCard';

const getFilterAttributesSummary = (productFilter) => {
	let attributesSummary = '';
	if (productFilter.attributes) {
		Object.keys(productFilter.attributes).forEach((attributeKey) => {
			const attributeName = attributeKey.replace('attributes.', '');
			const attributeValue = productFilter.attributes[attributeKey];
			const attributeValueFormatted = Array.isArray(attributeValue) ? attributeValue.join(', ') : attributeValue;
			attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`;
		});
	}
	return attributesSummary;
};

const getFilterPriceSummary = (productFilter, settings) => {
	let priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		const priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`;
	}
	return priceSummary;
};

const CategoryContainer = (props) => {
	const {
		setSort,
		addCartItem,
		loadMoreProducts,
		getJSONLD,
		state,
		state: {
			products,
			categoryDetails,
			settings,
			productFilter,
			productsHasMore,
			categories,
			loadingProducts,
			loadingMoreProducts,
		},
	} = props;
	const filterAttributesSummary = getFilterAttributesSummary(productFilter);
	const filterPriceSummary = getFilterPriceSummary(productFilter, settings);
	const pageTitle =
		categoryDetails.meta_title && categoryDetails.meta_title.length > 0
			? categoryDetails.meta_title
			: categoryDetails.name;
	const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`;

	const jsonld = getJSONLD(state);

	const showFilter = themeSettings.show_product_filter;

	return (
		<Fragment>
			<MetaTags
				title={title}
				description={categoryDetails.meta_description}
				canonicalUrl={categoryDetails.url}
				imageUrl={categoryDetails.image}
				ogType="product.group"
				ogTitle={categoryDetails.name}
				ogDescription={categoryDetails.meta_description}
				jsonld={jsonld}
			/>
			<Container fixed component="section">
				<CategoryHeadCard
					settings={settings}
					productFilter={productFilter}
					setSort={setSort}
					categoryDetails={categoryDetails}
					categories={categories}
				/>
			</Container>
			<Container fixed component="section">
				<Grid container spacing={2}>
					{showFilter && (
						<Hidden smDown>
							<Grid item xs={12} md={3}>
								<ProductFilter {...props} />
							</Grid>
						</Hidden>
					)}
					<Grid item xs={12} md={9}>
						<ProductList
							products={products}
							addCartItem={addCartItem}
							settings={settings}
							loadMoreProducts={loadMoreProducts}
							hasMore={productsHasMore}
							loadingProducts={loadingProducts}
							loadingMoreProducts={loadingMoreProducts}
						/>
					</Grid>
				</Grid>
			</Container>
		</Fragment>
	);
};

CategoryContainer.propTypes = {
	setSort: PropTypes.func.isRequired,
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	getJSONLD: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool,
		categoryDetails: PropTypes.shape({}),
		categories: PropTypes.arrayOf(PropTypes.shape({})),
		loadingProducts: PropTypes.bool,
		loadingMoreProducts: PropTypes.bool,
	}).isRequired,
};

export default CategoryContainer;
