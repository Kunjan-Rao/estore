import React from 'react';
import { NavLink } from 'react-router-dom';
import { text } from './settings';
import namedColors from '../../locales/colornames.json';
import { get } from 'lodash';

export const formatNumber = (number, settings) => {
	const x = 3;
	const floatNumber = parseFloat(number || 0) || 0;

	const re = `\\d(?=(\\d{${x}})+${settings.decimal_number > 0 ? '\\D' : '$'})`;

	const num = floatNumber.toFixed(Math.max(0, Math.floor(settings.decimal_number)));

	return (settings.decimal_separator ? num.replace('.', settings.decimal_separator) : num).replace(
		new RegExp(re, 'g'),
		`$&${settings.thousand_separator}`
	);
};

export const getColorHex = (colorName) => {
	const colorObj = namedColors.find((color) => {
		if (color.name.toLowerCase() === colorName.toLowerCase()) {
			return color;
		} else {
			if (color.name.toLowerCase().includes(colorName.toLowerCase())) {
				return color;
			}
		}
		return null;
	});
	if (colorObj) {
		return get(colorObj, 'hex');
	}
	return 'transparent';
};

const amountPattern = '{amount}';
export const formatCurrency = (number = 0, settings) =>
	settings.currency_format.replace(amountPattern, formatNumber(number, settings));

export const getThumbnailUrl = (images, width) => {
	if (images && images.thumbs) {
		let thumbWidth = 128;
		if (width < 200) {
			thumbWidth = 128;
		} else if (width < 300) {
			thumbWidth = 256;
		} else if (width < 600) {
			thumbWidth = 512;
		} else if (width < 1100) {
			thumbWidth = 1024;
		} else if (width < 1600) {
			thumbWidth = 1500;
		}
		return images.thumbs[thumbWidth];
	}
	return images.url;
};

export const getParentIds = (categories, id) => {
	let categoryId = id;
	const parentIds = [];
	let parentExists = false;

	do {
		const category = categories.find((item) => item.category_id === categoryId);
		parentExists = category && category.parent_category_id;
		if (parentExists) {
			parentIds.push(category.parent_category_id);
			categoryId = category.parent_category_id;
		}
	} while (parentExists);

	return parentIds;
};

export const getProductBreadcrumbs = (product, categories) => {
	if (product && product.categories && product.categories.length > 0) {
		const category = product.categories.find((category) => product.path.includes(category.slug));
		const ids = [category.category_id];
		const parentIds = getParentIds(categories, category.category_id);
		ids.push(...parentIds);

		let index = 0;
		const breadcrumbs = ids
			.reverse()
			.map((categoryId) => {
				const category = categories.find((item) => item.category_id === categoryId);
				if (category) {
					index += 1;
					return (
						<NavLink key={index} to={category.path}>
							{category.name}
						</NavLink>
					);
				}
				return null;
			})
			.filter((item) => !!item);

		return breadcrumbs;
	}
	return null;
};

export const getCategoryBreadcrumbs = (currentCategoryId, categories) => {
	if (currentCategoryId) {
		const ids = getParentIds(categories, currentCategoryId);
		let index = 0;
		const breadcrumbs = ids
			.reverse()
			.map((categoryId) => {
				const category = categories.find((item) => item.category_id === categoryId);
				if (category) {
					index += 1;
					return (
						<NavLink key={index} to={category.path}>
							{category.name}
						</NavLink>
					);
				}
				return null;
			})
			.filter((item) => !!item);

		return breadcrumbs;
	}
	return null;
};

export const getShippingMethodFromOrder = (order, shippingMethods) => {
	if (order && order.shipping_method_id && shippingMethods && shippingMethods.length > 0) {
		return shippingMethods.find((method) => method.id === order.shipping_method_id);
	}
	return null;
};

export const getPaymentMethodFromOrder = (order, paymentMethods) => {
	if (order && order.shipping_method_id && paymentMethods && paymentMethods.length > 0) {
		return paymentMethods.find((method) => method.id === order.payment_method_id);
	}
	return null;
};

export const getFieldLabelByKey = (key) => {
	switch (key) {
		case 'full_name':
			return text.full_name;
		case 'address1':
			return text.address1;
		case 'address2':
			return text.address2;
		case 'postal_code':
			return text.postal_code;
		case 'phone':
			return text.phone;
		case 'company':
			return text.company;
		case 'password':
			return text.password;
		case 'mobile':
			return text.mobile;
		case 'city':
			return text.city;
		case 'state':
			return text.state;
		case 'country':
			return text.country;
		case 'comments':
			return text.comments;
		default:
			return '';
	}
};

export const getShippingFieldLabelOrderSuccess = (key) => getFieldLabelByKey(key);

export const getShippingFieldLabel = ({ label, key }) => (label && label.length > 0 ? label : getFieldLabelByKey(key));

export const getCheckoutFieldLabel = ({ label, name }) =>
	label && label.length > 0 ? label : getFieldLabelByKey(name);
