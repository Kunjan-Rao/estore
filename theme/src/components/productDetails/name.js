import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import { get } from 'lodash';
import { Typography } from '@material-ui/core';
import { getColName } from '../../../dist/lib/functions';

const Name = ({ product, variant, isAllOptionsSelected, settings }) => {
	return;
	<Typography variant="h1">
		{getColName(product.name)}
		<span>{product.product_code}</span>
	</Typography>;
};

export default Name;
