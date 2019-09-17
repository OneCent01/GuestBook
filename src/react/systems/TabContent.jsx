import React from 'react'

import Products from './Products'

export default class TabContent extends React.Component {
	constructor(props) {
		super(props)

		this.renderTab = tab => {
			return (
				tab === 'Analytics' ? this.renderAnalytics()
				: tab === 'Activity' ? this.renderActivity()
				: tab === 'Products' ? <Products {...this.props}/>
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
			height: '100%', 
			width: '100%',
			padding: '16px'
		}

		return (
			<div style={style}>
				{ this.renderTab(tab) }
			</div>
		)
	}
}