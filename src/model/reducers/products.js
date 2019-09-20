export default {
	SELECT_PRODUCT: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selected: action.product_id
		}
	}),
	DESELECT_PRODUCT: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selected: null
		}
	}),
	UPDATE_PRODUCTS_SEARCH: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			search: action.search
		}
	}),
	UPDATE_PRODUCTS_FILTER: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			filters: [
				...state.products.filters, 
				action.filter
			]
		}
	}),
	CLEAR_PRODUCT_FILTERS: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			filters: []
		}
	}),
	UPDATE_PRODUCTS_SORT: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			sort: action.sort
		}
	}),
	CLEAR_PRODUCTS_SORT: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			sort: null
		}
	}),
	SET_PRODUCTS_TABLE_VIEW: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selected: null, 
			selectedData: null, 
			view: 'table'
		}
	}),
	SET_PRODUCTS_ADD_VIEW: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selected: null, 
			selectedData: null, 
			view: 'add'
		}
	}),
	SET_PRODUCTS_DETAIL_VIEW: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selected: action.selected, 
			view: 'detail'
		}
	}),
	SET_SELECTED_PRODUCT_DATA: (state, action) => ({
		...state, 
		products: {
			...state.products, 
			selectedData: action.data
		}
	})
}