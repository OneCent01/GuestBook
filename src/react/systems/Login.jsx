import React from 'react';

import InputText from '../components/InputText'
import Card from '../components/Card'

import modelApi from '../../model/modelApi.js'
import serverApi from '../../serverAPI/serverAPI'

// very simple email format validation ensuring the email is in in the form: _@_._
// anything more restrictive than that is too opinionated
const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

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
	},
	floatingInteractable: {
		cursor: 'pointer',
		margin: 'auto',
		width: 'fit-content'
	}
}

export default class Login extends React.Component {
	constructor(props) {
		super(props)

		this.validateLoginFormCredentials = () => new Promise((resolve, reject) => {
			const errors = []

			if(!this.props.email.length) {
				errors.push({type: 'login_email', value: 'enter_email'})
			} else if(!emailIsValid(this.props.email)) {
				errors.push({type: 'login_email', value: 'enter_valid_email'})
			}

			if(!this.props.password.length) {
				errors.push({type: 'login_password', value: 'enter_password'})
			} else if(this.props.password.length < 3) {
				errors.push({type: 'login_password', value: 'minimum_length-3'})
			}

			if(errors.length) {
				errors.forEach(err => modelApi.dispatch({type: 'ADD_ERROR', error: err}))
				reject()
			} else {
				resolve()
			}
		})

		this.validateSignupFormCredentials = () => new Promise((resolve, reject) => {
			const errors = []

			if(!this.props.email.length) {
				errors.push({type: 'signup_email', value: 'enter_email'})
			}

			if(!this.props.password.length) {
				errors.push({type: 'signup_password', value: 'enter_password'})
			}

			if(!this.props.passwordConfirm.length) {
				errors.push({type: 'signup_password_confirm', value: 'invalid_email_confirmation'})
			}

			if(this.props.password !== this.props.passwordConfirm) {
				errors.push({type: 'signup_password_confirm', value: 'require_match'})
			}

			if(errors.length) {
				errors.forEach(err => modelApi.dispatch({type: 'ADD_ERROR', error: err}))
				reject()
			} else {
				resolve()
			}
		})

		this.login = () => {
			serverApi.getUserData()
			.then(data => console.log('user data: ', data))
			.catch(err => console.log('something went wrong: ', err))
			modelApi.dispatch({
				type: 'SET_AUTHENTICATED'
			})
		}

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

		this.setPasswordConfirm = password => modelApi.dispatch({
			type: 'SET_PASSWORD_CONFIRMATION',
			password: password
		})

		this.dismissError = type => modelApi.dispatch({
			type: 'DISMISS_ERROR', 
			error: { type }
		})

		this.displaySignup = () => modelApi.dispatch({
			type: 'DISPLAY_SIGNUP'
		})

		this.displayLogin = () => modelApi.dispatch({
			type: 'DISPLAY_LOGIN'
		})

		this.authFail = (err) => modelApi.dispatch({
			type: 'ADD_ERROR',
			error: {
				type: 'auth_fail',
				value: 'invalid_credentials'
			}
		})
	}

	renderLoginForm() {
		const emailError = this.getError('login_email')
		const passwordError = this.getError('login_password')
		const authError = this.getError('auth_fail')

		const handleEmailFocus = (
			emailError !== null 
				? e => this.dismissError('login_email') 
				: null
		)
		const handlePasswordFocus = (
			(
				passwordError !== null 
				|| authError !== null
			)
			? e => {
				if(passwordError !== null) this.dismissError('login_password')
				if(authError !== null) this.dismissError('auth_fail')
			}
			: null
		)

		const handleFormSubmit = e => {
			e.preventDefault()
	
			this.validateLoginFormCredentials()
				.then(() => {
					serverApi.authUser(this.props.email, this.props.password)
					.then(res => {
						const parsedRes = JSON.parse(res)
						const token = parsedRes.token
						localStorage.setItem('token', token)

						parsedRes.success
						? this.login() 
						: this.authFail()

					})
					.catch(err => this.authFail(err))
				})
				.catch(() => console.log('Invalid login credentials'))
		}

		return (
			<div id="LoginForm" style={this.props.style || {}}>
				<Card>
					<form style={loginStyles.loginForm} onSubmit={handleFormSubmit}>
						<div style={loginStyles.headerText}>Login</div>
						<InputText
							autoFocus={true}
							title='Email'
							placeholder='Email Address'
							onFocus={handleEmailFocus}
							onChange={e => this.setEmail(e.target.value)}
							error={emailError}
							style={loginStyles.input}
						/>
						<InputText
							title='Password'
							placeholder='Password'
							onFocus={handlePasswordFocus}
							onChange={e => {
								if(handlePasswordFocus) handlePasswordFocus() // clears errors in case error was pressed to submit
								
								this.setPassword(e.target.value)
							}}
							error={passwordError || authError}
							style={loginStyles.input}
						/>
						<button type="submit">Submit</button>
					</form>
				</Card>
				<div style={loginStyles.floatingInteractable} onClick={e=>this.displaySignup()}>Signup</div>
			</div>
		)
	}

	renderSignupForm() {
		const emailError = this.getError('signup_email')
		const passwordError = this.getError('signup_password')
		const passwordConfirmError = this.getError('signup_password_confirm')

		const handleEmailFocus = (
			emailError !== null 
				? e => this.dismissError('signup_email') 
				: null
		)
		const handlePasswordFocus = (
			passwordError !== null 
				? e => this.dismissError('signup_password') 
				: null
		)
		const handlePasswordConfirmFocus = (
			passwordConfirmError !== null 
				? e => this.dismissError('signup_password_confirm') 
				: null
		)

		const handleSignupSubmit = e => {
			e.preventDefault()

			this.validateSignupFormCredentials()
			.then(() => {
				serverApi.addUser(this.props.email, this.props.password)
				.then(res => {
					const parsedRes = JSON.parse(res)
					if(parsedRes.success) {
						console.log('USER ADDED: ', parsedRes)
						this.login()
					} else {
						console.log('FAILED TO ADD USER: ', parsedRes.error)
					}
				})
				.catch(err => console.log('FAILED TO ADD USER: ', err))

			})
			.catch(err => console.log('FAILED TO ADD USER: ', err))
		}

		return (
			<div id="SignupForm" style={this.props.style || {}}>
				<Card>
					<form style={loginStyles.loginForm} onSubmit={handleSignupSubmit}>
						<div style={loginStyles.headerText}>Signup</div>
						<InputText
							autoFocus={true}
							title='Email'
							placeholder='Email Address'
							onFocus={handleEmailFocus}
							onChange={e => this.setEmail(e.target.value)}
							error={emailError}
							style={loginStyles.input}
						/>
						<InputText
							title='Password'
							placeholder='Password'
							onFocus={handlePasswordFocus}
							onChange={e => this.setPassword(e.target.value)}
							error={passwordError}
							style={loginStyles.input}
						/>
						<InputText
							title='PasswordConfirm'
							placeholder='Confirm Password'
							onFocus={handlePasswordConfirmFocus}
							onChange={e => this.setPasswordConfirm(e.target.value)}
							error={passwordConfirmError}
							style={loginStyles.input}
						/>
						<button type="submit">Submit</button>
					</form>
				</Card>
				<div style={loginStyles.floatingInteractable} onClick={e=>this.displayLogin()}>Back</div>
			</div>
		)
	}

	render() {
		return (
			<div id="Login">
				{
					this.props.loginView === 'login' ? this.renderLoginForm()
					: this.props.loginView === 'signup' ? this.renderSignupForm()
					: null
				}
			</div>
		)
	}
}