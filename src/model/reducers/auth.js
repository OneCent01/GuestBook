export default {
	SET_AUTHENTICATED: (state, action) => ({...state, authenticated: true}),
	UNSET_AUTHENTICATED: (state, action) => ({...state, authenticated: false}),
}