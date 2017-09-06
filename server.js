var express = require('express'),
    app = express(),
    port = 8080;

app.use(express.static(__dirname + ''));

app.listen(port, function() {
	console.log('App listening on port ' + port);
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});
