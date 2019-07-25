var jsdom = require("jsdom");
var request = require('request');
var app = require('./app.js')

var positivewords = ['good', 'wow', 'classic', 'victory', 'victorious', 'motivating', 'fabulous', 'brilliant', 'super', 'great', 'champion', 'special', 'amazing', 'nice', 'cute', 'love it', 'awesome', 'loving life', 'beautiful', 'made my day', 'admired', 'nailed it', 'nails it', 'epic', 'impressive', 'sweet', 'make your day', 'uplifting', 'generous', 'badass', 'glorious', 'adorable', 'best', 'happy', 'joy', 'joyful', 'cute', 'delightful', 'fantastic']
var desirewords = ['want', 'wealthy', 'need', 'buy', 'must-have', 'need this', 'instacop', 'must buy', 'top buy', 'bargain', 'selling fast', 'purchase', 'good product', 'great product']
var funnywords = ['funny', 'joke', 'prank', 'hysterical', 'amusing', 'ludicrous', 'meme', 'giggle', 'hilarious', 'cute', 'LOL', 'lol', 'lmao', 'rofl', 'laughter', 'laughing', 'laugh', 'on the floor', 'quirky', 'wacky' ]
var neutralwords = [ 'meh', 'cool', 'whatever', 'heh', 'boring', 'pointless',  'banal', 'feeble', 'questionable' ]
var scaredwords = ['spooky', 'wow', 'thrilling', 'thriller', 'unreal', 'chaos', 'WHY', 'NOO', 'heavy breathing', 'noped', 'scary', 'shocking', 'gross', 'intense', 'speechless', 'shocked', 'crazy', 'wtf', 'weird', 'insane', 'madness', 'creepy', 'terrifying' ]
var negativewords = ['abysmal', 'worst', 'homicide', 'deplorable', 'sickening', 'revolting', 'ruthless', 'malicious', 'horrible', 'offensive', 'hostile', 'gruesome', 'ghastly', 'evil', 'despicable', 'distress', 'killing', 'callous', 'cold-hearted', 'rape', 'explosion', 'attack', 'attacked', 'corrupt', 'appalling', 'alarming', 'bad', 'sad', 'failure', 'racism', 'racist', 'violent', 'violence', 'assault', 'fear', 'dead', 'dying', 'threaten', 'upsetting', 'shocking', 'nsfw', 'disappointing', 'suicide', 'murder', 'horrifying', 'devastating', 'vile', 'disgusting', 'terror', 'horrific' ]

var positiveemoticons = ['(｡☉౪ ⊙｡)', '⁀⊙﹏☉⁀', 'o (◡‿◡✿', '(✿◠‿◠)', '(★^O^★)', 'o(^▽^)o', '٩(^ᴗ^)۶', '(＾▽＾)', '（＾_＾）', '｡◕‿◕｡']
var desireemoticons = positiveemoticons;
var funnyemoticons = positiveemoticons;
var neutralemoticons = ['◕ ‿ ◕', '( ･᷄ㅂ･᷅ )', '¯\\_(ツ)_/¯', '(¬‿¬)', '（￣ー￣）', '(︶ω︶)', '(•ิ_•ิ)', '( ¬_¬)' ]
var scaredemoticons = [ '.·´¯`(>▂<)´¯`·.', '(;° ロ°)', '（°o°；）', '⊙﹏⊙', '⊙▂⊙', '(*ﾟﾛﾟ)', 'ヾ(´A｀)ノﾟ', '（￣□￣；）', '＼（〇_ｏ）／', 'ヽ（・＿・；)ノ', '(°◇°;)']
var negativeemoticons = [ '(╥_╥)', '(;*△*;)' , '（／_＼）', 'ಠ_ಠ', '(;° ロ°)', '（°o°；）', '(~_~;)', '⊙︿⊙', '(个_个)', 'ლ(ಠ_ಠლ)', '(✖╭╮✖)', '(*_*)', '(T＿T)', 'ಥ_ಥ']

