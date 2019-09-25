const host = 'http://localhost:3000'

const fetch = (method, url, payload=undefined) => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest()

	request.addEventListener("load", e => resolve(e.target.response))
	request.addEventListener("error", reject)
	request.addEventListener("abort", reject)

	request.open(method, url)
	request.setRequestHeader("Content-type", "application/json")

	const token = localStorage.getItem('token')
	if(token) {
		request.withCredentials = true
		request.setRequestHeader('Authorization', token)
	}

	payload ? request.send(payload) : request.send()
})

const addUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ 
		email: email, 
		password: password
	})
	
	fetch('POST', `${host}/add-user`, [userData])
	.then(resolve)
	.catch(reject)
})

const authUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ email, password })
	
	fetch('POST', `${host}/auth-user`, [userData])
	.then(resolve)
	.catch(reject)
})

const getUserData = () => new Promise((resolve, reject) => {
	fetch('GET', `${host}/user-data`)
	.then(resolve)
	.catch(reject)
})

const scanProduct = barcode => new Promise((resolve, reject) => {
	fetch('GET', `${host}/scan-product?barcode=${barcode}`)
	.then(resolve)
	.catch(reject)
})

const addUserProduct = (barcode, product_id, price, stock=-1) => new Promise((resolve, reject) => {
	const productData = JSON.stringify({ barcode, product_id, stock })
	fetch('POST', `${host}/add-user-product`, [productData])
	.then(resolve)
	.catch(reject)
})

const serverApi = {
	addUser,
	authUser,
	scanProduct,
	getUserData,
	addUserProduct
}

export default serverApi