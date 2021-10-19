import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Chip, Tooltip } from '@material-ui/core';
import namedColors from '../../../locales/colornames.json';
import { themeSettings, text } from '../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';
import { getProductName, getColName } from '../../lib/functions';
import { get } from 'lodash';

const Item = ({
	product,
	addCartItem,
	settings,
	columnCountOnMobile = 2,
	columnCountOnTablet = 3,
	columnCountOnDesktop = 4,
	columnCountOnWidescreen = 4,
	columnCountOnFullhd = 4,
	selectProduct,
}) => {
	const columnCount = 12;

	const columnSizeOnMobile = columnCount / columnCountOnMobile;
	const columnSizeOnTablet = columnCount / columnCountOnTablet;
	const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
	const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
	const columnSizeOnFullhd = columnCount / columnCountOnFullhd;

	const imageHeight =
		themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 'auto';
	const placeholderHeight =
		themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 200;
	return (
		<div
			key={product.id}
			// onClick={() => console.log(product)}
			className={`column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${product.stock_status}`}>
			<NavLink to={product.path || ''}>
				<figure className="image" style={{ height: imageHeight }}>
					<ItemTags tags={product.tags} />
					<ItemImage
						image={product.main_image}
						rolloverImage={product.rollover_image}
						productName={product.name}
						height={placeholderHeight}
					/>
				</figure>
				<div className="content product-caption">
					<Grid container justifyContent="center">
						{product.colors.map((color) => (
							<Tooltip title={color.color}>
								<Chip
									style={{
										backgroundColor: get(
											namedColors.find((e) => e.name.toLowerCase().includes(color.color.toLowerCase())),
											'hex'
										),
									}}
								/>
							</Tooltip>
						))}
					</Grid>
					<div className="product-col">
						{getColName(product.name)}
						<span>{product.product_code}</span>
					</div>
					<div className="product-name">{getProductName(product.name)}</div>
					<ItemPrice product={product} settings={settings} />
				</div>
			</NavLink>
		</div>
	);
};

export default Item;
