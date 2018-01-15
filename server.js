const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { join } = require('path');


app.use(express.static(join(__dirname, 'static')));
// app.use(express.static(join(__dirname, 'service-worker')));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:true}) );

app.get('/*', function(req, res, next) {
  res.removeHeader('X-Powered-By');
  res.header('Service-Worker-Allowed', '/');
  next();
});

app.get('/', function(req, res) {
  res.sendFile(join(__dirname, 'static', 'index.html'));
});
app.get('/stuff', function(req, res) {
  res.send('You got some stuff.');
});
app.post('/stuff', function(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);
  console.log('form', req.form);
  console.log(req);
  res.send('ok');
});

app.get('/service-worker/:filename', function(req, res) {
  console.log('SERVICE:')
  console.log('headers', req.headers);
  console.log('body', req.body);
  console.log('form', req.form);
  res.sendFile(join(__dirname, 'service-worker', req.params.filename));
});

app.get('/manifest/:filename', function(req, res) {
  res.header('Content-Type', 'application/manifest+json');
  res.sendFile(join(__dirname, 'service-worker', 'manifest', req.params.filename));
});

app.listen(9393, function() {
  console.log('ServiceWorkerDemo listening on 9393');
});
