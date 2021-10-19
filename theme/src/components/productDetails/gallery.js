import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-image-lightbox';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lightboxIsOpen: false,
			lightboxPhotoIndex: 0,
		};
	}

	openLightbox = () => {
		this.setState({ lightboxIsOpen: true });
	};

	closeLightbox = () => {
		this.setState({ lightboxIsOpen: false });
	};

	setPhotoIndex = (index) => {
		this.setState({ lightboxPhotoIndex: index });
	};

	render() {
		const { images } = this.props;
		const { lightboxIsOpen, lightboxPhotoIndex } = this.state;
		if (images && images.length > 0) {
			const imagesArray = images.map((image) => ({
				original: image.url.replace('stage', 'cdn2'),
				thumbnail: image.url.replace('stage', 'cdn2'),
				// thumbnail: helper.getThumbnailUrl(
				// 	image.thumbnail,
				// 	themeSettings.previewThumbnailWidth
				// ).replace('stage','cdn3'),
				originalAlt: image.alt,
				thumbnailAlt: image.alt,
			}));
			const originalImages = images.map((image) => image.url);

			const showThumbnails = images.length > 1;
			// const originalImages = [
			// 	'https://cdn3.tuscanyleather.it/storage/products/69437/conversions/thumb_512.jpg',
			// 	'https://cdn1.tuscanyleather.it/storage/products/69439/conversions/thumb_512.jpg',
			// 	'https://cdn1.tuscanyleather.it/storage/products/69441/conversions/thumb_512.jpg',
			// ];
			// const showThumbnails = originalImages.length > 1;
			// const imagesArray = originalImages.map((image) => ({
			// 	original: image,
			// 	thumbnail: image,
			// 	originalAlt: 'image.alt',
			// 	thumbnailAlt: 'image.alt',
			// }));
			return (
				<Fragment>
					<ImageGallery
						items={imagesArray}
						showThumbnails={showThumbnails}
						onClick={this.openLightbox}
						lazyLoad={true}
						slideInterval={2000}
						showNav={themeSettings.product_gallery_shownav === true}
						showBullets={showThumbnails}
						showPlayButton={false}
						showFullscreenButton={false}
						slideOnThumbnailHover={true}
						thumbnailPosition={themeSettings.product_thumbnail_position}
						onSlide={this.setPhotoIndex}
						startIndex={lightboxPhotoIndex}
					/>
					{lightboxIsOpen && (
						<Lightbox
							reactModalStyle={{ overlay: { zIndex: 1099 } }}
							mainSrc={originalImages[lightboxPhotoIndex]}
							nextSrc={originalImages[(lightboxPhotoIndex + 1) % originalImages.length]}
							prevSrc={originalImages[(lightboxPhotoIndex + originalImages.length - 1) % originalImages.length]}
							onCloseRequest={this.closeLightbox}
							onMovePrevRequest={() =>
								this.setState({
									lightboxPhotoIndex: (lightboxPhotoIndex + originalImages.length - 1) % originalImages.length,
								})
							}
							onMoveNextRequest={() =>
								this.setState({
									lightboxPhotoIndex: (lightboxPhotoIndex + 1) % originalImages.length,
								})
							}
						/>
					)}
				</Fragment>
			);
		} else {
			return <div className="large-image-placeholder" />;
		}
	}
}
