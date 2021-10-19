const styles = (theme) => ({
	// save_button:{
	//     backgroundColor:''
	// }
	edit_card: {
		padding: '15px 15px',
		boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)',
	},
	profile_menu_card: {},
	rowCard: {
		display: 'flex',
		alignItems: 'center',
		'& >*': {
			flex: 1,
		},
		'& >p': {
			overflow: 'hidden',
		},
		'& $long': {
			flex: 3,
		},
		'& .MuiCardActions-root': {
			justifyContent: 'flex-end',
		},
	},
	long: {},
	selected: {
		borderLeft: '4px solid rgb(210, 63, 87)',
		color: 'red !important',
		'& svg': {
			color: 'red',
		},
	},
	panel: {
		display: 'block',
		'& >*': {
			margin: '20px 0px',
		},
	},
	profile_menu_item: {
		'&:hover': {
			borderLeft: '4px solid rgb(210, 63, 87)',
			color: 'red',
			'& svg': {
				color: 'red',
			},
		},
	},
});

export default styles;
