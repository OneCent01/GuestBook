const modelTemplate = {
	authenticated: false,
	email: '',
	password: '',
	errors: [],
	tab: 'Analytics'
}


let model = {...modelTemplate}
const subscribers = []

const reducers = {
	LOGOUT: (state, action) => ({...modelTemplate}),
	SET_AUTHENTICATED: (state, action) => ({...state, authenticated: true}),
	UNSET_AUTHENTICATED: (state, action) => ({...state, authenticated: false}),
	SET_EMAIL: (state, action) => ({...state, email: action.email}),
	SET_PASSWORD: (state, action) => ({...state, password: action.password}),
	ADD_ERROR: (state, action) => ({...state, errors: [...state.errors, action.error]}),
	DISMISS_ERROR: (state, action) => ({...state, errors: state.errors.filter(error => error.type !== action.error.type)}),
	NAVIGATE: (state, action) => ({...state, tab: action.tab})
}

const reduce = (state, action) => reducers[action.type] ? reducers[action.type](state, action) : state

const modelApi = {
	getState: () => model,
	dispatch: (action) => {
		model = reduce(model, action)
		subscribers.forEach(sub => sub(model))
	},
	subscribe: fn => subscribers.push(fn)
}

export default modelApi