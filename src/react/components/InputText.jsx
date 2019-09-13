import React from 'react';

import modelApi from '../../model/modelApi.js'

const inputStyles = {
	title: {
		fontSize: '12px'
	},
	error: {
		fontSize: '10px', 
		color: 'red', 
		fontStyle: 'italic'
	},
	input: {
		width: '100%'
	}
}

export default class InputText extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={{...(this.props.style || {})}}>
				{this.props.title ? <div style={inputStyles.title}>{this.props.title}</div> : null}
				<input 
					style={inputStyles.input}
					onFocus={this.props.onFocus ? this.props.onFocus : null} 
					onChange={this.props.onChange ? this.props.onChange : null}
					autofocus={this.props.autoFocus ? 'true' : 'false'}
				/>
				{
					this.props.error 
						? <div style={inputStyles.error}>{this.props.error}</div>
						: null
				}
			</div>
		)
	}
}