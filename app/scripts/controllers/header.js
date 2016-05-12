'use strict';

angular.module('jobSearchApp')
  .controller('HeaderCtrl', [ '$scope', '$location', function($scope, $location) { 
    		
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  }]);
