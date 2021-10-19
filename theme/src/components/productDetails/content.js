import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { get } from 'lodash';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import ViewedProducts from '../products/viewed';
import Breadcrumbs from './breadcrumbs';
import DiscountCountdown from './discountCountdown';
import AddToCartButton from './addToCartButton';
import Attributes from './attributes';
import Gallery from './gallery';
import Options from './options';
import Price from './price';
import Quantity from './quantity';
import RelatedProducts from './relatedProducts';
import Tags from './tags';
import Features from './features';
import { getProductName, getColName } from '../../lib/functions';
import Name from './name';
import { Container, Grid, Tabs, AppBar, Tab } from '@material-ui/core';

const ProductContent = ({ product, settings }) => {
	return (
		<div className="content">
			<Tags tags={product.tags} />
			<h1 className="title is-4 product-col">
				{getColName(product.name)} <span>{product.product_code}</span>
			</h1>
			<h1 className="title is-4 product-name">{getProductName(product.name)}</h1>
			<Price
				product={product}
				variant={selectedVariant}
				isAllOptionsSelected={isAllOptionsSelected}
				settings={settings}
			/>

			{themeSettings.show_discount_countdown && product.on_sale === true && <DiscountCountdown product={product} />}

			<Options value={product.slug} options={product.colors} onChange={this.onOptionChange} />
			<Quantity maxQuantity={maxQuantity} onChange={this.setQuantity} />
			<AddToCartButton product={product} addCartItem={this.addToCart} isAllOptionsSelected={isAllOptionsSelected} />
		</div>
	);
};
export default ProductContent;
