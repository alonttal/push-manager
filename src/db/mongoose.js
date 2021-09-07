const mongoose = require('mongoose')

mongoose.connect(proccess.env.MONGODB_URL)
.catch(e => console.log(e))