import React from 'react'

import modelApi from '../../model/modelApi.js'


const dataTableStyles = {
	main: {

	},
}

/*
class DataTable
	@data: array of objects with an attribute and value tag
	@columns: array of objects specifying the attribute to be read 
			from the data and how they should be rendered
	@filter: array of objects with specifying the attribute(s) to 
			filter on and the funciton to apply to Array.filter
	@sort: object specifying what attribute to sort on, and passing
			a function to apply to the data by passing it to Array.sort
*/

export default class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			itemsPerPage: 20,
			page: 0
		}

		this.setPage = (page=0) => this.setState({ page })
		this.setItemsPerPage = (itemsPerPage=20) => this.setState({ itemsPerPage })
	}

	renderHeader() {
		return (
			<div id="DataTable-Header">
				{
					this.props.columns.map(col => <span>{col.title}</span>)
				}
			</div>
		)
	}

	renderRow(row) {
		return (
			<div id="DataTable-Row">
				{
					this.props.columns.map(col => <span>{row[col.attribute]}</span>)
				}
			</div>
		)
	}

	renderRows() {
		return (
			<div id="DataTable-rows">
				{
					this.props.data.map(row => this.renderRow(row))
				}
			</div>
		)
	}

	renderPagesCrumbs(totalPages) {
		return (
			Array(totalPages).fill(0).map((page, i) => <span>{i+1}</span>)
		)
	}

	renderPageControls() {
		const totalPages = Math.ceil(this.props.data.length / this.state.itemsPerPage)
		return (
			<div id="DataTable-pagination">
				<span>&#x3c;</span>
				<span>{this.renderPagesCrumbs(totalPages)}</span>
				<span>&#x3e;</span>
			</div>
		)
	}

	render() {
		return (
			<div id="DataTable" style={dataTableStyles.main}>
				{[
					this.renderHeader(),
					this.renderRows(),
					this.renderPageControls()
				]}
			</div>
		)
	}
}