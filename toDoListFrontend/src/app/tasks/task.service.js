(function () {
  'use strict';

  angular
    .module('toDoListFrontend')
    .factory('Task', Task);

  function Task(Restangular) {
    return {
      tasks: [],

      getTasks: function () {
        this.tasks = Restangular.all('tasks').getList().$object;
      },

      addTask: function (task) {
        var that = this;
        return Restangular.all('tasks').post(
          task
        ).then(function (res) {
          that.tasks.push(res.task);
        });
      },

      removeTask: function (task) {
        var that = this;
        Restangular.one("tasks", task._id).remove().then(function () {
          var isTaskInTasks = that.tasks.indexOf(task) != -1;

          if (isTaskInTasks) {
            that.tasks.splice(that.tasks.indexOf(task), 1);
          }
        });
      }
    };
  }
})();
