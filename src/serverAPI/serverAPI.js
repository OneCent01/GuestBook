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

const addUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ 
		email: email, 
		password: password
	})
	
	ajax('POST', 'http://localhost:3000/add-user', [userData])
	.then(resolve)
	.catch(reject)
})

const authUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ 
		email: email, 
		password: password
	})
	
	ajax('POST', 'http://localhost:3000/auth-user', [userData])
	.then(resolve)
	.catch(reject)
})

const getUser = (data) => new Promise((resolve, reject) => {
	const param = data.email ? 'email' : 'id'

	const value = (
		data.email ? data.email 
		: data.index ? data.index 
		: 1
	)

	ajax('GET', `http://localhost:3000/get-user?${param}=${value}`)
	.then(resolve)
	.catch(reject)
})

const serverApi = {
	addUser,
	getUser,
	authUser
}

export default serverApi