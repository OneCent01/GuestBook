const ajax = (method, url, payload=undefined) => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest()
	

	request.addEventListener("load", e => resolve(e.target.response))
	request.addEventListener("error", reject)
	request.addEventListener("abort", reject)

	request.open(method, url)

	payload 
		? request.send(payload)
		: request.send()
}); 

const createFormData = (dataObj) => {
  const formData = new FormData()
  Object.keys(dataObj).forEach(key =>{
    formData.append(key, dataObj[key])
  })
  return formData
}

const addUser = (email, password) => {
	const userData = JSON.stringify({ email, password })
	ajax('POST', 'http://localhost:3000/add-user', userData)
	.then(res => console.log('res :', res))
	.catch(err => console.log(err))

}

module.exports = {
	addUser
}