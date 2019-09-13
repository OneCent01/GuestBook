import React from 'react'



export default class TabContent extends React.Component {
	constructor(props) {
		super(props)

		this.renderTab = tab => {
			return (
				tab === 'Analytics' ? this.renderAnalytics()
				: tab === 'Activity' ? this.renderActivity()
				: tab === 'Products' ? this.renderProducts()
				: tab === 'Transactions' ? this.renderTransactions()
				: null
			)
		}
	}

	renderAnalytics() {
		return (
			<div>ANAL HAH</div>
		)
	}

	renderActivity() {
		return (
			<div>RECENT ACTIVITY</div>
		)
	}

	renderProducts() {
		return (
			<div>RENDER SEARCH OF USER'S PRODUCTS, BOUGHT AND SOLD</div>
		)
	}

	renderTransactions() {
		return (
			<div>RENDER SEARCHABLE TABLE OF TRANSACTIONS</div>
		)
	}

	renderProfile() {
		return (
			<div>CUSTOMER PROFILE</div>
		)
	}

	render() {
		const tab = this.props.tab
		const style = {
			display: 'inline-block', 
			position: 'absolute', 
			height: '100%', 
			width: '100%'
		}

		return (
			<div style={style}>
				{ this.renderTab(tab) }
			</div>
		)
	}
}