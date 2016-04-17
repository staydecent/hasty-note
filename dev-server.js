'use strict';

var path = require('path');
var express = require('express');

var app = express();

app.use('/public', express.static(path.join(__dirname, './public')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '200.html'));
});

var port = process.env.PORT || 8000;

var server = app.listen(port, function () {
  var host = (server.address().address === "::")?'localhost':server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});