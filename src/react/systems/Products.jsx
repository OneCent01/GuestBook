import React from 'react'

import modelApi from '../../model/modelApi.js'

import Product from './Product'
import ProductsTable from './ProductsTable'
import AddProduct from './AddProduct'

const productsStyles = {
	main: {
		height: '100%'
	},
	clickable: {
		cursor: 'pointer'
	},
	header: {
		fontSize: '20px',
		fontWeight: 'bold'
	},
	floatRight: {
		float: 'right'
	},
	addIcon: {
		border: '2px solid black',
		borderRadius: '50%',
		fontWeight: 'bold',
		padding: '2px',
		display: 'inline-block',
		lineHeight: '0.6'
	}
}

export default class Products extends React.Component {
	constructor(props) {
		super(props)
	}

	renderProductsTable() {
		return ([
			(
				<div>
					<span style={productsStyles.header}>Search Products!</span>
					<span 
						style={{...productsStyles.clickable, ...productsStyles.floatRight}}
						onClick={e => modelApi.dispatch({type: 'SET_PRODUCTS_ADD_VIEW'})}
					><i style={productsStyles.addIcon}>&#x2b;</i> Add product</span>
				</div>
			),
			<ProductsTable {...this.props}/>
		])
	}

	renderProductView() {
		return ([
			(
				<div>
					<span 
						style={productsStyles.clickable}
						onClick={e => modelApi.dispatch({type: 'SET_PRODUCTS_TABLE_VIEW'})}
					>&#x3c; Return to products search</span>
				</div>
			),
			<Product {...this.props}/>
		])
	}

	renderAddProductView() {
		return ([
			<div>
				<span 
					style={productsStyles.clickable}
					onClick={e => modelApi.dispatch({type: 'SET_PRODUCTS_TABLE_VIEW'})}
				>&#x3c; Return to products search</span>
			</div>,
			<AddProduct {...this.props}/>
		])
	}

	render() {
		const productsData = this.props.products
		return (
			<div id="Products" style={productsStyles.main}>
				{
					productsData.view === 'detail' ? this.renderProductView()
					: productsData.view === 'add' ? this.renderAddProductView()
					: productsData.view === 'table' ? this.renderProductsTable()
					: null
				}
			</div>
		)
	}
}