import React from 'react';

import modelApi from '../../model/modelApi.js'

import InputText from '../components/InputText'
import Card from '../components/Card'

import serverApi from '../../serverAPI/serverAPI'


const loginStyles = {
	loginForm: {
		width: '400px'
	},
	headerText: {
		fontSize: '24px', 
		fontWeight: 'bold', 
		paddingBottom: '12px'
	},
	input: {
		paddingBottom: '12px'
	}
}

export default class Login extends React.Component {
	constructor(props) {
		super(props)

		this.validateLoginFormCredentials = () => new Promise((resolve, reject) => {
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

		this.login = () => modelApi.dispatch({
			type: 'SET_AUTHENTICATED'
		})

		this.getError = targetError => {
			const error = this.props.errors.find(err => targetError === err.type)
			return error ? error.value : null
		}

		this.setEmail = email => modelApi.dispatch({
			type: 'SET_EMAIL', 
			email: email
		})
		
		this.setPassword = password => modelApi.dispatch({
			type: 'SET_PASSWORD', 
			password: password
		})

		this.dismissError = type => modelApi.dispatch({
			type: 'DISMISS_ERROR', 
			error: { type }
		})
	}

	render() {
		const emailError = this.getError('login_email')
		const passwordError = this.getError('login_password')

		const handleEmailFocus = (
			emailError !== null 
				? e => this.dismissError('login_email') 
				: null
		)
		const handlePasswordFocus = (
			passwordError !== null 
				? e => this.dismissError('login_password') 
				: null
		)

		const handleFormSubmit = e => {
			e.preventDefault()
	
			this.validateLoginFormCredentials()
				.then(this.login)
				.catch(() => console.log('Invalid login credentials'))
		}

		return (
			<div id="Login" style={this.props.style || {}}>
				<Card>
					<form style={loginStyles.loginForm} onSubmit={handleFormSubmit}>
						<div style={loginStyles.headerText}>Login</div>
						<InputText
							autoFocus={true}
							title='Email'
							onFocus={handleEmailFocus}
							onChange={e => this.setEmail(e.target.value)}
							error={emailError}
							style={loginStyles.input}
						/>
						<InputText
							title='Password'
							onFocus={handlePasswordFocus}
							onChange={e => this.setPassword(e.target.value)}
							error={passwordError}
							style={loginStyles.input}
						/>
						<button type="submit">Submit</button>
					</form>
				</Card>
			</div>
		)
	}
}