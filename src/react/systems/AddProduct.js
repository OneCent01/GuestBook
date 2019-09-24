import React from 'react'

import modelApi from '../../model/modelApi.js'

import serverApi from '../../serverAPI/serverAPI.js'

const addProductStyles = {
	main: {

	},
	clickable: {
		cursor: 'pointer'
	},
	fill: {
		height: '100%'
	}
}

/*
@AddProduct: should allow the user to select how they upload new products: 
	a) uploading images of barcodes
	b) manually typing in barcode
	c) webcam barcode detection
*/

export default class AddProduct extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			method: null,
			img: null
		}

		this.cancelAdd = () => this.setState({method: null})
		this.addWithImages = () => this.setState({method: 'images'})
		this.addWithInput = () => this.setState({method: 'input'})
		this.addWithWebcam = () => this.setState({method: 'webcam'})

		this.lookupBarcode = barcode => {
			serverApi.scanProduct(barcode)
			.then(data => modelApi.dispatch({type: 'SET_SELECTED_PRODUCT_DATA', data: JSON.parse(data)}))
			.catch(err => console.log('scanProduct err: ', err))
		}
	}

	renderMethodSelection() {
		return ([
			<div>Select method of adding products</div>,
			<div>
				<div 
					onClick={this.addWithImages} 
					style={addProductStyles.clickable}
				>Upload Images</div>
				<div 
					onClick={this.addWithInput} 
					style={addProductStyles.clickable}
				>Maually Input Numbers</div>
				<div 
					onClick={this.addWithWebcam} 
					style={addProductStyles.clickable}
				>Webcam Barcode Scan</div>
			</div>
		])
	}

	renderBarcodeInputUploader() {
		return (
			<form onSubmit={e => {
				e.preventDefault()
				this.lookupBarcode(this.refs.barcodeInput.value)
			}}>
				<div>Input barcode:</div>
				<input ref="barcodeInput"/>
				<button type="submit">Submit!</button>
			</form>
		)
	}

	renderSelectedDetails() {
		const productData = this.props.products.selectedData
		console.log('productData: ', productData)
		return (
			<div style={addProductStyles.fill}>
				{/*<h2>Title: {productData.title}</h2>
								<div>
									<ul>
										<span>Other Titles:</span>
										{productData.titles.map(title => <li>{title}</li>)}
									</ul>
								</div>
								<div>Category: {productData.Category}</div>
								<div>Manufacturer: {productData.Manufacturer}</div>
								<div>Barcode formats: {productData['Barcode Formats']}</div>
								<div style={addProductStyles.fill}>
									<div>Images:</div>
									{productData.images.map(image => <img src={image}/>)}
								</div>*/}
			</div>
		)
	}

	renderAddMethod() {
		return (
			<div style={addProductStyles.fill}>
				{/*
					here i need to implement a way to either go back to the method selection, 
					or directly switch to another method
				*/}
				{
					this.state.method === 'input' ? this.renderBarcodeInputUploader()
					: null
				}
				{
					// this.props.products.selectedData
					// ? this.renderSelectedDetails()
					// : null
				}
			</div>
		)
	}


	render() {
		const productsData = this.props.products
		return (
			<div id="AddProduct" style={{...addProductStyles.main, ...addProductStyles.fill}}>
				{
					this.state.method === null 
					? this.renderMethodSelection()
					: this.renderAddMethod()
				}
			</div>
		)
	}
}