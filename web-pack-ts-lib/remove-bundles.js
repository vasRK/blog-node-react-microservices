const rimraf = require("rimraf");

rimraf("./Scripts/Build/*", function(){
	console.log("delete done");
});
