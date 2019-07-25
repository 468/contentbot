var phantom=require('node-phantom-simple');
var app = require('./app.js')
var social = require('./social.js')
var jsdom = require("jsdom");
var webshot = require('webshot');

var seedsites = [ 
  'http://www.reddit.com'
  , 'http://www.yahoo.com'
  , 'http://www.weibo.com'
  , 'http://www.kinja.com'
  , 'http://www.thechive.com'
  , 'http://www.elitedaily.com'
  , 'http://www.buzzfeed.com'
  , 'https://www.tumblr.com/explore/trending'
  , 'http://www.imgur.com'
  , 'http://www.vox.com'
  , 'http://www.youtube.com'
  , 'http://www.slate.com'
  , 'http://www.vice.com'
  , 'http://www.espn.com'
  , 'http://www.theguardian.com'
  , 'http://www.drudgereport.com'
  , 'http://www.viralnova.com'
  , 'http://www.distractify.com'
  , 'http://www.playbuzz.com'
  , 'http://www.foxnews.com'
  , 'http://www.ranker.com'
  , 'http://www.zergnet.com'
  , 'http://www.upworthy.com'
  , 'http://www.theblaze.com'
  , 'http://knowyourmeme.com'
  , 'http://www.dailydot.com'
  , 'http://www.complex.com'
  , 'http://www.cracked.com'
  , 'http://www.gawker.com'
  , 'http://memebase.cheezburger.com'
  , 'http://www.motherjones.com'
  , 'http://www.collegehumor.com'
  , 'http://uproxx.com'
  , 'http://www.digg.com'
  , 'http://www.funnyordie.com'
  , 'http://www.salon.com'
  , 'http://mic.com'
  , 'http://conservativetribune.com'
  , 'http://www.wikipedia.com'
  , 'http://www.mashable.com'
  , 'http://www.eonline.com'
  , 'http://www.thedailybeast.com'
  , 'http://www.flavorwire.com'
  , 'http://www.bleacherreport.com'
  , 'http://www.qz.com'
  , 'http://www.medium.com'
  , 'http://twentytwowords.com'
  , 'http://www.tpnn.com'
  , 'http://www.breitbart.com'
  , 'http://www.theguardian.com'
  , 'http://www.refinery29.com'
  , 'http://www.amazon.com'
  , 'http://www.faithit.com'
  , 'http://www.ebay.com'
  , 'https://storify.com/browse'
  , 'http://www.washingtonpost.com'
  , 'http://www.theonion.com'
  , 'http://www.theatlantic.com'
  , 'http://www.tmz.com'
  , 'http://narrative.ly/'
  , 'http://www.9gag.com'
  , 'http://www.boredpanda.com'
  , 'http://www.huffingtonpost.com'
  , 'http://www.nytimes.com'
  , 'http://twistedsifter.com'
  , 'http://www.wikia.com'
  , 'http://www.dailymail.co.uk'
  , 'http://www.chinadaily.com.cn'
  , 'http://www.techcrunch.com'
  , 'http://www.flickr.com/explore'
  , 'http://www.vimeo.com/watch'
  , 'http://www.etsy.com'
  , 'http://www.forbes.com'
  , 'http://www.time.com'
  , 'http://www.mashable.com'
  , 'http://www.twitch.tv/directory'
  , 'http://www.soundcloud.com/explore'
  , 'http://www.walmart.com'
  , 'http://www.wikihow.com'

]


var pickRandom = function(array){
  return array[Math.floor(Math.random() * array.length)];
}


var rollDice = function(max,min){
  return Math.floor(Math.random()*(max-min+1)+min);
}

var randSocialNetwork = function(){

}


var postToTwitter = function(){

}

var postToFacebook = function(){

}

var postToPinterest = function(){
  // new post emit i guess
}

