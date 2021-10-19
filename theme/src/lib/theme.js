import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
	overrides: {
		MuiDialog: {
			paperWidthSm: {
				backgroundColor: '#f6f9fc',
			},
		},
		MuiListItemText: {
			root: {
				overflow: 'hidden',
			},
		},
		// MuiBreadcrumbs:{
		// 	li:{
		// 		backgroundColor:''
		// 	}
		// },
		MuiContainer: {
			root: {
				marginTop: '10px',
				marginBottom: '10px',
			},
		},
		MuiStepButton: {
			root: {
				backgroundColor: 'rgb(210, 63, 87)',
				borderRadius: '16px',
				padding: '5px 10px',
			},
			// disa:{
			// 	backgroundColor:'rgb(252, 233, 236)'
			// }
		},
		MuiStepConnector: {
			lineHorizontal: {
				borderTopWidth: '5px',
				borderTopColor: 'rgb(210, 63, 87)',
			},
			// disabled:{
			// 	borderTopColor:'rgb(252, 233, 236)'
			// }
		},
		MuiButton: {
			root: {
				// width: '100%',
				// minWidth: '30px',
				// // width: '30px',
				// minHeight: '20px',
				// padding: '0px 0px',
				// boxShadow:
				// 	' 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
				// '&:hover': {
				// 	boxShadow: '  0px 1px 5px 0px rgba(0,0,0,0.12)',
				// 	opacity: 0.3,
				// },
			},
			// label: {
			// 	fontSize: '8px',
			// },
		},

		// MuiTabs: {
		// 	indicator: {
		// 		backgroundColor: '#635ee7',
		// 	},
		// },
		MuiInputBase: {
			input: {
				fontSize: '14px',
				lineHeight: 1.5,
				padding: '5px 5px',
			},
		},
		MuiFormLabel: {
			root: {
				textTransform: 'capitalize',
			},
		},
		MuiFormControlLabel: {
			root: {
				marginLeft: '0px',
				marginRight: '0px',
			},
		},
		MuiStepper: {
			root: {
				backgroundColor: 'transparent',
			},
		},
		MuiCard: {
			root: {
				padding: '10px 10px',
			},
		},
		MuiPaper: {
			elevation1: {
				boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
			},
		},
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: '#ffff',
				color: '#000',
			},
		},
		MuiChip: {
			root: {
				width: 15,
				height: 15,
				borderRaidus: '100%',
			},
		},
		MuiMenuItem: {
			root: {
				fontSize: '14px',
				color: '#242424',
				fontWeight: 700,
			},
		},
	},
	typography: {
		h3: {
			fontWeight: '700 !important',
			fontSize: '12px !important',
			color: '#666',
			marginBottom: 10,
		},
	},
});
export default Theme;
