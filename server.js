var express = require('express'),
    app = express(),
    port = 8080;

    //Set up cross origin resource
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })

app.use(express.static(__dirname + ''));

app.listen(port, function() {
	console.log('App listening on port ' + port);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});
