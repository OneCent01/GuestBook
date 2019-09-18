import React from 'react'

import modelApi from '../../model/modelApi.js'

import c3 from 'c3'


const productStyles = {
	main: {

	},
}

export default class Product extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const productsData = this.props.products
		const selectedId = productsData.selected 
		const selectedProduct = productsData.userProducts.find(product => product.id === selectedId)
		const chart = c3.generate({
			data: {
				x: 'x',
				columns: [
					['x', ...selectedProduct.priceHistory.map(price => {
						let priceDate = new Date(price.date)
						return `${priceDate.getFullYear()}-${priceDate.getMonth()}-${priceDate.getDate()}`
					})],
					['data1', ...selectedProduct.priceHistory.map(price => price.price)]
				]
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%Y-%m-%d'
					}
				}
			}
		})
	}

	render() {
		const productsData = this.props.products
		const selectedId = productsData.selected 
		const selectedProduct = productsData.userProducts.find(product => product.id === selectedId)
		return (
			<div id="Product" style={productStyles.main}>
				<img src={selectedProduct.imageUrl} height="200" width="200"/>
				<div>
					<div>Title: {selectedProduct.title}</div>
					<div>Barcode: {selectedProduct.barcode}</div>
					<div>Stock: {selectedProduct.stock}</div>
					<div>Price: {selectedProduct.currentPrice}</div>
					<div id="chart"></div>
				</div>
			</div>
		)
	}
}