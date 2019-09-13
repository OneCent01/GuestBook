import React from 'react'

import modelApi from '../../model/modelApi.js'

import ContextMenu from '../components/ContextMenu'

const headerStyles = {
	main: {
		height: '40px', 
		background: 'navy', 
		color: 'white', 
		paddingLeft: '12px', 
		paddingRight: '12px'
	},
	title: {
		fontSize: '24px', 
		fontWeight: 'bold', 
		margin: 'auto', 
		textAlign: 'center', 
		marginTop: '6px'
	},
	context: {
		float: 'right', 
		paddingTop: '8px'
	}
}

export default class Header extends React.Component {
	constructor(props) {
		super(props)

		this.logout = () => {
			modelApi.dispatch({type: 'LOGOUT'})
		}
		this.openSettings = () => {/*open settings component.. todo....*/}
	}

	renderLogo() {
		return (
			<img src="./dist/images/tealPurpStarburst.png" height="40"/>
		)
	}

	renderAppTitle() {
		return (
			<div style={headerStyles.title}>GuestBook</div>
		)
	}

	renderContextMenu() {
		return (
			<ContextMenu 
				{...this.props}
				title="Navigation Options" 
				style={headerStyles.context} 
				options={[
					{
						text: "Settings",
						onClick: this.openSettings
					},
					{
						text: "Logout",
						onClick: this.logout
					}
				]}
			/>
		)
	}

	renderEvenlySpacedElements(elements) {
		return (
			elements.map((el, i, arr) => (
				<span 
					style={(
						i === 0 
						? {height: '100%', float: 'left'} 
						: {height: '100%', float: 'right', width: `${100 / (arr.length)}%`}
					)}
				>{el}</span>
			))
		)
	}

	render() {
		return (
			<div style={headerStyles.main} id="Header">
				{
					this.renderEvenlySpacedElements([
						this.renderLogo(),
						this.renderContextMenu(),
						this.renderAppTitle(),
					])
				}
			</div>
		)
	}
}