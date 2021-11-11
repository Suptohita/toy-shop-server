const express = require('express')
const cors = require('cors')
const {MongoClient} = require('mongodb')

const app = express()
const port = process.env.PORT || 8000

// middleware 
app.use(cors())
app.use(express.json())


// testing 
app.get('/', (req, res) =>{
    res.send('Server Running...')
})

// Listening Port 

app.listen(port, () => {
    console.log("Server is Running at", port)
})
