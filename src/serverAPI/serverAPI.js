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
	const userData = JSON.stringify({ email, password })

	ajax('POST', 'http://localhost:3000/add-user', [userData])
	.then(res => resolve(res))
	.catch(err => reject(err))
})

const getUser = (data) => new Promise((resolve, reject) => {
	const lookup = {
		key: (
			data.email ? 'email' 
			: 'id'
		),
		value: (
			data.email ? data.email 
			: data.index ? data.index 
			: 1
		)
	}
	requestUrl = `http://localhost:3000/get-user?${lookup.key}=${lookup.value}`

	ajax('GET', requestUrl)
	.then(res => resolve(res))
	.catch(err => reject(err))
})

module.exports = {
	addUser,
	getUser
}