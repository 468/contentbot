var browser = require('./browser.js')
var social = require('./social.js')
var Twit = require('twit');
T = new Twit({
    consumer_key:         'private'
  , consumer_secret:      'private'
  , access_token:         'private'
  , access_token_secret:  'private'
});

exports.T = T;

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app).listen(0)
  , io = require('socket.io')(server);

module.exports.emitNewSite = io;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use("/assets", express.static(__dirname + '/assets'));


var recent_tweets = [];

var updateRecentTweets = function(){
	recent_tweets = [];
	T.get('statuses/user_timeline', { screen_name: 'contentbot2k15', count: 10 }, function (err, data, response) { 
		for(i=0;i<data.length;i++){
  			recent_tweets[i] = { text: data[i].text , created_at: data[i].created_at };
  		}
	});
}

updateRecentTweets();

setInterval(function(){ 
	updateRecentTweets();
}, 300000); //that's 5 minutes



setInterval(function(){ 
	process.exit();
}, 1200000); //that's 20 minutes

var stream = T.stream('statuses/filter', { follow : ['3044815678'] });
stream.on('tweet', function (tweet) {
  io.emit('new tweet', { text: tweet.text, created_at: tweet.created_at } );
  console.log('tweet emitted...')
});

exports.emitNewSite = function(currentsite){
	current_site = currentsite;
	io.emit('new site', currentsite);
	console.log('screenshot emitted...')
	console.log('current site being broadcast is ' + current_site.pagetitle + ", " + current_site.pageurl)
}


// enable \/

browser.startSurfing('new_session'); 


//io.on('connection', function(socket){
  //console.log('a user connected');
//});


// browser.blah

app.get('/', function(req,res){
	res.render("index",{
		current_site: browser.getCurrentSite(),
		recent_tweets: recent_tweets//,
		//recent_tweets_length: Object.keys(recent_tweets).length
	});
});