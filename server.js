var fs = require('fs');


var jwt = require('jsonwebtoken'),
    secret = "totallysecret",
    express = require('express'),
    app = express(),
    bodyparser = require('body-parser');


app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

function createJWT(data) {
    return jwt.sign(data, secret);
}

function verifyJWT(token) {
    var data;
    try {
        data = jwt.verify(token, secret);
    } catch (e) {
        console.log(e);
        return null;
    }
    return data;
}

app.get('/', function(req, res) {
    res.redirect('/home.html');
});

app.get('/verify', function(req, res) {
    var header = req.headers.authorization
    var token = header.split(' ')[1];
    console.log('header');
    console.log(header);
    console.log('token');
    console.log(token);
    var isValid = verifyJWT(token) !== null;
    res.send(isValid.toString());
    res.end();
});
app.post('/auth', function(req, res) {

    console.log(req.body);
    res.send(createJWT(req.body));
    res.end();
});
var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
