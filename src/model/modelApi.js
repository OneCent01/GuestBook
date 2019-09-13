const initState = {
	authenticated: false,
	email: '',
	password: '',
	errors: [],
	tabs: ['Analytics', 'Activity', 'Products', 'Transactions'],
	tab: 'Analytics',
	faces: [],
	transactions: [],
	customers: [],
	products: [],
	contextOpen: false
}
let model = {...initState}

const reducers = {
	LOGOUT: (state, action) => ({...initState}),
	SET_AUTHENTICATED: (state, action) => ({...state, authenticated: true}),
	UNSET_AUTHENTICATED: (state, action) => ({...state, authenticated: false}),
	SET_EMAIL: (state, action) => ({...state, email: action.email}),
	SET_PASSWORD: (state, action) => ({...state, password: action.password}),
	ADD_ERROR: (state, action) => ({...state, errors: [...state.errors, action.error]}),
	DISMISS_ERROR: (state, action) => ({...state, errors: state.errors.filter(error => error.type !== action.error.type)}),
	NAVIGATE: (state, action) => ({...state, tab: action.tab}),
	SET_FACES: (state, action) => ({...state, faces: action.faces}),
	SET_TRANSACTIONS: (state, action) => ({...state, transactions: action.transactions}),
	SET_CUSTOMERS: (state, action) => ({...state, customers: action.customers}),
	OPEN_CONTEXT_MENU: (state, action, next) => ({...state, contextOpen: true}),
	CLOSE_CONTEXT_MENU: (state, action, next) => ({...state, contextOpen: false})
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