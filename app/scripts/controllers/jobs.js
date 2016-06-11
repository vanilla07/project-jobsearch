'use strict';

angular.module('jobSearchApp')
    .controller('JobsCtrl', [ '$scope', 'resourceService', function($scope, resourceService) { 
		
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

        $scope.getResults = function() {
            $scope.loading = true;
            $scope.loadMode = 'indeterminate';
            resourceService.getJobs().get(
                resourceService.params,
                function(response) {
                    $scope.jobs = response;
                    
                    /* loader */
                    $scope.loading = false;
                    $scope.loadMode = '';

                    /* pagination */
                    $scope.last = false;
                    $scope.first = false;
                    if ($scope.jobs.page >= $scope.jobs.page_count-1) {
                        $scope.last = true;
                    } 
                    if ($scope.jobs.page === 0) {
                        $scope.first = true;
                    }

                    /* no job found */
                    if ($scope.jobs.results.length === 0) {
                        $scope.message = 'No jobs found.';
                        $scope.showError = true;
                    }

                },
                function() {
                    $scope.loading = false;
                    $scope.loadMode = '';
                    $scope.message = 'Error while searching for jobs.';
                    $scope.showError = true;
                }
            );
        };

        $scope.getResults();

		$scope.tab = 'all';

        $scope.previous = function() {
            if ($scope.jobs.page > 0) {
                resourceService.updatePage($scope.jobs.page - 1);
                $scope.getResults();
            }
        };

        $scope.next = function() {
            if ($scope.jobs.page < $scope.jobs.page_count-1) {
                resourceService.updatePage($scope.jobs.page + 1);
                $scope.getResults();
            }
        };

        $scope.saveJob = function(job) {
            resourceService.saveJob(job);
        };
        $scope.isSaved = function(job) {
            return resourceService.isSaved(job);
        };

	}])
;