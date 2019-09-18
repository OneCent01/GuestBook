import loginReducers from './reducers/login'
import authReducers from './reducers/auth'
import errorReducers from './reducers/error'
import navReducers from './reducers/navigate'
import prodReducers from './reducers/products'
import headerDropdown from './reducers/headerDropdown'
import transactions from './reducers/transactions'

import initState from './modelTemplate'

import createStore from './flux.js'

const reducers = {
	...loginReducers,
	...authReducers,
	...errorReducers,
	...navReducers,
	...prodReducers,
	...headerDropdown,
	...transactions
}

export default createStore(initState, reducers)