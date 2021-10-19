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

export default class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1,
		};

		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	onOptionChange(optionSlug) {
		console.log(optionSlug);
		// let { selectedOptions } = this.state;

		// if (valueId === '') {
		// 	delete selectedOptions[optionId];
		// } else {
		// 	selectedOptions[optionId] = valueId;
		// }

		// this.setState({ selectedOptions });
		// this.findVariantBySelectedOptions();
		// this.checkSelectedOptions();
	}

	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(
				(variantOption) => selectedOptions[variantOption.option_id] === variantOption.value_id
			);
			if (variantMutchSelectedOptions) {
				this.setState({ selectedVariant: variant });
				return;
			}
		}

		this.setState({ selectedVariant: null });
	}

	setQuantity = (quantity) => {
		this.setState({ quantity });
	};

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		let item = {
			id: product._id,
			sku: product.sku,
			quantity: quantity,
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}
		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;

		const allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	render() {
		const { product, settings, categories } = this.props;
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity = product.available_quantity;
		if (product) {
			const { length, width, weight, height } = get(product, 'dimensions.product');
			const measurement = [
				`Dimensions: ${length}x${width}x${height} cm`,
				`Weight: ${weight}kg`,
				`EAN: ${get(product, 'ean')}`,
			];
			const features = Object.assign(
				{
					'Product Dimensions': measurement,
				},
				product.features
			);
			const images = [product.main_image];
			images.push(...product.additional_images);
			images.push(product.rollover_image);
			return (
				<Fragment>
					<Container component="section" fixed>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								{themeSettings.show_product_breadcrumbs && <Breadcrumbs product={product} categories={categories} />}
								<Gallery images={images} />
							</Grid>
							<Grid item xs={12} md={6}>
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

									{themeSettings.show_discount_countdown && product.on_sale === true && (
										<DiscountCountdown product={product} />
									)}

									<Options value={product.slug} options={product.colors} onChange={this.onOptionChange} />
									<Quantity maxQuantity={maxQuantity} onChange={this.setQuantity} />
									<AddToCartButton
										product={product}
										variant={selectedVariant}
										addCartItem={this.addToCart}
										isAllOptionsSelected={isAllOptionsSelected}
									/>
								</div>
							</Grid>
						</Grid>
					</Container>
					<Container component="section" fixed>
						<Features features={features} />
					</Container>

					<RelatedProducts
						settings={settings}
						addCartItem={this.addToCart}
						ids={product.related_product_ids}
						limit={10}
					/>
					{themeSettings.show_viewed_products && (
						<ViewedProducts
							settings={settings}
							addCartItem={this.addToCart}
							product={product}
							limit={themeSettings.limit_viewed_products || 4}
						/>
					)}
				</Fragment>
			);
		}
		return null;
	}
}
