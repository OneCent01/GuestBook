export default {
	OPEN_HEADER_MENU: (state, action) => ({...state, contextOpen: true}),
	CLOSE_HEADER_MENU: (state, action) => ({...state, contextOpen: false}),
}