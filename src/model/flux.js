const reduce = (state, action, reducers) => reducers[action.type] ? reducers[action.type](state, action) : state
const createStore = (initModel, reducers) => {
	let model = {...initModel}
	const subscribers = []

	return {
		getState: () => model,
		dispatch: (action) => {
			console.log(action)
			model = reduce(model, action, reducers)
			subscribers.forEach(sub => sub(model))
		},
		subscribe: fn => subscribers.push(fn)
	}
}

export default createStore