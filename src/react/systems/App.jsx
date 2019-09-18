import React from 'react';

import modelApi from '../../model/modelApi.js'

import Login from './Login'
import Header from './Header'
import Tabs from './Tabs'
import TabContent from './TabContent'

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.handleWindowClick = (e) => {
			if(this.props.contextOpen) {
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
					modelApi.dispatch({type: 'CLOSE_HEADER_MENU'})
				}
				
			}
		}
	}

	render() {
		const header = <Header {...this.props}/>
		const primaryContent = (
			this.props.authenticated
				? (
					<div style={{display: 'flex', height: '100%'}}>
						<Tabs {...this.props} tabs={this.props.tabs}/>
						<TabContent {...this.props}/>
					</div>
				) 
				: <Login {...this.props} style={{marginTop: '64px'}}/>
		)

		return (
			<div 
				id='App' 
				style={{height: '100%'}}
				onClick={this.handleWindowClick}
			>
				{[
					header,
					primaryContent
				]}
			</div>
		)
	}

}