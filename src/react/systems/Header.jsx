import React from 'react'

import ContextMenu from '../components/ContextMenu'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}

	renderLogo() {
		return (
			<img src="./dist/images/tealPurpStarburst.png" height="40"/>
		)
	}

	renderAppTitle() {
		return (
			<div style={{fontSize: '24px', fontWeight: 'bold', margin: 'auto', textAlign: 'center', marginTop: '6px'}}>GuestBook</div>
		)
	}

	render() {
		return (
			<div style={{height: '40px', background: 'navy', color: 'white'}} id="Header">
				{[
					this.renderLogo(),
					<ContextMenu title="Navigation Options" style={{float: 'right', paddingTop: '8px'}} options={[
						{
							text: "Settings",
							onClick: e => {/*when settings modal is developed, need to trigger the display here*/}
						},
						{
							text: "Logout",
							onClick: e => modelApi.dispatch({type: 'LOGOUT'})
						}
					]}/>,
					this.renderAppTitle()
				].map((el, i, arr) => {
					const styles = i === 0 ? {float: 'left', height: '100%'} : {float: 'right', width: `${100 / (arr.length)}%`, height: '100%'}
					return (<span style={styles}>{el}</span>)
				})}
			</div>
		)
	}
}