import React from 'react';

import modelApi from '../../model/modelApi.js'

const contextStyles = {
	main: {
		position: 'relative', 
		cursor: 'pointer'
	},
	modal: {
		position: 'absolute', 
		background: 'rgb(240,255,255)', 
		color: 'black', 
		border: '1px solid lightgrey',
		zIndex: '10'
	},
	opt: {
		fontSize: '20px', 
		padding: '8px',
		paddingBottom: '8px',
	},
	dropdownIcon: {
		fontSize: '10px'
	}
}

export default class ContextMenu extends React.Component {
	constructor(props) {
		super(props)
	}

	renderMenuModal() {
		return (
			<div className="MenuModal" style={contextStyles.modal}>
				{
					this.props.options.map((option, i) => {
						const isLast = i === this.props.options.length-1
						const borderBottom = isLast ? '0px' : '1px solid lightgrey'
						const optStyles = {
							...contextStyles.opt,
							borderBottom
						}
						return (
							<div style={optStyles} onClick={option.onClick ? option.onClick : null}>
								{option.text}
							</div>
						)
					})
				}
			</div>
		)
	}

	render() {
		return (
			<div 
				className="ContextMenu"
				style={{
					...contextStyles.main,
					...this.props.style
				}}
				onClick={e => {
					if(!this.props.contextOpen) {
						modelApi.dispatch({type: 'OPEN_HEADER_MENU'})
					}
				}
			}>
				<span>{`${this.props.title} `}</span>
				<span style={contextStyles.dropdownIcon}>{String.fromCharCode(9660)}</span>

				{
					this.props.contextOpen 
						? this.renderMenuModal()
						: null
				}
			</div>
		)
	}
}