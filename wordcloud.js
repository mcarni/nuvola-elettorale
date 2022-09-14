// wordcloud.js -- generates the wordcloud data 

const needle = require('needle');
const bearerToken = process.env.BEARER_TOKEN;

var userTweetsList = [[]];
var userTweetsListLength = "";

const getUserTweets = async (_userId, _daysBefore, myCallback) => {
    
    // taken from Tweeter examples, slightly modified, added myCallback
    
    let userTweets = [];
    
    url = `https://api.twitter.com/2/users/${_userId}/tweets`;
    
    // I play with Date() to be able to change the 
    let day = new Date();
    let month = day.getMonth();
    let year = day.getFullYear();
    let newDay = day.getDate() - _daysBefore;
    let newDate = new Date(year, month, newDay);

    
    // we request the author_id expansion so that we can print out the user name later
    let params = {
        //"start_time": "2022-08-06T00:00:01Z",
        "start_time": newDate.toISOString(),
        "max_results": 100,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    //console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }



    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${_userId}) since ${newDate.toDateString()}!`);

    output = myCallback(await userTweets);
    
   

    return output;

}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            // console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}


const generateWordList = async (_userTweets) => {

    let userTweetsText = "";
    //let userTweetsList = [[]];
    
    for (var i = 0, len = _userTweets.length; i < len; i++) {
        userTweetsText += _userTweets[i].text+" " ;
    }
    
    // remove emojiis 
    // https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
    // answer 33 from hababr
    //userTweetsText = userTweetsText.replace(/\p{Emoji}/gu, '');
    userTweetsText = userTweetsText.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
    // remove urls
    userTweetsText = userTweetsText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    // remove ,.;:!?
    userTweetsText = userTweetsText.replace(/[,.;:!?\s]/g, ' ');
    // remove RT
    //userTweetsText = userTweetsText.replace(/\s[RT]\s/g, '');
    // all lower case
    userTweetsText = userTweetsText.toLowerCase();
    // remove italian prepositions and others plus additional spaces
    let uselessWords = ["di", "a", "da", "in", "con", "su", "per", "tra", "fa",
                        "del", "dello", "dell'", "della", "dei", "degli", "delle",
                        "al", "allo", "all'", "alla", "ai", "agli", "alle",
                        "dal", "dallo", "dall'", "dalla", "dai", "dagli", "dalle",
                        "nel", "nello", "nell'", "nella", "nei", "negli", "nelle", 
                        "sul", "sullo", "sull'", "sulla", "sui", "sugli", "sulle",
                        "e", "o", "or", "é", "è", "che",
                        "ci", "vi", "ne", "si",
                        "il", "lo", "la", "le", "i", "gli", "l'", "un", "una", "un'", "uno",
                        "(1/1)", "(1/2)", "(1/3)", "(1/4)", "(1/5)",
                        "(2/2)", "(2/3)", "(2/4)", "(2/5)", "(3/3)", "(3/4)", "(3/5)", "(4/4)", "(4/5)", "(5/5)",
                        "rt"];
    let expStr = uselessWords.join("|");
    userTweetsText = userTweetsText.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
                    .replace(/\s{2,}/g, ' ');
    //userTweetsText = userTweetsText.replace(/\s[di]\s/g, '');
    // remove additional spaces
    //userTweetsText = userTweetsText.replace(/\s+/g, ' ')
    let words = [];
    words = userTweetsText.split(' ');
    //words = ["pupi","popa","pier","pier","popa","popa","pupi","pupi","pupi","pier","pier"];
    let userTweetsObj = {};
    //let userTweetsList = [[]];
    words.forEach(function(el, i, arr) {
        userTweetsObj[el] = userTweetsObj[el] ? ++userTweetsObj[el] : 1;
    });
    // my attempt at transforming an obj into the list required by wordcloud
    Object.entries(userTweetsObj).forEach(function(el, i, arr) {
        userTweetsList[i] = [Object.keys(userTweetsObj)[i],Object.values(userTweetsObj)[i]];
    });

    return userTweetsList;
 
}


module.exports = {
  generateWordList : generateWordList,
  getUserTweets : getUserTweets,
  userTweetsList: userTweetsList
};

