import React from 'react'

import modelApi from '../../model/modelApi.js'

const tabStyles = {
	main: {
		height: '100%', 
		width: '150px', 
		background: 'rgb(240,255,255)', 
		borderRight: '1px solid lightgrey', 
		display: 'inline-block'
	},
	tab: {
		padding: '8px', 
		fontSize: '20px'
	},
	selected: {
		border: '1px solid lightgrey',
		background: 'rgb(205,249,249)'
	},
	unselected: {
		cursor: 'pointer'
	}
}

export default class Tabs extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={tabStyles.main}>
				{
					this.props.tabs.map(tab => {
						const tabStatus = `${this.props.tab === tab ? '' : 'un'}selected`
						const styles = {
							...tabStyles.tab,
							...tabStyles[tabStatus]
						}

						return (
							<div 
								style={styles}
								onClick={e => modelApi.dispatch({
									type: 'NAVIGATE', 
									tab: tab
								})}
							>
								{tab}
							</div>
						)
					})
				}
			</div>
		)
	}
}