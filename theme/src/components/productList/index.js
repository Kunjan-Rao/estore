import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import ProductCard from './productCard';
import LoadMore from './loadMore';
import { Grid, Tooltip, Backdrop, CircularProgress } from '@material-ui/core';

const ProductList = ({
	products,
	addCartItem,
	settings,
	loadMoreProducts,
	hasMore,
	loadingProducts,
	loadingMoreProducts,
	isCentered,
}) => {
	const items = products
		? products.map((product) => (
				<Grid key={product.id} item xs={6} sm={4} md={3} xl={2}>
					<Tooltip title={product.name}>
						<ProductCard key={product.id} product={product} addCartItem={addCartItem} settings={settings} />
					</Tooltip>
				</Grid>
		  ))
		: null;

	return (
		<Grid container spacing={2}>
			{items}
			<Backdrop open={loadingProducts || false} style={{ color: 'red', zIndex: 999 }}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Grid>
	);
};

export default ProductList;
