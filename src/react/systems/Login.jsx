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
			.then(res => {
				const parsedRes = typeof res === 'string' ? JSON.parse(res) : res
				if(parsedRes.success) {
					console.log('getUserData: ', parsedRes)
					modelApi.dispatch({
						type: 'SET_USER_DATA', 
						data: parsedRes.data
					})
				} else {
					console.log('FUCK, something went wrong: ', (parsedRes.errors || 'UNKOWN ERROR'))
				}
			})
			.catch(err => console.log('FUCK, something went wrong: ', err))

			modelApi.dispatch({ type: 'SET_AUTHENTICATED' })
		}

		this.authorizeUser = () => {
			// send an authentication request with the
			// same credentials to receive a signed token
			// for subsequent server calls
			serverApi.authUser(this.props.email, this.props.password)
			.then(authRes => {
				const parsedAuthRes = JSON.parse(authRes)
			
				// successful auth, we got the token
				if(parsedAuthRes.success) {
					const token = parsedAuthRes.token
			
					// set it to local storage for later reading
					localStorage.setItem('token', token)
			
					// request user data, then open the app with 
					// the user's data:
					this.login() 
				} else {
					this.authFail()
				}
			})
			.catch(err => this.authFail())
		}

		this.addUser = () => {
			// if they are, send the login info to the
			// server and ask it to create a user
			serverApi.addUser(this.props.email, this.props.password)
			.then(addRes => {
				const parsedAddRes = JSON.parse(addRes)
				
				// the user was added successfully
				parsedAddRes.success
					? this.authorizeUser()
					: this.authFail()
			})
			.catch(this.authFail)
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
				value: (
					(err && typeof err === 'string') 
					? err 
					: 'invalid_credentials'
				)
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
	
			// make sure the inputs are filled in as expected
			this.validateLoginFormCredentials()
				.then(this.authorizeUser)
				.catch(this.authFail)
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

			// make sure the inputs are filled in as expected
			this.validateSignupFormCredentials()
				.then(this.addUser)
				.catch(this.authFail)
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