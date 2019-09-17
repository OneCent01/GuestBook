import React from 'react'

import modelApi from '../../model/modelApi.js'


const productStyles = {
	main: {

	},
}

export default class Product extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const productsData = this.props.products
		return (
			<div id="Product" style={productStyles.main}>
				
			</div>
		)
	}
}