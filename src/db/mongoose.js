const mongoose = require('mongoose')

connect()

async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log('connected to db')
	} catch (e) {
		console.log(e)
	}
}