import React from 'react';

import Login from './Login'
import Header from './Header'
import Tabs from './Tabs'
import TabContent from './TabContent'

export default class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const header = <Header {...this.props}/>
		const primaryContent = (
			this.props.authenticated
				? ([
					<Tabs {...this.props} tabs={this.props.tabs}/>,
					<TabContent {...this.props}/>
				]) 
				: <Login {...this.props} style={{marginTop: '64px'}}/>
		)

		return (
			<div id='App' style={{height: '100%'}}>
				{[
					header,
					primaryContent
				]}
			</div>
		)
	}

}