var positiveemojis = ['🌈', '🆒', '🌞', '🌟', '🍕', '🍸', '👌', '👍', '👏', '💎', '💩', '💪', '💯', '🔥', '😀', '😄', '😎', '☺', '✌' ]
var desireemojis = positiveemojis;
var neutralemojis = ['🆗', '🌊', '🍆', '👉', '💤', '💬', '😴', '😶', '❓']
var funnyemojis = ['🌽', '🃏', '👅', '💩', '😂', '😄', '😅', '😆', '😹']
var scaredemojis = ['💀', '👀', '👽', '👿', '😧', '😨', '😫', '😱', '😲', '🙀', '🙊', '🙏', '⁉', '⚠']
var negativeemojis = ['👎', '💔', '🎻', '😧', '😨', '😪', '😫', '😭', '🙏', '🚫']

var	positiveparts = [ positivewords, positiveemoticons, positiveemojis ];
var	desireparts = [ desirewords, desireemoticons, desireemojis ];
var	neutralparts = [ neutralwords, neutralemoticons, neutralemojis ];
var	funnyparts = [ funnywords, funnyemoticons, funnyemojis ];
var	scaredparts = [ scaredwords, scaredemoticons, scaredemojis ];
var	negativeparts = [ negativeemoticons, negativeemojis ]; // no words in case this thing accidentally threatens someone

var getPageTone = function(text){
	var dictionaries = { 
	    positive: { dictionary: positivewords, count: 0},
	    desire: { dictionary: desirewords, count: 0},
	    funny: { dictionary: funnywords, count: 0},
	    scared: { dictionary: scaredwords, count:0},
	    negative: { dictionary: negativewords, count: 0}
	}
    for (var key in dictionaries) {
        var current_dictionary = dictionaries[key].dictionary;
        var current_count = dictionaries[key].count;
        for(var word in current_dictionary){
            current_count+= text.split(current_dictionary[word]).length -1
        }
        dictionaries[key].count = current_count;
    }
    var topresult;
    var count = 0;
    for(var key in dictionaries ){
        if(dictionaries[key].count > count){
            topresult = key
            count = dictionaries[key].count;
        }
    }
    return ({topresult: topresult || 'neutral', count: count });
}



// move these to sep bit to re-use . . ..
var pickRandom = function(array){
  return array[Math.floor(Math.random() * array.length)];
}

var rollDice = function(max,min){
  return Math.floor(Math.random()*(max-min+1)+min);
}

var createSentance = function(parts){
	console.log('parts are ' + parts )
	var sentance = ""
	var count = rollDice(4,1)
	for(var i=0;i<count;i++){
		selectedarray = parts[ rollDice(parts.length - 1, 0) ]
		console.log(selectedarray);
		selectedword = selectedarray[rollDice(selectedarray.length - 1, 0)]
		//make sure not past char limit
		console.log(selectedword)
		sentance += selectedword + " "
	}
	console.log('sentance is ' + sentance)
	return sentance;
}
var generatePost = function(url, body, service){

	var tone = getPageTone(body)
  	console.log("page tone details: " + tone.topresult + tone.count );
  	console.log("Posting a " + tone.topresult + " about " + url + " entry to " + service);
  	console.log('need to fetch from ' + tone.topresult + 'emojis');

  	switch( getPageTone(body).topresult ) {
    	case 'positive':
        	return createSentance(positiveparts) + url;
        	break;
    	case 'desire':
        	return createSentance(desireparts) + url;
        	break;
        case 'funny':
        	return createSentance(funnyparts) + url;
        	break;
        case 'scared':
        	return createSentance(scaredparts) + url;
        	break;
        case 'negative':
        	return createSentance(negativeparts) + url;
        	break;
        case 'neutral':
        	return createSentance(neutralparts) + url;
        	break;
    	default:
        	return createSentance(neutralparts) + url;
        	break;
	} 
}

exports.postToTwitter = function(url, body){
	var tweet = generatePost(url, body, 'twitter');
	console.log(tweet)
	app.T.post('statuses/update', { status: tweet }, function(err, data, response) {
  	console.log(data)
  	console.log(response)
    console.log('tweet posted');
	})
}
