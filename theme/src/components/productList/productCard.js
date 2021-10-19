import React from 'react';
import * as helper from '../../lib/helper';
import { NavLink } from 'react-router-dom';
import { Grid, Chip, Tooltip, Card, CardActionArea, CardMedia, CardContent, withStyles } from '@material-ui/core';
import namedColors from '../../../locales/colornames.json';
import { themeSettings, text } from '../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';
import { getProductName, getColName } from '../../lib/functions';
import { get } from 'lodash';
import styles from './productList-jss';
const ProductCard = ({ product, addCartItem, settings, selectProduct, classes }) => {
	const imageHeight =
		themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 'auto';
	const placeholderHeight =
		themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 200;
	return (
		<NavLink to={product.path || ''}>
			<Card
				key={product.id}
				className={classes.product_card}
				// component={NavLink}
			>
				<CardActionArea component="figure">
					<Tooltip title={product.name}>
						<ItemImage
							image={product.main_image}
							rolloverImage={product.rollover_image}
							productName={product.name}
							height={placeholderHeight}
						/>
					</Tooltip>
				</CardActionArea>
				<CardContent>
					<Grid container justifyContent="center" spacing={1}>
						{product.colors.map((color) => (
							<Tooltip title={color.color}>
								<Chip
									style={{
										backgroundColor: helper.getColorHex(color.color),
									}}
								/>
							</Tooltip>
						))}
					</Grid>
					<div>
						<h2>
							{getColName(product.name)}
							<span>{product.product_code}</span>
						</h2>
						<p>{getProductName(product.name)}</p>
					</div>
					<ItemPrice product={product} settings={settings} />
				</CardContent>
			</Card>
		</NavLink>
	);
};

export default withStyles(styles)(ProductCard);
