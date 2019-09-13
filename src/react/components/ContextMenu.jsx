import React from 'react';

// usage: modelApi.dispatch(action)
import modelApi from '../../model/modelApi.js'

export default class ContextMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false
		}
	}

	renderMenuModal() {
		return (
			<div className="MenuModal" style={{
				position: 'absolute', 
				background: 'rgb(240,255,255)', 
				color: 'black', 
				border: '1px solid lightgrey',
				zIndex: '10'
			}}>
				{
					this.props.options.map((option, i) => {
						const isLast = i === this.props.options.length-1
						const optStyles = {
							fontSize: '20px', 
							padding: '8px',
							paddingBottom: `8px`,
							borderBottom: isLast ? '0px' : '1px solid lightgrey'
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
				style={{position: 'relative', cursor: 'pointer', ...this.props.style}}
				onClick={e => {
					// if it's not open on click, open it
					if(!this.state.open) {
						this.setState({open: true}, () => {
							// then add a listener for clicks on the entire window;
							// for the purposes of checking whether a click should trigger the settings popup to close
							const handleClick = e => {
								let element = e.target
								const classesClicked = []
								
								// iterate through the tree of elements clicked including all parents;
								// add their classes iteratively to the classesClicked array
								while(element && element.classList) {
									element.classList.forEach(clickedClass => classesClicked.push(clickedClass))
									element = element.parentNode
								}

								// if the classesClicked array doesn't include the className Settings, we know there's 
								// been a window click outside of the settings popup which should close it
								if(!classesClicked.includes('MenuModal')) {
									window.removeEventListener('click', handleClick)
									this.setState({
										open: false
									})
								}
		
							}

							// defer execution to the end of the callstack, preventing it from
							// immediately being triggered by the currently cascading click event
							setTimeout(() => window.addEventListener('click', handleClick), 0)

						})

					}
				}
			}>
				<span>{`${this.props.title} `}</span>
				<span style={{fontSize: '10px'}}>{String.fromCharCode(9660)}</span>

				{
					this.state.open 
						? this.renderMenuModal()
						: null
				}
			</div>
		)
	}
}