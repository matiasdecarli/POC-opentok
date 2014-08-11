var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var OpenTok = require('opentok');

// Initialize the express app
var app = express();
app.use(express.static(__dirname + '/public'));

var apiKey = "44935302";
var apiSecret = "57343c91672db0a58fb1d6655ccc125a989048c7";
// Initialize OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

// Create a session and store it in the express app
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  // We will wait on starting the app until this is done
  init();
});

app.get('/token', function(req, res) {
  var sessionId = app.get('sessionId'),
  // generate a fresh token for this client
  token = opentok.generateToken(sessionId);  

  res.send({
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  });
});

// Start the express app
function init() {
  app.listen(port, function() {
    console.log('You\'re app is now ready at http://localhost:' + port);
  });
}