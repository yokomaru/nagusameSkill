'use strict';
var Alexa = require('alexa-sdk');
 
var APP_ID = undefined;

// �J�[�h�̃^�C�g��
var SKILL_NAME = '�ق߂�[��';
var STOP_MESSAGE = '����ł܂񂼂����H���Ⴀ��';
var CANCEL_MESSAGE = '�́[��';

//�J�߃��[�h(���̒����烉���_���ɕ\�������)
var data = [
'�e���r�o�Ă邩�Ƃ���������A�Ђ낹��������񂾂�����[' ,
'���Ă����̂���݂��Ƃ߂Ńh�����@���Ă���H<break time="0.5s"/>���A����͂قȂ���������񂩁I' ,
'����A�V�V�h�J�t�J���񔯂̖ѐ؂�܂����H<break time="0.5s"/>���A�ȁ[�񂾁A�͂���������񂩁[' ,
'<break time="0.5s"/>�Ȃ񂩍������킢���Ȃ��H<break time="0.5s"/>���A�������킢����������[�[�[�[' ,
'�͂�邭�Ȃ���I�����̂͐��Ԃ␭���Ȃǂ̂��Ȃ��̎������芪���Љ������I' ,
'<break time="0.5s"/>����΂肷�����Ⴞ�߂���B�܂�������΂点��悤�ɂ��Ȃ��ƁB' ,
'�͂܂������ĂȂ���B�܂������Ă���̂͐��̒��̂ق�����I' ,
'�����[�[�[' 
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
    this.emit(':ask', '��������Ȃ����B' +
                      '���傤��1�������l�B');
  },
    'NagusameYoukoIntent': function () {
   	if (this.attributes['NagusameName']) {
   	  	var NagusameName = this.attributes['NagusameName'];
   	  	}
	   	else{
   	    NagusameName = this.event.request.intent.slots.NagusameName.value;
		}
        var factArr = data;
        //data�̒����烉���_���ɕ\��
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
	      this.attributes['NagusameName'] = NagusameName; //�Ȃ����ߖ����Z�b�V�����A�g���r���[�g�ɃZ�b�g
        var speechOutput = NagusameName + randomFact;
        // �A���N�T�A�v���ɃJ�[�h�Ƃ��ďo��
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
    var reprompt = '������������������';
    this.emit(':ask', reprompt);
  }
};
