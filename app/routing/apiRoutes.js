//Friend data loaded from exported friends.js
var friends=require("../data/friends.js");

module.exports=function(app){
	//Build get and post request for user to request/submit data
	app.get("/api/friends", function(request, response){
		response.json(friends);
	});

	app.post("/api/friends", function(request, response){
		//Handle incoming survey results and compatability logic
		//Each user's results stored in array
		//Arrays of users and existing friends will be summed.
		//Differences will be calculated based on totalDifference.
		//Least different = most compatible

		var mostCompatible = compatabilityCalc(request, response);
		response.json(mostCompatible);

	});
};




function compatabilityCalc(req, resp){
	var foundFriend={
		name: "",
		photo: "",
		friendDifference: 1000
	}
	//Parse response into local variables
	var userData = req.body;
	var userScores = userData.scores;

	//Difference between user and existing friends
	var totalDifference = 1000;

	//Loop through existing friends
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= foundFriend.friendDifference) {

          // Reset the bestMatch to be the new friend.
          foundFriend.name = friends[i].name;
          foundFriend.photo = friends[i].photo;
          foundFriend.friendDifference = totalDifference;
        }
      }
    }

    friends.push(userData);
    return foundFriend;
};


