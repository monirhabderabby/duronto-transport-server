const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//useMiddleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@duronto-transport-agenc.afukxir.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        console.log("connected");
        const programmeCollection = client
            .db("programmeCollection")
            .collection("programme");

        app.get("/allProgramme", async (req, res) => {
            const filter = {};
            const result = await programmeCollection.find(filter).toArray();
            res.send(result);
        });

        app.post("/newProgramme", async (req, res) => {
            const programme = req.body;
            console.log(programme);
            const result = await programmeCollection.insertOne(programme);
            res.send(result);
        });
    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
