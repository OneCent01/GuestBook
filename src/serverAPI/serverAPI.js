// const fs = require('fs')
const argon2 = require('argon2')

const ajax = (method, url, payload=undefined) => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest()

	request.addEventListener("load", e => resolve(e.target.response))
	request.addEventListener("error", reject)
	request.addEventListener("abort", reject)

	request.open(method, url)
	request.setRequestHeader("Content-type", "application/json");

	payload 
		? request.send(payload)
		: request.send()
})

const salt = 'caramel'

const hash = (password) => new Promise((resolve, reject) => {
	try {
		argon2.hash(password)
			.then(resolve)
			.catch(reject)
	} catch(e) {
		reject(e)
	}
})

const addUser = (email, password) => new Promise((resolve, reject) => {
	hash(password).then(hash => {
		console.log('ARGON2 HASHED PASS: ', hash)
		const userData = JSON.stringify({ 
			email: email, 
			password: hash
		})
	
		ajax('POST', 'http://localhost:3000/add-user', [userData])
		.then(res => resolve(res))
		.catch(err => reject(err))
	})
})

const getUser = (data) => new Promise((resolve, reject) => {
	const param = (
		data.email ? 'email' 
		: 'id'
	)
	const value = (
		data.email ? data.email 
		: data.index ? data.index 
		: 1
	)

	ajax('GET', `http://localhost:3000/get-user?${param}=${value}`)
	.then(res => resolve(res))
	.catch(err => reject(err))
})

module.exports = {
	addUser,
	getUser
}