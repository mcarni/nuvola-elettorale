data = require('../data.js')
const websiteName = data.websiteName;
var twitterUser = data.twitterUser;
var startDate = data.startDate;
var list = data.list;

const express = require("express");
// Create a new express application object
const router = express();

//middleware
router.use("/static", express.static("static"));

router.get("/wordcloud", (req, res) => {
    res.render('wordcloud.ejs', {
        websitename: websiteName,
        twitteruser: twitterUser,
        startdate: startDate,
        outputlist: list
    })
});

module.exports = router;
