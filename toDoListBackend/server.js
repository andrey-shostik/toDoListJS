var express = require('express'),
    bodyParser = require('body-parser'),
    log  = require('./libs/log')(module),
    path = require('path'), // модуль для парсинга пути
    app  = express(),
    config = require('./libs/config');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./routes')(app);


app.get('/api', function (req, res) {
  res.send('API is running');
});

app.use(function(req, res, next){
  res.status(404);
  log.debug('Not found URL: %s',req.url);
  res.send({ error: 'Not found' });
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);
  res.send({ error: err.message });
  return;
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random error!'));
});

app.listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
