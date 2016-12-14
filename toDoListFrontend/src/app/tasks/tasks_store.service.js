angular.module('toDoListFrontend').factory('TasksStore', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://localhost:3000/api');
  });
});
