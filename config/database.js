const mongoose = require('mongoose')

/**
 * Function to connect to database
 */
const connectDB = async () => {
  try {
    /**
     * await response from mongodb for connection using environment 
     * variable to get connection string
     */ 
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

//export function
module.exports = connectDB
