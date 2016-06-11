 'use strict';

angular.module('jobSearchApp')
    .controller('SavedCtrl', [ '$scope', 'resourceService', function($scope, resourceService) { 
        
        $scope.params = resourceService.params;

        var isEmpty = function(tab) {
          if (!tab || tab.length === 0) {
            return true;
          }
        };

        $scope.emptySelection = function() {
          if (isEmpty($scope.params.location) && isEmpty($scope.params.company) && 
            isEmpty($scope.params.level) && isEmpty($scope.params.category)) {
            return true;
          }
        };

        $scope.savedJobs = resourceService.savedJobs;
        /* no job found */
        if ($scope.savedJobs.length === 0) {
            $scope.message = 'No jobs saved.';
            $scope.showError = true;
        }

    }])
;