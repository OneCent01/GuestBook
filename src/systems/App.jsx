import React from 'react';

// usage: modelApi.dispatch(action)
import modelApi from '../model/modelApi.js'

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
			<div style={styles} className="Card">{content}</div>
		)
	}

	renderLogo() {

	}

	renderAppTitle() {

	}

	renderHeader() {
		return (
			<div id="Header">
				{[
					this.renderLogo(),
					this.renderAppTitle(),
					this.renderSettings()
				]}
			</div>
		)
	}

	renderDataTable() {
		return (
			null
		)
	}

	renderTabs() {
		return (
			null
		)
	}

	renderAnalytics() {
		return (
			null
		)
	}

	renderPatrons() {
		return (
			null
		)
	}

	renderFacesCatalogue() {
		return (
			null
		)
	}

	renderTransactions() {
		return (
			null
		)
	}

	renderProfile() {
		return (
			null
		)
	}

	renderSettings() {
		return (
			null
		)
	}

	renderTabContent() {
		const tab = this.props.tab
		return (
			tab === 'analytics' ? this.renderAnalytics()
			: tab === 'patrons' ? this.renderPatrons()
			: tab === 'faces' ? this.renderFacesCatalogue()
			: tab === 'profile' ? this.renderProfile()
			: null
		)
	}

	renderContent() {
		return (
			<div id="Content">
				{[
					this.renderTabs(),
					this.renderTabContent()
				]}
			</div>
		)
	}

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
				<form onSubmit={e => {
					e.preventDefault()

					// returns a promise, if resolved, the credentials are valid.
					// Otherwise, they are invalid and should have triggered an error
					this.validateCredentials()
						.then(this.login)
						.catch(() => console.log('Invalid login credentials'))
				}}>
					<h2>Login</h2>
					<div>
						<span>Email</span>
						<input 
							onFocus={e => modelApi.dispatch({type: 'DISMISS_ERROR', error: {type: 'login_email'}})} 
							onChange={e => modelApi.dispatch({type: 'SET_EMAIL', email: e.target.value})}
						/>
						{
							loginErrors.login_email 
								? <span>ERROR</span>
								: null
						}
					</div>
					<div>
						<span>Password</span>
						<input 
							onFocus={e => modelApi.dispatch({type: 'DISMISS_ERROR', error: {type: 'login_password'}})} 
							onChange={e => modelApi.dispatch({type: 'SET_PASSWORD', password: e.target.value})}
						/>
						{
							loginErrors.login_password
								? <span>ERROR</span>
								: null
						}
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)

		return this.renderCard(loginContent)
	}

	render() {
		const primaryContent = (
			this.props.authenticated
				? this.renderContent()
				: this.renderLogin()
		)

		return (
			<div id='App'>
				{[
					this.renderHeader(),
					primaryContent
				]}
			</div>
		)
	}

}