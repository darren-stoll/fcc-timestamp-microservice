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
app.get("/api/timestamp/:date_string", (req, res) => {
  var {date_string} = req.params;
  var date = new Date(date_string);
  console.log(parseInt(date_string));
  if (!date) {
    if (date_string == '') {
      console.log("hi1");
      date = new Date();
    }
    else if (parseInt(date_string) != NaN) {
      console.log("hi2");
      date = new Date(parseInt(date_string));
    }
    else {
      console.log("hi3");
      date = {"error": "Invalid Date"};
    }
  }
  console.log(date);
  res.json(date);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});