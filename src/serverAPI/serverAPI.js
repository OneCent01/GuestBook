const crypto = require('crypto');

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
	crypto.pbkdf2(
		password, 
		salt, 
		1000, 
		128, 
		'sha512', 
		(err, key) => {
			(err && err !== null) 
			? reject(err) 
			: resolve(key)
		}
	)
})

const addUser = (email, password) => new Promise((resolve, reject) => {
	hash(password).then(hashedPassTypeArray => {
		const userData = JSON.stringify({ 
			email: email, 
			password: Array.from(hashedPassTypeArray).toString() 
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