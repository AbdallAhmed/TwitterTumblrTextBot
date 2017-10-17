//these are all the packages we need
var Twit = require('twit');
var config = require('./config');
var exec = require('child_process').exec;
var fs = require('fs');

//creating a new twit object
var T = new Twit(config);
var medias = [];
//start a stream that listens for followers :)

var stream = T.stream('user');
stream.on('follow', followFunc);
mediaTweet();
setInterval(mediaTweet, 1000*60);

function followFunc(followMsg){
	console.log('Someone has followed me!');
	var cmd = 'processing-java --sketch=`pwd`/thankyou --run'
	var name = followMsg.source.name;
	var at = followMsg.source.screen_name;
	exec(cmd, imageCreated);
	function imageCreated(){
		var filename = 'thankyou/output.png';
  		var params = {
      		encoding: 'base64'
  		}
    	var b64 = fs.readFileSync(filename, params);
    	T.post('media/upload', { media_data: b64 }, uploaded);
	}

	function uploaded(err, data, response) {
      var id = data.media_id_string;
   
	  var tweet = {
		    status: 'Hi ' + name + ' (@' + at + ')!\n' + 
		'Thanks for following! 💕',
		    media_ids: [id]
		  }
		  
	      T.post('statuses/update', tweet, tweetCB);
    }

   function tweetCB(err, data, response){
		if(err){
			console.log(err);
		}
		else{
			console.log("it is functioning!")
		}
	}
}


function mediaTweet(){
	medias = [];
	//this is the command line argument we want to run
	var cmd = 'processing-java --sketch=`pwd`/wordwithreset --run';
	//execute the cmd and then callback to imageCreated function
	exec(cmd, imageCreated);

	function imageCreated(){
		var filename = 'wordwithreset/output.png';
		var filename2 = 'wordwithreset/output2.png'
  		var params = {
      		encoding: 'base64'
  		}
    	var b64 = fs.readFileSync(filename, params);
    	var b642 = fs.readFileSync(filename2, params);
    	T.post('media/upload', { media_data: b64 }, uploaded);
    	T.post('media/upload', { media_data: b642}, uploaded);
	}

	function uploaded(err, data, response) {
      var id = data.media_id_string;
      medias.push(id);
      console.log(medias);

      if(medias.length == 2){
		  var tweet = {
		    status: '~art~',
		    media_ids: medias
		  }
		  
	      T.post('statuses/update', tweet, tweetCB);
	  }
    }

   function tweetCB(err, data, response){
		if(err){
			console.log(err);
		}
		else{
			console.log("it is functioning!")
		}
	}
}

function dynamicTweet(txt){
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, cb);

	function cb(err, data, response){
		if(err){
			console.log(err);
		}
		else{
			console.log("it is functioning!")
		}
	}
}

function staticTweet(){
	var tweet = {
		status: 'I just tweeted from a program!'
	}

	T.post('statuses/update', tweet, cb);

	function cb(err, data, response){
		if(err){
			console.log(err);
		}
		else{
			console.log("it is functioning!")
		}
	}
}