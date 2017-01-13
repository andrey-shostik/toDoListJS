module.exports = function ( app ) {
  require('./tasks')(app);

  app.get('/api', function (req, res) {
    res.send('API is running');
  });
};
