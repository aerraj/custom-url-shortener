const express = require('express');

const urlRoute = require('./routes/url')

const { connectMongoDb } = require('./connect')
const URL = require('./models/url')

const app = express();

PORT = 8000;
connectMongoDb("mongodb+srv://rishabhraj:rraj0046@url-cluster.sfjhlb6.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("MongoDB Connected"));

app.use(express.json())

app.use('/url', urlRoute)


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({ shortId: shortId }, {
        $push: {
            visitHistory: {
                timestamp: new Date(),
            }
        }
    })

    res.redirect(entry.redirectURL)
})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});