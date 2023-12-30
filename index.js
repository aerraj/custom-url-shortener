const express = require('express');
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const path = require('path')
const { connectMongoDb } = require('./connect')
const URL = require('./models/url');
const { url } = require('inspector');

const app = express();

PORT = 8000;
connectMongoDb("mongodb+srv://rishabhraj:rraj0046@url-cluster.sfjhlb6.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("MongoDB Connected"));

app.set('view engine', 'ejs');

app.set("views", path.resolve("./views"));

app.use(express.json())

app.use('/url', urlRoute)


app.get('/test', async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('test', { urls: allUrls })
})


app.get('/url/:shortId', async (req, res) => {
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