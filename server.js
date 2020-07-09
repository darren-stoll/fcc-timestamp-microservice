// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//API endpoint
app.get("/api/timestamp/:date_string?", (req, res) => {
  // Grab parameter from route
  var date_string = req.params.date_string;
  // Create date object from parameter
  var date = new Date(date_string);
  // Check if the date object is valid
  if (date.toString() === "Invalid Date") {
    // Check if the parameter was empty; if empty, then create new Date based on current time
    if (typeof date_string == 'undefined') {
      date = new Date();
    }
    // Check if the parameter was an invalid date but was a valid integer; if valid int, create date object on current time in milliseconds
    else if (isNaN(parseInt(date_string)) == false)  {
      date = new Date(parseInt(date_string));
    }
  }
  // If the date is invalid, return an error
  if (date.toString() === "Invalid Date") {
    res.json({"error": "Invalid Date"});
  }
  // Otherwise, return the json object with the unix and utc values
  else {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});