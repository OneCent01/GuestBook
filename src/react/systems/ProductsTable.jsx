import React from 'react'

import modelApi from '../../model/modelApi.js'

import DataTable from '../components/DataTable'


const productsTableStyles = {
	main: {

	},
}

export default class ProductsTable extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const productsData = this.props.products
		return (
			<div id="ProductsTable" style={productsTableStyles.main}>
				<DataTable 
					data={productsData.userProducts}
					columns={[
						{
							title: 'Name',
							attribute: 'title'
						},
						{
							title: 'upc',
							attribute: 'barcode'
						},
						{
							title: 'Stock',
							attribute: 'stock'
						},
						{
							title: 'Price',
							attribute: 'currentPrice'
						},
					]}
					// filter={

					// }
					// sort={

					// }
				/>
			</div>
		)
	}
}