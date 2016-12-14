(function() {
  'use strict';

  angular
    .module('toDoListFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'app/tasks/tasks.html',
        controller: 'TasksController',
        controllerAs: 'tasks'
      })

    $urlRouterProvider.otherwise('/');
  }
})();
