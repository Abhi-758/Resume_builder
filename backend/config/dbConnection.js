const mongoose = require('mongoose')

async function connectdb() {
    try {
        let conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Connected to ${conn.connection.host}`)
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message)
        }
        else {
            console.log("Error connecting with mongodb")
        }
    }
}

module.exports = connectdb