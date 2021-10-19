export const getLocalToken = () =>
	localStorage.getItem('auth_data') != null ? JSON.parse(localStorage.getItem('auth_data')) : null;

export const setLocalToken = (auth_data) => localStorage.setItem('auth_data', auth_data);

export const removeLocalToken = () => {
	localStorage.removeItem('auth_data');
};
