(function () {
  'use strict';

  angular
    .module("toDoListFrontend")
    .controller('TaskController', TaskController);

  function TaskController($scope, Task, $log) {
    var vm = this;
    vm.removeTask = removeTask;
    vm.addTask = addTask;

    Task.getTasks();
    vm.tasks = Task.tasks;

    function addTask() {
      Task.addTask(vm.newTask);
      vm.newTask = '';
    }

    function removeTask(task) {
      $log.log(task);
      Task.removeTask(task);
    }
  }
})();
