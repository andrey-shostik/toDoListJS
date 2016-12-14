module.exports = function ( app ) {
  var log       = require('../libs/log')(module);
  var TaskModel = require('../libs/mongoose').TaskModel;
  var bodyParser = require('body-parser');

  app.get('/api/tasks', function(req, res) {
    return TaskModel.find(function (err, tasks) {
      if (!err) {
        return res.send(tasks);
      } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  });

  app.post('/api/tasks', function(req, res) {
    var task = new TaskModel({
      title: req.body.title,
      description: req.body.description
    });

    task.save(function (err) {
      if (!err) {
        log.info("task created");
        return res.send({ status: 'OK', task: task });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' }); } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        log.error('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
  });

  app.get('/api/tasks/:id', function(req, res) {
    return TaskModel.findById(req.params.id, function (err, task) {
      if(!task) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        return res.send({ status: 'OK', task:task });
      } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  });

  app.put('/api/tasks/:id', function (req, res){
    return TaskModel.findById(req.params.id, function (err, task) {
      if(!task) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      task.title = req.body.title;
      task.description = req.body.description;
      return task.save(function (err) {
        if (!err) {
          log.info("task updated");
          return res.send({ status: 'OK', task:task });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
            } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
            }
          log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
    });
  });

  app.delete('/api/tasks/:id', function (req, res){
    return TaskModel.findById(req.params.id, function (err, task) {
      if(!task) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      return task.remove(function (err) {
        if (!err) {
          log.info("task removed");
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      });
    });
  });
};
