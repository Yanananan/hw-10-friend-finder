// requiring packages
var express = require('express');
var app 	= express();
var path 	= require("path");
var mysql   = require('mysql');

app.set('view engine','ejs');
//you need this to be able to process information sent to a POST route
	var bodyParser = require('body-parser');

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
// you need this line here so you don't have to create a route for every single file in the public folder (css, js, image, etc)
// index.html in the public folder will over ride the root route
app.use(express.static("app/public"));

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "ym",
  database: "friendfinder_db"
});

app.get('/', function(req, res){
	res.render(__dirname + "/app/views/index");
});

var selfInfo;// will be used to save user info
var matchInfo=[];// will be used to save info of match(es)
app.post('/survey', function(req, res){
	console.log("req");
	console.log(req);
	selfInfo = req.body;//saves info of user for matchResult screen
	// example req.body
	// req.body={ username: 'Yanan Meng',
    // q0: '3', q1: '3', q2: '3', q3: '3', q4: '3', q5: '3', q6: '3', q7: '3', q8: '3', q9: '3' }
	 
	var query = connection.query(
		//check if user is already in db
		"SELECT * FROM survey WHERE ?",
		{username: selfInfo.username},
		function(errSelect, resSelect){
			if(errSelect) {
				console.log("error from query: SELECT * FROM survey WHERE ?")
				console.log(errSelect);
			}else{
				console.log("response for checking if username is already in db");
				console.log(resSelect);//response is [] when no results are found
				if (resSelect.length==0){
					//if user is not in db, add into db
					var query = connection.query(
						"INSERT INTO survey SET ?",
						selfInfo,
						function(errInsert, resInsert){
							if(errInsert) {
								console.log("error from query: INSERT INTO survey SET ?")
								console.log(errInsert);
							}else{
								console.log("response for adding survey into db");
								console.log(resInsert);
							}
							findMatch(selfInfo.username,res);
						}
					);
				}else{
					//if user is in db, update choices into db
					var query = connection.query(
						"UPDATE survey SET ? WHERE username = ?",
						[selfInfo, selfInfo.username],
						function(errUpdate, resUpdate){
							if(errUpdate) {
								console.log("error from query: UPDATE survey SET ? WHERE username = ?")
								console.log(errUpdate);
							}else{
								console.log("response for updating survey into db");
								console.log(resUpdate);
							}
							findMatch(selfInfo.username,res);
						}
					);
				}
			}
		}
		
	);
});

function findMatch(username,res){
	// select all other entries excluding current user
	var query = connection.query(
		"SELECT * FROM survey where username != ?",
		username,
		function(err, response){
			if(err){
				console.log("error from query: SELECT * FROM survey where username != ?");
				console.log(err);
			} else {
				console.log("response");
				console.log(response);
				//  example response[0]:
				//  {id: 1,	username: 'FouXo', 
				// 	q0: 1, q1: 2, q2: 3, q3: 4, q4: 5, q5: 5, q6: 4, q7: 3, q8: 2, q9: 1 }
				var i,j,tally;
				var totalDifference = 100;
				var id = 0;
				// for each entry in the db, loop thru each of the 10 questions, compare answer from the user (selfInfo[q0] thru [q9]) with answer of previous user (response[i][q0] thru [q9]), tally up absolute differences.  if the total abs difference is less than the previous total abs difference, save the entry into matchInfo.  Repeat till all entries have been compared.
				for (i in response){
					console.log("i="+i);
					tally = 0;
					for (j=0;j<10;j++){
						tally = tally + Math.abs(selfInfo["q"+j]-response[i]["q"+j])
					}
					console.log("tally for id="+response[i]["id"]+" is: "+tally);
					if (tally<totalDifference){
						totalDifference = tally;
						id = response[i]["id"];
						matchInfo = [] // since the tally reached a new low, all existing info of matches must be cleared
						matchInfo.push(response[i]);// saves info of best match for matchResult screen
						console.log("user id "+id+" currently has the least difference at "+totalDifference);
					} else if (tally==totalDifference){
						id = response[i]["id"];
						matchInfo.push(response[i]);// saves info of best match for matchResult screen
						console.log("user id "+id+" also has the least difference at "+totalDifference);
					}
					
				}
				console.log("matchInfo");
				console.log(matchInfo);
				console.log("selfInfo");
				console.log(selfInfo);
				res.render(__dirname + "/app/views/matchResults",{matchInfo:JSON.stringify(matchInfo), selfInfo:JSON.stringify(selfInfo)});
			}
		}
	)
}

app.listen(3000, function(){
	console.log('listening on 3000');
});