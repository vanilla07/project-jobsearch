'use strict';

angular.module('jobSearchApp')
    .controller('RandomCtrl', [ '$scope', 'resourceService', function($scope, resourceService) { 
        
        $scope.pageCount = 1;

        $scope.params = resourceService.params;
        $scope.isSaved = false;

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

        $scope.getRandomJob = function(page) {
            var params = resourceService.params;
            params.page = page;

            $scope.loading = true;
            $scope.loadMode = 'indeterminate';
            resourceService.getJobs().get(
                params,
                function(response) {
                    var jobs = response;
                    
                    /* loader */
                    $scope.loading = false;
                    $scope.loadMode = '';
                    $scope.last = false;
                    $scope.pageCount = jobs.page_count;

                    /* no job found */
                    if (jobs.results.length === 0) {
                        $scope.message = 'No jobs found.';
                        $scope.showError = true;
                    }
                    else {
                        /* only one offer ?*/
                        if (jobs.results.length === 1) {
                            $scope.last = true;
                            $scope.randomJob = jobs.results[0];
                        }
                        else {
                            var randomInt = resourceService.randomInt(0, jobs.results.length - 1);
                            $scope.randomJob = jobs.results[randomInt];
                        }
                        
                        $scope.isSaved = resourceService.isSaved($scope.randomJob);
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

        $scope.getRandomJob(0);

        $scope.next = function() {
            var randomInt = 0;
            if ( this.pageCount > 1 ) { 
                randomInt = resourceService.randomInt(0, this.pageCount-1);
            }
            $scope.getRandomJob(randomInt);
        };

        $scope.saveJob = function() {
            resourceService.saveJob($scope.randomJob);
            $scope.isSaved = resourceService.isSaved($scope.randomJob);
        };

    }])
;