const styles = (theme) => ({
	cartRoot: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '40vw',
		'& ul': {
			overFlowY: 'scroll',
		},
	},
	cartList: {
		flex: 1,
	},
	cart_item: {
		height: '10vh',
		overFlowY: 'hidden',
		'& h5': {
			fontSize: '12px',
			color: '#2B3445',
			fontWeight: 600,
		},
		'& small': {
			fontSize: '8px',
			color: 'rgb(125, 135, 156)',
			fontWeight: 600,
		},
		'& span': {
			fontSize: '10px',
			color: 'rgb(210, 63, 87)',
			fontWeight: 600,
		},
	},
});

export default styles;
