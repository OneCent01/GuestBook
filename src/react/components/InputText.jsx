import React from 'react';

// usage: modelApi.dispatch(action)
import modelApi from '../model/modelApi.js'

export default class InputText extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={{...(this.props.style || {})}}>
				{this.props.title ? <div style={{fontSize: '12px'}}>{this.props.title}</div> : null}
				<input 
					style={{width: '100%'}}
					onFocus={this.props.onFocus ? this.props.onFocus : null} 
					onChange={this.props.onChange ? this.props.onChange : null}
				/>
				{
					this.props.error 
						? <div style={{fontSize: '10px', color: 'red', fontStyle: 'italic'}}>{this.props.error}</div>
						: null
				}
			</div>
		)
	}
}