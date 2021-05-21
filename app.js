var OAuth = require("oauth");

const numberMap = {
    0: "0️⃣",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
};

//get your Twitter Api Keys from twitter developer console
var twitter_user_access_token = "";
var twitter_user_secret = "";

//creating oauth reference for hitting Apis
var oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    twitter_application_consumer_key,
    twitter_application_secret,
    "1.0A",
    null,
    "HMAC-SHA1"
);

//getting current username of the twitter profile
oauth.post(
    "https://api.twitter.com/1.1/account/update_profile.json",
    twitter_user_access_token,
    twitter_user_secret,
    postBody, // post body
    "", // post content type ?
    function(err, data, res) {
        if (err) {
            console.log(err);
        } else {
            currrentName = JSON.parse(data).name;
            console.log(currName);
            updatedDay = getDayCount(currrentName);

            //Give whatever name here,which you want to prepend to days count
            updatedName = "StopNot!-" + updatedDay;

            //updating name through the api
            oauth.post(
                "https://api.twitter.com/1.1/account/update_profile.json",
                twitter_user_access_token,
                twitter_user_secret, { name: updatedName },
                "",
                function(err, data, res) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
    }
);

//consumes daycount in integer format and returns days in emojis
function getDayCount(day) {
    currentDayCount = day.split("-")[1];
    daysInEmoji = "";
    if (!currentDayCount) {
        var result = "";
        currentDayCount.split("").forEach(function(letter) {
            console.log(letter);
            if ("0123456789".includes(letter)) result = result + "" + letter;
        });
        dayCount = parseInt(result) + 1 + ""; //day counter

        dayCount.split("").forEach(function(letter) {
            daysInEmoji += numberMap[letter];
        });
    } else {
        daysInEmoji = numberMap[0] + numberMap[1];
    }

    return daysInEmoji;
}