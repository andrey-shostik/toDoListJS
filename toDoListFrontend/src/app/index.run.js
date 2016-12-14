(function() {
  'use strict';

  angular
    .module('toDoListFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
