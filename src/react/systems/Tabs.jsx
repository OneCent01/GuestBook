import React from 'react'

import modelApi from '../../model/modelApi.js'

const templateStyles = {
	base: {
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
			<div style={{height: '100%', width: '150px', background: 'rgb(240,255,255)', borderRight: '1px solid lightgrey', display: 'inline-block'}}>
				{
					this.props.tabs.map(tab => {
						
						const tabStatus = this.props.tab === tab ? 'selected' : 'unselected'
						const tabStyles = {
							...templateStyles.base,
							...templateStyles[tabStatus]
						}
						return (
							<div 
								style={tabStyles}
								onClick={e => modelApi.dispatch({type: 'NAVIGATE', tab: tab})}
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