var OAuth = require('oauth'); 
const numberMatch = { //mapping numbers to emojis
  "0": "0️⃣",
  "1": "1️⃣",
  "2": "2️⃣",
  "3": "3️⃣",
  "4": "4️⃣",
  "5": "5️⃣",
  "6": "6️⃣",
  "7": "7️⃣",
  "8": "8️⃣",
  "9": "9️⃣",
};
const emojiMatch = { //mapping emojis to numbers
   "0️⃣": 0,
   "1️⃣": 1,
   "2️⃣": 2,
   "3️⃣": 3,
   "4️⃣": 4,
   "5️⃣": 5,
   "6️⃣": 6,
   "7️⃣": 7,
   "8️⃣": 8,
   "9️⃣": 9
};

//create your Twitter Api Keys by going yo twitter developer console
var twitter_application_consumer_key = '';  // API Key
var twitter_application_secret = '';  // API Secret
var twitter_user_access_token = '';  // Access Token
var twitter_user_secret = '';  // Access Token Secret

function getdayCount(day) //function which consumes day count and returns updated day count
{
	//day will be in the form of name-1️⃣2️⃣(Emojis)
	curr=day.split('-')[1];
	var result='';
	curr.split('').forEach(function(letter) { //itearting through day
	  console.log(letter);
	  if("0123456789".includes(letter)) //to skip unicodes characters check whether it is digit or not
			result =result +""+letter; //if digit add it to result
	});
	dayCount=parseInt(result)+1+""; //incrementing the day
	emojiDay='';
	
  //converting day to emoji
	dayCount.split('').forEach(function(letter) {
	  //console.log(letter);
		emojiDay += numberMatch[letter];
	});
	
	return emojiDay; //returning todayCount in the form of emoji
}

//getting current username of the twitter profile
oauth.post('https://api.twitter.com/1.1/account/update_profile.json',
	twitter_user_access_token,  // oauth_token (user access token)
	twitter_user_secret,  // oauth_secret (user secret)
	postBody,  // post body
	'',  // post content type ?
	function(err, data, res) {
			if (err) {
				console.log(err);
			} else {
				 //console.log("-----Success-----"+data);
				currName=JSON.parse(data).name;
				console.log(currName); 
				updatedDay=getdayCount(curName); //will get updated daycount
			 	myname="StopNot!-"+updatedDay; //Here we are creating new username
							
               				 //updating name through the same api
					oauth.post('https://api.twitter.com/1.1/account/update_profile.json',
					twitter_user_access_token,  // oauth_token (user access token)
					twitter_user_secret,  // oauth_secret (user secret)
					{"name":myname},  // post body //sending name as payload
					'',  // post content type ?
					function(err, data, res) {
					if (err) {
						console.log(err);
					} else {
						console.log("-----Success-----"+data);			 //if everything goes fine. then you can this success message		
					}
					});
						
			}
});
