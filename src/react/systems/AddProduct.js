import React from 'react'

import modelApi from '../../model/modelApi.js'


const addProductStyles = {
	main: {

	},
	clickable: {
		cursor: 'pointer'
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
			method: null
		}

		this.cancelAdd = () => this.setState({method: null})
		this.addWithImages = () => this.setState({method: 'images'})
		this.addWithInput = () => this.setState({method: 'input'})
		this.addWithWebcam = () => this.setState({method: 'webcam'})
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

	renderBarcodeImagesUploader() {
		return (
			<div>

				IMAGES
			</div>
		)
	}

	renderBarcodeInputUploader() {
		return (
			<div>
				BARCODE
			</div>
		)
	}

	renderBarcodeWebcamUploader() {
		return (
			<div>
				WEBCAM
			</div>
		)
	}

	renderAddMethod() {
		return (
			<div>
				{/*
					here i need to implement a way to either go back to the method selection, 
					or directly switch to another method
				*/}
				{
					this.state.method === 'images' ? this.renderBarcodeImagesUploader()
					: this.state.method === 'input' ? this.renderBarcodeInputUploader()
					: this.state.method === 'webcam' ? this.renderBarcodeWebcamUploader()
					: null
				}
			</div>
		)
	}


	render() {
		const productsData = this.props.products
		return (
			<div id="AddProduct" style={addProductStyles.main}>
				{
					this.state.method === null 
					? this.renderMethodSelection()
					: this.renderAddMethod()
				}
			</div>
		)
	}
}