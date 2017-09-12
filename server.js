var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

    //Set up cross origin resource
    app.use(function (req, res, next) {
        
    })

app.use(express.static(__dirname + ''));

app.listen(port, function() {
	console.log('App listening on port ' + port);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});
