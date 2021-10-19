import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import Cart from './cart';
import CartIndicator from './cartIndicator';
import Login from './login';
import SearchBox from './searchBox';
import HeadMenu from './headMenu';
import { AppBar, Toolbar, IconButton, Hidden } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const Logo = ({ src, onClick, alt }) => (
	<NavLink className="logo-image" to="/" onClick={onClick}>
		<img src={src} alt={alt} />
	</NavLink>
);

const BurgerButton = ({ onClick, className }) => (
	<span className={className} onClick={onClick}>
		<span />
		<span />
		<span />
	</span>
);

const BackButton = ({ onClick }) => (
	<span className="navbar-item is-hidden-tablet is-flex-mobile" onClick={onClick}>
		<img className="icon" src="/assets/images/arrow_back.svg" style={{ width: 18 }} />
	</span>
);

const state = {
	MENU: 'menu',
	CART: 'cart',
	SITE: 'site',
};

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			siteState: state.SITE,
			mobileSearchIsActive: false,
			loggedIn: false,
		};
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// if (this.props.state.cart !== nextProps.state.cart && this.props.state.currentPage.path !== '/checkout') {
		// 	this.setSiteState(state.CART);
		// }
		if (Lscache.get('auth_data')) {
			this.setState({ loggedIn: true });
		} else {
			this.setState({ loggedIn: false });
		}
	}
	componentDidMount(nextProps) {
		if (Lscache.get('auth_data')) {
			this.setState({ loggedIn: true });
		} else {
			this.setState({ loggedIn: false });
		}
	}
	mobileMenuIsActive = () => {
		return this.state.siteState === state.MENU;
	};

	cartIsActive = () => {
		return this.state.siteState === state.CART;
	};

	setSiteState(state) {
		this.setState({ siteState: state });
		this.handleState(state);
	}

	handleState(newState) {
		switch (newState) {
			case state.CART:
				document.body.classList.add('noscroll');
				if (this.state.mobileSearchIsActive) {
					this.searchToggle();
				}
				break;
			case state.MENU:
				document.body.classList.add('noscroll');
				break;
			case state.SITE:
				document.body.classList.remove('noscroll');
				break;
		}
	}

	menuToggle = () => {
		let newState = this.state.siteState == state.MENU ? state.SITE : state.MENU;
		this.setSiteState(newState);
	};

	searchToggle = () => {
		this.setState({
			mobileSearchIsActive: !this.state.mobileSearchIsActive,
		});
		document.body.classList.toggle('search-active');
	};

	cartToggle = (event) => {
		let newState = this.state.siteState == state.CART ? state.SITE : state.CART;
		this.setSiteState(newState);
		if (this.props.state.cart && this.props.state.cart.items && this.props.state.cart.items.length > 0) {
			this.props.cartLayerInitialized({
				cartlayerBtnInitialized: true,
			});
		}
	};
	handleLogout() {
		this.props.logoutUser();
	}
	handleLogin = () => {
		Lscache.flushExpired();
		if (!this.state.loggedIn) {
			this.props.loggedinUserTimeUp({
				authenticated: false,
			});
			this.props.setLocation('/login');
			this.setState({ loggedIn: true });
		} else {
			this.props.customerData({
				token: Lscache.get('auth_data'),
			});
			this.props.setLocation('/customer-account');
			this.setState({ loggedIn: false });
		}
	};

	handleSearch = (search) => {
		if (this.props.state.currentPage.path === '/search') {
			this.props.setSearch(search);
		} else {
			if (search && search !== '') {
				this.props.setLocation('/search?search=' + search);
			}
		}
	};

	handleGoBack = () => {
		this.setSiteState(state.SITE);
		this.props.goBack();
	};

	render() {
		const { categories, cart, settings, currentPage, location, productFilter, cartlayerBtnInitialized } =
			this.props.state;
		const classToggle = this.mobileMenuIsActive()
			? 'navbar-burger is-hidden-tablet is-active'
			: 'navbar-burger is-hidden-tablet';
		const showBackButton = currentPage.type === 'product' && location.hasHistory;

		return (
			<Fragment>
				<AppBar position="static">
					<Toolbar>
						{showBackButton && (
							<div className="column column-burger">
								{!showBackButton && <BurgerButton onClick={this.menuToggle} className={classToggle} />}
								{showBackButton && <BackButton onClick={this.handleGoBack} />}
							</div>
						)}

						<div className="column is-4 column-logo">
							<Logo src={settings.logo} onClick={() => this.setSiteState(state.SITE)} alt="logo" />
						</div>

						<Hidden smDown>
							<HeadMenu categories={categories} location={location} isMobile={false} />
						</Hidden>
						<div className="column has-text-right header-block-right">
							<Hidden mdUp>
								<IconButton>
									<CategoryIcon />
								</IconButton>
							</Hidden>
							<IconButton onClick={this.handleLogin}>
								<PersonIcon />
							</IconButton>
							<IconButton onClick={this.cartToggle}>
								<CartIndicator
									cart={cart}
									// cartIsActive={this.cartIsActive()}
									cartlayerBtnInitialized={cartlayerBtnInitialized}
								/>
							</IconButton>
							{this.state.loggedIn && (
								<IconButton onClick={this.handleLogout}>
									<ExitToAppIcon />
								</IconButton>
							)}
							<Cart
								cart={cart}
								deleteCartItem={this.props.deleteCartItem}
								settings={settings}
								onClose={this.cartToggle}
								open={this.cartIsActive()}
								cartlayerBtnInitialized={cartlayerBtnInitialized}
								anchor="right"
							/>
						</div>
					</Toolbar>
				</AppBar>
				<div className={'mobile-nav is-hidden-tablet' + (this.mobileMenuIsActive() ? ' mobile-nav-open' : '')}>
					<HeadMenu
						isMobile={true}
						categories={categories}
						location={location}
						onClick={() => this.setSiteState(state.SITE)}
					/>
				</div>
			</Fragment>
		);
	}
}
