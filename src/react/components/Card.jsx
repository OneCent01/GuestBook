import React from 'react'

export default class Card extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div 
				style={{
					width: 'fit-content', 
					boxShadow: '1px 1px 2px lightgrey', 
					padding: '22px',
					margin: 'auto',
					...(this.props.styles || {})
				}} 
				className="Card"
			>{this.props.children}</div>
		)
	}
}