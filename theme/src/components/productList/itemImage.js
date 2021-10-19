import React, { Fragment, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const ItemImage = ({ image, rolloverImage, productName, height }) => {
	const [loaded, setLoaded] = useState(false);
	// if (images && images.length > 0) {
	// const image = images[0];
	// const imageUrl = helper.getThumbnailUrl(
	// 	image.url,
	// 	themeSettings.listThumbnailWidth
	// );
	const imageUrl = image.url;
	const alt = image.alt && image.alt.length > 0 ? image.alt : productName;
	const handleLoad = () => {
		setLoaded(true);
	};

	return (
		<Fragment>
			{!loaded && <Skeleton variant="rect" width={'100%'} height={118} />}
			<CardMedia
				src={imageUrl.replace('stage', 'cdn2')}
				style={{ display: loaded ? 'block' : 'none' }}
				component="img"
				onLoad={handleLoad}
			/>
		</Fragment>
	);
};

export default ItemImage;
