import React from 'react'

import modelApi from '../../model/modelApi.js'


const dataTableStyles = {
	main: {
		display: 'table',
		width: '100%',
		tableLayout: 'fixed',
		borderBottom: '1px solid rgba(0, 0, 128, 0.5)'
	},
	row: {
		display: 'table-row',
		cursor: 'pointer'
	},
	rowEven: {
		backgroundColor: 'rgb(240, 255, 255)'
	},
	rowOdd: {
		backgroundColor: 'rgb(165, 214, 214)'
	},
	cell: {
		display: 'table-cell',
		borderTop: '1px solid rgba(0, 0, 128, 0.5)',
		padding: '6px'
	},
	pagination: {
		borderBottom: '1px solid rgba(0, 0, 128, 0.5)', 
		width: '100%', 
		textAlign: 'center',
		padding: '3px'
	}
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
			itemsPerPage: 10,
			page: 0
		}

		this.setPage = (page=0) => this.setState({ page })
		this.setItemsPerPage = (itemsPerPage=20) => this.setState({ itemsPerPage })
	}

	// renderFilter() {

	// }

	// renderSort() {

	// }

	renderHeader() {
		return (
			<div id="DataTable-Header" style={{...dataTableStyles.row, ...dataTableStyles.rowOdd}}>
				{
					this.props.columns.map(col => <span style={dataTableStyles.cell}>{col.title}</span>)
				}
			</div>
		)
	}

	renderRow(row, i=0) {
		const modStyles = i%2 ? dataTableStyles.rowOdd : dataTableStyles.rowEven
		return (
			<div 
				id="DataTable-Row" 
				onClick={e => modelApi.dispatch({
					type: 'SET_PRODUCTS_DETAIL_VIEW',
					selected: row.id
				})} 
				style={{
					...dataTableStyles.row, 
					...modStyles
				}}
			>
				{
					this.props.columns.map(col => <span style={dataTableStyles.cell}>{row[col.attribute]}</span>)
				}
			</div>
		)
	}

	renderRows() {
		return this.props.data.map((row, i) => this.renderRow(row, i))
	}

	renderPagesCrumbs(totalPages) {
		return (
			Array(totalPages).fill(0).map((page, i) => <span>{i+1}</span>)
		)
	}

	renderPageControls() {
		const totalPages = Math.ceil(this.props.data.length / this.state.itemsPerPage)
		return (
			<div style={{...dataTableStyles.pagination, ...dataTableStyles.rowEven}} id="DataTable-pagination">
				<span>&#x3c;</span>
				<span>{this.renderPagesCrumbs(totalPages)}</span>
				<span>&#x3e;</span>
			</div>
		)
	}

	render() {
		return (
			<div id="DataTable">
				<div style={dataTableStyles.main}>
					{[
						this.renderHeader(),
						this.renderRows()
					]}
				</div>
				{
					this.renderPageControls()
				}
			</div>
		)
	}
}