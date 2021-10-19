const styles = (theme) => ({
	price_box: {
		display: 'flex',
		justifyContent: 'space-between',
		'& $price_value': {
			fontSize: '18px',
			fontWeight: 600,
		},
	},
	price_value: {},
	product_card: {
		display: 'flex',
		marginBottom: '20px',
		borderRadius: '10px',
		overflow: 'hidden',
		boxShadow: 'rgba(43, 52, 69, 0.1) 0px 4px 16px',
	},
	product_card_image: {
		height: 150,
		width: 150,
	},
	product_card_content: {
		flex: '1 0 auto',
	},
	quantity_text: {
		lineHeight: 1.5,
		margin: '0px 10px',
		fontWeight: 600,
		fontSize: '15px',
		whiteSpace: 'normal',
	},
	quantity_button: {
		border: '1px solid rgba(210, 63, 87, 0.5)',
		color: 'rgba(210, 63, 87, 0.5)',
		'&$disabled': {
			color: 'rgba(0, 0, 0, 0.26)',
			borderColor: 'rgba(0, 0, 0, 0.26)',
		},
	},
	product_price: {
		lineHeight: 1.5,
		margin: '8px 0px',
		color: 'rgb(125, 135, 156)',
		fontSize: '14px',
		whiteSpace: 'normal',
		marginRight: '10px',
		'& >span': {
			color: 'rgb(210, 63, 87)',
		},
	},
	disabled: {},
});

export default styles;