/*
var updateScreen = function(url, linkcollection,body){
  console.log('recieved at updatescreen')

  if(!url){
    console.log('no url')
    exports.startSurfing('new_session');
    return;
  }

  phantom.create(function (err,ph) {
    if(err || !(ph) ){
      console.log("phantom.create  went wrong")
      console.log(err)
      ph.exit();
      exports.startSurfing('new_session');
      return;
    }
    console.log('phantom creating')
    ph.createPage(function (err,page) {
      if(err || !(page) ){
          console.log("ph.createpage open went wrong")
          console.log(err)
          ph.exit();
          exports.startSurfing('new_session');
          return;
        }
      console.log('createpage')
      //page.settings.resourceTimeout(5000);
      page.set('settings.resourceTimeout', 5000);
      page.set('onResourceTimeout', function(){
         console.log('U timed out');
      })


      var page_opened = false;

      page.open(url, function (err,status) {
        page_opened = true;
        if(err || !(status) ){
          console.log("page.open went wrong")
          console.log(err)
          page.close(function(){
            ph.exit();
          });
          exports.startSurfing('new_session');
          return;
        }
        console.log('page.open')
        if(status == 'success'){
          page.evaluate(function () {
            return document.title;
          }, function (err,result) {
            console.log('taking screenshot of ' + url)
            page.set('viewportSize', {width:1600,height:900})
            page.set('clipRect', {width:1600,height:900})
            page.render('assets/models/screen.jpg', function(){
              console.log('screenshot taken...');
              app.emitNewSite({'pagetitle': result, 'pageurl': url});
              page.close(function(){
                console.log('exiting phantom')
             
                ph.exit();
              })
              nextAction( pickRandom(linkcollection), body );
            });
          });
        }
        else{
          console.log('failed to take screenshot of ' + url)
          page.close(function(){
            console.log('exiting phantom')
          
            ph.exit();
          })
          exports.startSurfing('new_session');
        }
      });
      setTimeout(function(){
       if(page_opened== false){
        console.log( url + ' crashed?')
        ph.exit();
        exports.startSurfing('new_session');
       } else {
        console.log('all should be good for ' + url)
       }
        }, 15000);
      console.log('page open bottom')
    });
  });
}

*/

var updateScreen = function(url, title, linkcollection,body){
  var options = {
    quality: 45,
    windowSize: {
      width: 1600,
      height: 900
    },
    shotSize: {
      width: 1600,
      height: 900
    },
    //userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    errorIfStatusIsNot200: true,
    timeout: 15000
  }


  webshot(url, 'assets/models/screen.jpg', options, function(err) {
    if(err){
      console.log('screenshot failed')
      exports.startSurfing('new_session');
    } else {
      console.log('screenshot taken')
      app.emitNewSite({'pagetitle': title, 'pageurl': url});
      nextAction( pickRandom(linkcollection), body );
    }

  });


}

var current_site = {};

exports.getCurrentSite = function(){
  return current_site;
}

exports.startSurfing = function(url){
  if( (!url) || url=='new_session' ){
    console.log('starting fresh sesh')
    url = pickRandom(seedsites);
  }
 
  jsdom.env(url, ["http://code.jquery.com/jquery.js"], function (errors, window) {
    if( errors || !window ){
      console.log("couldn't load " + url + 'in jsdom')
      exports.startSurfing('new_session');
      if(window){
        window.close();
        console.log('jsdom window closed')
      }
    } else {
      console.log('loaded ' + url + ' in jsdom')
      var linkcollection = []
      title = window.$('title').text();
      body = window.$('body').html();
      links = window.$('a'); //jquery get all hyperlinks
      links.each(function(i, link){
        if( urlIsInteresting( link.href ) ){
          linkcollection.push( link.href );
        }
      });
      console.log('sending to screen update...')
      updateScreen(url, title, linkcollection, body);
      current_site = { url: url, title: title };
      window.close();
      console.log('jsdom window closed')
    }


  });
};

var urlIsInteresting = function(url){
  var ignore = ['about', 'mailto', 'register', 'search', 'settings', '#', 'support', 'advertise', 'javascript:', 'jobs', 'licenses', 'policy', 'corrections', 'tos', 'help', '@', ';', '.js', '.php', 'careers', 'jobs', 'terms', 'advertising', 'login', 'contact', 'signup', 'signin', 'dev', 'submit', 'privacy', 'api', 'developers', 'privacypolicy']
  var interesting = true;

  for(var i=0;i<ignore.length;i++){
    if(url.indexOf(ignore[i]) >= 0){
      interesting = false;
    }
  }
  return interesting;
}

var nextAction = function(url, body){


// LOAD BODY EARLY DURIN JQUERY BIT??? && PASS IT AROUND..???

// wait a few secs then figure out what move to make next
// 
  setTimeout(function () {
    var roll = rollDice(239,1);
    console.log('rolled a ' + roll)


    if( (roll % 6 == 0) || (!url) ){
      exports.startSurfing('new_session');
    } else if( roll % 233 == 0 && linkIsDeep(url) ){
      console.log('link deep')
      social.postToTwitter(url, body);
      exports.startSurfing('new_session');
    } else {
      exports.startSurfing(url);
    }
  }, rollDice(10000,5000));
}


var linkIsDeep = function(link){
  // if link is x long and contains x / ?
  if( ( (link.match(/\//g) || []).length > 4) || link.length > 25 ){
    return true;
  }
  else{
    return false;
  }
}