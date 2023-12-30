const shortid = require('shortid');

const URL = require('../models/url');


async function handleGenerateNewShortUrl(req, res) {

    const body = req.body
    if (!body.url) res.status(400).json({ status: "URL is required" })
    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.render("home",{ id: shortId })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId: shortId })
    if (!entry) return res.status(404).json({ status: "No such URL found" })
    return res.json({ totalClicks:entry.visitHistory.length,visitHistory: entry.visitHistory })
}

module.exports = { handleGenerateNewShortUrl,handleGetAnalytics };