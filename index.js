const express = require('express')
const cors = require('cors')
const {MongoClient} = require('mongodb')

const app = express()
const port = process.env.PORT || 8000


// middleware 
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://toy-shop:aUsbB2fXGWfFgldH@cluster0.tv1bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try{
        await client.connect()
        
        const database = client.db('toy-shop')
        const productsCollection = database.collection('products-collection')

        // get all products 
        app.get('/allProducts', async(req, res) => {
            const cursor = productsCollection.find({})
            const products = await cursor.toArray()
            res.send(products)
        })


    }
    finally{
        // await client.close()
    }
}

run().catch(console.dir)


// testing 
app.get('/', (req, res) =>{
    res.send('Server Running...')
})

// Listening Port 

app.listen(port, () => {
    console.log("Server is Running at", port)
})
