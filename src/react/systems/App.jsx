import React from 'react';

import ContextMenu from './components/ContextMenu'
import InputText from './components/InputText'

// usage: modelApi.dispatch(action)
import modelApi from '../model/modelApi.js'

const {
	addUser,
	getUser
} = require('../serverAPI/serverAPI.js')

const appStyles = {
	evenFlex: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	inline: {
		display: 'inline-block',
		position: 'relative'
	}
}

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.validateCredentials = () => new Promise((resolve, reject) => {
			const errors = []

			if(!this.props.email.length) {
				errors.push({type: 'login_email', value: 'invalid_email'})
			} 

			if(!this.props.password.length) {
				errors.push({type: 'login_password', value: 'invalid_password'})
			}

			if(errors.length) {
				errors.forEach(err => modelApi.dispatch({type: 'ADD_ERROR', error: err}))
				reject()
			} else {
				resolve()
			}
		})

		this.login = () => {
			modelApi.dispatch({type: 'SET_AUTHENTICATED'})
		}
	}

	renderCard(content, styles) {
		return (
			<div 
				style={{
					width: 'fit-content', 
					boxShadow: '1px 1px 2px lightgrey', 
					padding: '12px',
					margin: 'auto',
					...styles
				}} 
				className="Card"
			>{content}</div>
		)
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

	renderHeader() {
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

	renderDataTable() {
		return (
			null
		)
	}

	renderTabs() {
		const tabs = ['Analytics', 'Patrons', 'Faces']
		return (
			<div style={{height: '100%', width: '150px', background: 'rgb(240,255,255)', borderRight: '1px solid lightgrey', display: 'inline-block'}}>
				{
					tabs.map(tab => {
						
						const tabStyles = {padding: '8px', fontSize: '20px'}
						if(this.props.tab === tab) {
							tabStyles.border = '1px solid lightgrey'
							tabStyles.background = 'rgb(205,249,249)'
						} else {
							tabStyles.cursor = 'pointer'
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

	renderAnalytics() {
		return (
			<div>ANAL HAH</div>
		)
	}

	renderPatrons() {
		return (
			<div>CLASSIFIED CUSTOMERS DASHBOARD</div>
		)
	}

	renderFacesCatalogue() {
		return (
			<div>LOG OF EVERY RECORDED FACE ENTERING THE STORE</div>
		)
	}

	renderTransactions() {
		return (
			<div>LOG OF EVERY TRANSACTION TAKING PLACE IN THE STORE</div>
		)
	}

	renderProfile() {
		return (
			<div>CUSTOMER PROFILE</div>
		)
	}

	renderTabContent() {
		const tab = this.props.tab
		return <div style={{display: 'inline-block', position: 'absolute', height: '100%', width: '100%'}}>{(
			tab === 'Analytics' ? this.renderAnalytics()
			: tab === 'Patrons' ? this.renderPatrons()
			: tab === 'Faces' ? this.renderFacesCatalogue()
			: null
		)}</div>
	}

	renderContent() {
		return (
			<div id="Content" style={{height: '100%'}}>
				{this.renderTabs()}
				{this.renderTabContent()}
			</div>
		)
	}

	// renderInput(options) {
	// 	return (
	// 		<div style={{...(options.style || {})}}>
	// 			{options.title ? <div style={{fontSize: '12px'}}>{options.title}</div> : null}
	// 			<input 
	// 				style={{width: '100%'}}
	// 				onFocus={options.onFocus ? options.onFocus : null} 
	// 				onChange={options.onChange ? options.onChange : null}
	// 			/>
	// 			{
	// 				options.error 
	// 					? <div style={{fontSize: '10px', color: 'red', fontStyle: 'italic'}}>{options.error}</div>
	// 					: null
	// 			}
	// 		</div>
	// 	)
	// }

	renderLogin() {
		const loignErrorTypes = ['login_email', 'login_password']
		const loginErrors = this.props.errors.reduce((acc, err) => {
			if(loignErrorTypes.includes(err.type)) {
				acc[err.type] = err.value
			}
			return acc
		}, {})

		const loginContent = (
			<div id="Login">
				<form style={{width: '400px'}} onSubmit={e => {
					e.preventDefault()

					// returns a promise, if resolved, the credentials are valid.
					// Otherwise, they are invalid and should have triggered an error
					this.validateCredentials()
						.then(this.login)
						.catch(() => console.log('Invalid login credentials'))
				}}>
					<div style={{fontSize: '24px', fontWeight: 'bold', paddingBottom: '12px'}}>Login</div>
					<InputText
						title='Email'
						onFocus={e => modelApi.dispatch({type: 'DISMISS_ERROR', error: {type: 'login_email'}})}
						onChange={e => modelApi.dispatch({type: 'SET_EMAIL', email: e.target.value})}
						error={loginErrors.login_email}
						style={{paddingBottom: '12px'}}
					/>
					<InputText
						title='Password'
						onFocus={e => modelApi.dispatch({type: 'DISMISS_ERROR', error: {type: 'login_password'}})}
						onChange={e => modelApi.dispatch({type: 'SET_PASSWORD', password: e.target.value})}
						error={loginErrors.login_password}
						style={{paddingBottom: '12px'}}
					/>

					{
						// [
						// 	this.renderInput(),
						// 	this.renderInput({
						// 		title: 'Password',
						// 		onFocus: e => modelApi.dispatch({type: 'DISMISS_ERROR', error: {type: 'login_password'}}),
						// 		onChange: e => modelApi.dispatch({type: 'SET_PASSWORD', password: e.target.value}),
						// 		error: loginErrors.login_password,
						// 		style: {paddingBottom: '12px'}
						// 	})
						// ]
					}
					<button type="submit">Submit</button>
				</form>
				{
					// these are just to use for testing the backend server calls...
					/*
					*/
				}
						<button onClick={e => addUser('anotha@gmail.com', '420LOL').then(res => console.log('res: ', res)).catch(err => console.log(err))}>ADD USER</button>
						<button onClick={e => getUser({email: 'anotha.one@gmail.com'}).then(res=>console.log('res: ', res)).catch(err => console.log(err))}>GET DAT USER</button>
			</div>
		)

		return this.renderCard(loginContent, {marginTop: '24px'})
	}

	render() {
		const primaryContent = (
			this.props.authenticated
				? this.renderContent()
				: this.renderLogin()
		)

		return (
			<div id='App' style={{height: '100%'}}>
				{[
					this.renderHeader(),
					primaryContent
				]}
			</div>
		)
	}

}