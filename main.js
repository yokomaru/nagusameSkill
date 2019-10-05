'use strict';
var Alexa = require('alexa-sdk');
 
var APP_ID = undefined;

// カードのタイトル
var SKILL_NAME = 'ほめわーど';
var STOP_MESSAGE = 'これでまんぞくか？じゃあな';
var CANCEL_MESSAGE = 'はーい';

//褒めワード(この中からランダムに表示される)
var data = [
'テレビ出てるかとおもったら、ひろせすずちゃんだったわー' ,
'ってげすのきわみおとめでドラム叩いている？<break time="0.5s"/>あ、あれはほないこかちゃんか！' ,
'あれ、シシドカフカさん髪の毛切りました？<break time="0.5s"/>あ、なーんだ、はいすいちゃんかー' ,
'<break time="0.5s"/>なんか今日かわいくない？<break time="0.5s"/>あ、いつもかわいいかったわーーーー' ,
'はわるくないよ！悪いのは世間や政治などのあなたの周りを取り巻く社会生活だよ！' ,
'<break time="0.5s"/>がんばりすぎちゃだめだよ。まわりをがんばらせるようにしないと。' ,
'はまちがってないよ。まちがっているのは世の中のほうだよ！' ,
'すこーーー' 
];
 
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
 
var handlers = {
  'LaunchRequest': function () {
    this.emit('AMAZON.HelpIntent');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', 'おかえりなさい。' +
                      'きょうも1日お疲れ様。');
  },
    'NagusameYoukoIntent': function () {
   	if (this.attributes['NagusameName']) {
   	  	var NagusameName = this.attributes['NagusameName'];
   	  	}
	   	else{
   	    NagusameName = this.event.request.intent.slots.NagusameName.value;
		}
        var factArr = data;
        //dataの中からランダムに表示
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
	      this.attributes['NagusameName'] = NagusameName; //なぐさめ名をセッションアトリビュートにセット
        var speechOutput = NagusameName + randomFact;
        // アレクサアプリにカードとして出す
        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', CANCEL_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        // Nothing to do
    },
   	'Unhandled': function() {
 /*  	if (this.attributes['sign']) {
   	 	var NagusameName = this.attributes['NagusameName'];
   	  	}
	 else{
   	   	var NagusameName = this.event.request.intent.slots.NagusameName.value;
	}*/
    var reprompt = 'もういっかいいって';
    this.emit(':ask', reprompt);
  }
};
