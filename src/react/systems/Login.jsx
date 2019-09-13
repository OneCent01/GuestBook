import React from 'react';

import modelApi from '../../model/modelApi.js'


import InputText from '../components/InputText'
import Card from '../components/Card'

export default class Login extends React.Component {
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

	render() {
		const loignErrorTypes = ['login_email', 'login_password']
		const loginErrors = this.props.errors.reduce((acc, err) => {
			if(loignErrorTypes.includes(err.type)) {
				acc[err.type] = err.value
			}
			return acc
		}, {})
		return (
			<div id="Login" style={this.props.style || {}}>
				<Card>
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
							autoFocus={true}
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
						<button type="submit">Submit</button>
					</form>
				</Card>
			</div>
		)
	}
}