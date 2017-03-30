//Require "path" dependency
var path = require("path");

module.exports = function(app){
	//Provide the proper page upon user visit
	app.get("/survey", function(request, response){
		response.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	//Default to home for all other routes
	app.use(function(request, response){
		response.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};