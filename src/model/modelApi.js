const initState = {
	authenticated: false,
	email: '',
	password: '',
	passwordConfirm: '',
	products: {
		customerProducts: [],
		page: 0,
		selected: null,
		search: '',
		filters: [],
		sort: null,
		view: 'table' // 'add' || 'detail'
	},
	productsView: '',
	selectedProduct: null,
	loginView: 'login',
	errors: [],
	tabs: ['Analytics', 'Activity', 'Products', 'Transactions'],
	tab: 'Analytics',
	faces: [],
	transactions: [],
	customers: [],
	contextOpen: false
}
let model = {...initState}

const reducers = {
	LOGOUT: (state, action) => ({...initState}),
	SET_AUTHENTICATED: (state, action) => ({...state, authenticated: true}),
	UNSET_AUTHENTICATED: (state, action) => ({...state, authenticated: false}),
	SET_EMAIL: (state, action) => ({...state, email: action.email}),
	SET_PASSWORD: (state, action) => ({...state, password: action.password}),
	SET_PASSWORD_CONFIRMATION: (state, action) => ({...state, passwordConfirm: action.password}),
	ADD_ERROR: (state, action) => ({...state, errors: [...state.errors, action.error]}),
	DISMISS_ERROR: (state, action) => ({...state, errors: state.errors.filter(error => error.type !== action.error.type)}),
	NAVIGATE: (state, action) => ({...state, tab: action.tab}),
	SET_FACES: (state, action) => ({...state, faces: action.faces}),
	SET_TRANSACTIONS: (state, action) => ({...state, transactions: action.transactions}),
	SET_CUSTOMERS: (state, action) => ({...state, customers: action.customers}),
	OPEN_CONTEXT_MENU: (state, action) => ({...state, contextOpen: true}),
	CLOSE_CONTEXT_MENU: (state, action) => ({...state, contextOpen: false}),
	DISPLAY_SIGNUP: (state, action) => ({...state, loginView: 'signup'}),
	DISPLAY_LOGIN: (state, action) => ({...state, loginView: 'login'}),
	SELECT_PRODUCT: (state, action) => ({...state, products: {...state.products, selected: action.product_id}}),
	DESELECT_PRODUCT: (state, action) => ({...state, products: {...state.products, selected: null}}),
	UPDATE_PRODUCTS_SEARCH: (state, action) => ({...state, products: {...state.products, search: action.search}}),
	UPDATE_PRODUCTS_FILTER: (state, action) => ({...state, products: {...state.products, filters: [...state.products.filters, action.filter]}}),
	CLEAR_PRODUCT_FILTERS: (state, action) => ({...state, products: {...state.products, filters: []}}),
	UPDATE_PRODUCTS_SORT: (state, action) => ({...state, products: {...state.products, sort: action.sort}}),
	CLEAR_PRODUCTS_SORT: (state, action) => ({...state, products: {...state.products, sort: null}}),
	SET_PRODUCTS_TABLE_VIEW: (state, action) => ({...state, products: {...state.products, selected: null, view: 'table'}}),
	SET_PRODUCTS_ADD_VIEW: (state, action) => ({...state, products: {...state.products, selected: null, view: 'add'}}),
	SET_PRODUCTS_DETAIL_VIEW: (state, action) => ({...state, products: {...state.products, selected: action.selected, view: 'detail'}})
}

const reduce = (state, action) => reducers[action.type] ? reducers[action.type](state, action) : state

const subscribers = []

const modelApi = {
	getState: () => model,
	dispatch: (action) => {
		model = reduce(model, action)
		subscribers.forEach(sub => sub(model))
	},
	subscribe: fn => subscribers.push(fn)
}

export default modelApi