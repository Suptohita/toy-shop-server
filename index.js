const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId


require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000


// middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tv1bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect()

        const database = client.db('toy-shop')
        const productsCollection = database.collection('products-collection')
        const orderCollection = database.collection('orders-collection')
        const reviewCollection = database.collection('review-collection')

        // get all products 
        app.get('/allProducts', async (req, res) => {
            const cursor = productsCollection.find({})
            const products = await cursor.toArray()
            res.send(products)
        })

        // get specific product with id 
        app.get('/purchase/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await productsCollection.findOne(query)
            res.send(service)
        })

        // place order 
        app.post('/purchase', async (req, res) => {
            const data = req.body
            const result = await orderCollection.insertOne(data)
            res.send(result)
        })

        // my orders 
        app.get('/myOrders', async(req, res)=>{
            const cursor = orderCollection.find({})
            const orders = await cursor.toArray()
            res.send(orders)
        })

        // delete order 
        app.delete('/myorders/deleteorder/:id', async(req, res) => {
            const orderId = req.params.id
            const query = {_id: ObjectId(orderId)}
            const result = await orderCollection.deleteOne(query)
            res.send(result)
        })

        // taking user review
        app.post('/review/submit', async(req, res) => {
            const data = req.body
            const result = await reviewCollection.insertOne(data)
            res.send(result)
        })

        //get review
        app.get('/showreview', async(req, res) => {
            const cursor = reviewCollection.find({})
            const review = await cursor.toArray()
            res.send(review)
        })

    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir)


// testing 
app.get('/', (req, res) => {
    res.send('Server Running...')
})

// Listening Port 

app.listen(port, () => {
    console.log("Server is Running at", port)
})
