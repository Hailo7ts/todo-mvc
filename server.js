const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})//env file to hide data

//calling function to connect to db
connectDB()

app.set('view engine', 'ejs')//handles what engine views will use
app.use(express.static('public'))//styles and js

/**
 * Parses things that come from the body
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * app uses our routers
 */
app.use('/', homeRoutes)
app.use('/todos', todoRoutes)
 
/**
 * env variable for port for deployment
 */
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    