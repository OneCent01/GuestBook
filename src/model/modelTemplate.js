// generates dummy product data... to be used for filling
// the model with data in the same shape as the user for 
// the purposes of development
const generateProducts = (howMany) => {
	let i = 0;
	const products = []
	while(i++ < howMany) {
		products.push({
			id: i,
			title: 'TEEEEEEST ITEM XXX',
			imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/817coo8RZ9L._SL1500_.jpg',
			barcode: 123456789123,
			stock: Math.floor(Math.random() * 10),
			currentPrice: 6.99,
			priceHistory: [
				{
					price: 6.99,
					date: Date.now() - 115741000
				},
				{
					price: 7.99,
					date: Date.now() - 200
				},
				{
					price: 4.99,
					date: Date.now() - 115741000
				}
			],
			salesHistory: [
				{
					date: Date.now() - 100,
					quantity: 1
				},
				{
					date: Date.now() - 115741000,
					quantity: 1
				},
				{
					date: Date.now() - 215741000,
					quantity: 2
				},
				{
					date: Date.now() - 415741000,
					quantity: 1
				}
			],
		})
	}
	return products
}




export default {
	authenticated: false,
	email: '',
	password: '',
	passwordConfirm: '',
	products: {
		userProducts: generateProducts(8),
		page: 0,
		selected: null,
		search: '',
		filters: [],
		sort: null,
		view: 'table' // 'add' || 'detail'
	},
	loginView: 'login',
	errors: [],
	tabs: ['Analytics', 'Activity', 'Products', 'Transactions'],
	tab: 'Analytics',
	transactions: [],
	contextOpen: false
}