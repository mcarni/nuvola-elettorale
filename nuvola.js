// nuvola.js -- main file

require('dotenv').config();

data = require('./data.js')
wordcloud = require('./wordcloud.js')

const express = require("express");
// Create a new express application object
const app = express();
/*
const websiteName = "Nuvola Elettorale"
var twitterUser = "";
var startDate = 1;
var list = [];
*/

//middleware
app.use("/static", express.static("static"));

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


const homeRoute = require('./routes/home.js');
const wordcloudRoute = require('./routes/wordcloud.js');

app.use(homeRoute);
app.use(wordcloudRoute);


/*
app.get("/", (req, res) => {
    res.render('index.ejs', {
        websitename: websiteName,
        twitteruser: twitterUser,
        startdate: startDate,
        outputlist: list,
        data: data
    })
});



// Access the parse results as request.body
app.post('/', (req, res)=>{

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
      list = await output[0];
      length = await output[1];

        res.render('wordcloud.ejs', {
          websitename: websiteName,
          twitteruser: twitterUser,
          startdate: startDate,
          outputlist: list,
          data: data
        })
    })()

});

app.get("/wordcloud", (req, res) => {
    res.render('wordcloud.ejs', {
        websitename: websiteName,
        twitteruser: twitterUser,
        startdate: startDate,
        outputlist: list,
        data: data
    })
});
*/

// run your application, so it listens on port 4444
app.listen(process.env.PORT, () => {
    console.log("Server is Listening on port : " + process.env.PORT)
});


