#!/usr/bin/env node
var debug = require('debug')('my-application');
var app = require('../app');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP);

var server = app.listen(app.get('port'), app.get('ipaddress'), function() {
  debug('Express server listening on port ' + server.address().port);
});