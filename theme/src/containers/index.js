import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import CustomProducts from '../components/products/custom';
import HomeSlider from '../components/homeSlider';

const IndexContainer = (props) => {
	const {
		addCartItem,
		state: { pageDetails, settings, countries },
	} = props;
	const home_slider = [
		{
			image: 'https://cdn1.tuscanyleather.it/storage/media/cms/75053/tuscany-leather-summer-sale-142078.jpg',
			desc: '<p>Discount up to <b>60%</b> off!</p>',
			title: 'SUMMER SALE',
		},
		{
			image: 'https://cdn1.tuscanyleather.it/storage/media/cms/70326/tuscany-leather-brian-man-collection.jpg',
			title: 'Just for Him',
			desc: 'Men Collection',
		},
		{
			image: 'https://cdn1.tuscanyleather.it/storage/media/cms/63815/tuscany-leather-corporate-gift-2020.jpg',
			title: 'Corporate Sale',
			desc: 'Inside your business',
		},
		{
			image: 'https://cdn1.tuscanyleather.it/storage/media/cms/75035/tuscany-leather-tlbag-142147.jpg',
			title: 'A New Season',
			desc: 'Of Bella Beauty',
		},
	];
	return (
		<Fragment>
			<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>

			<HomeSlider images={home_slider} />

			{pageDetails.content && pageDetails.content.length > 10 && (
				<section className="section">
					<div className="container">
						<div className="content">
							<div
								dangerouslySetInnerHTML={{
									__html: pageDetails.content,
								}}
							/>
						</div>
					</div>
				</section>
			)}

			<section className="section">
				<div className="container">
					<div className="title is-4 has-text-centered">{themeSettings.home_products_title}</div>
					<CustomProducts
						sku={themeSettings.home_products_sku}
						sort={themeSettings.home_products_sort}
						limit={themeSettings.home_products_limit}
						settings={settings}
						addCartItem={addCartItem}
					/>
				</div>
			</section>
		</Fragment>
	);
};

IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({}),
	}).isRequired,
};

export default IndexContainer;
