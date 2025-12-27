const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // <-- must be before routes

// MongoDB setup
const uri = "mongodb+srv://practice:GjhJ9UTcWqgMDiOm@cluster0.knekqnq.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db('messagedb');
        const messageCollection = database.collection('messages');

        // GET all messages
        app.get('/message', async (req, res) => {
            const messages = await messageCollection.find().toArray();
            res.json(messages);
        });

        // POST a new message
        app.post('/message', async (req, res) => {
            const newMessage = req.body; // { message: "text" }
            const result = await messageCollection.insertOne(newMessage);
            res.json(result);
        });

        // DELETE all messages
        app.delete('/message', async (req, res) => {
            const result = await messageCollection.deleteMany({});
            res.json(result);
        });

    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);

// Test route
app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
