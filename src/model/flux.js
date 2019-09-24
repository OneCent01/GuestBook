const createStore = (initModel, reducers) => {
	let model = {...initModel}
	const subscribers = []

	// reduce MUST be defined in the createStore
	// so that it's properly bound to this context
	// and can access the reducers
	const reduce = (state, action, next) => (
		reducers[action.type] 
			? reducers[action.type](state, action, next) 
			: state
	)

	return {
		getState: () => model,
		dispatch: (action) => {
			console.log(action)
			model = reduce(model, action, reduce)
			subscribers.forEach(sub => sub(model))
		},
		subscribe: fn => subscribers.push(fn)
	}
}

export default createStore