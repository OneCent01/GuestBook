import initState from '../modelTemplate'

export default {
	LOGOUT: (state, action) => ({...initState}),
	SET_EMAIL: (state, action) => ({...state, email: action.email}),
	SET_PASSWORD: (state, action) => ({...state, password: action.password}),
	SET_PASSWORD_CONFIRMATION: (state, action) => ({...state, passwordConfirm: action.password}),
	DISPLAY_SIGNUP: (state, action) => ({...state, loginView: 'signup'}),
	DISPLAY_LOGIN: (state, action) => ({...state, loginView: 'login'}),
}