angular.module("toDoListFrontend").controller('TasksController', function($scope, TasksStore) {
  var vm = this;

  vm.tasks = [
    {
      title: 'fasdf',
      description: 'fasdf'
    },
    {
      title: 'fasdf',
      description: 'fasdf'
    },
    {
      title: 'fasdf',
      description: 'fasdf'
    }
  ];
  console.log(TasksStore.all('tasks').getList());
});
