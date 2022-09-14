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



router.get("/", (req, res) => {
    res.render('index.ejs', {
        websitename: websiteName,
        twitteruser: twitterUser,
        startdate: startDate,
        outputlist: list
    })
});

router.get("/index", (req, res) => {
    res.render('index.ejs', {
        websitename: websiteName,
        twitteruser: twitterUser,
        startdate: startDate,
        outputlist: list
    })
});

// Access the parse results as request.body
router.post('/', (req, res)=>{

    var postData = req.body;
    
    var wordlist = [];
    
    twitterUser = postData.user;
    startDate = postData.date;
    
    // for testing
    //console.log(postData);

    ;(async () => {
      var output = await wordcloud.getUserTweets(twitterUser, startDate, wordcloud.generateWordList)
      
      let list = "";
      let length = "";
      list = await output;
      length = await output;

        res.render('wordcloud.ejs', {
          websitename: websiteName,
          twitteruser: twitterUser,
          startdate: startDate,
          outputlist: list
        })
    })()

});

module.exports = router;
