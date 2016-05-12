'use strict';

/**
 * @ngdoc function
 * @name jobSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jobSearchApp
 */
angular.module('jobSearchApp')
  .controller('MainCtrl', ['$scope', '$state', 'resourceService', 'dialogService', 
  function ($scope, $state, resourceService, dialogService) {
    
    var initParams = function() {
      $scope.params = resourceService.params;
      
      if (!$scope.params.location) { $scope.params.location = []; }
      if (!$scope.params.company) { $scope.params.company = []; }
      if (!$scope.params.level) { $scope.params.level = []; }
      if (!$scope.params.category) { $scope.params.category = []; }
    };

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

    $scope.removeCriteria = function(params, param) {
      var index = params.indexOf(param);
      if (index > -1) {
        params.splice(index, 1);
      }
    };

    $scope.addCriteria = function(params, param) {
      if (param.length > 0) {
        var index = params.indexOf(param);
        if (index <= -1) {
          params.push(param);
        }
        param = '';
      }
    };

  	$scope.clear = function () {
  		resourceService.clearParams();
      initParams();
      var message = 'All criterias have been reinitialized'; 
      dialogService.showDialog(message, $state.go('app'), 'Success');
  	};

  	$scope.search = function () {
  		resourceService.updateParams($scope.params);
      $state.go('app.jobs');
  	};

    // init resources

    initParams();

    resourceService.getCities().query( function(response) {
        $scope.cities = response;
      }
    );

    resourceService.getCompanies().query( function(response) {
        $scope.companies = response;
      }
    );

    $scope.categories = resourceService.categories;
    $scope.levels = resourceService.levels;

  }])
  .directive('jcBadge', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        parameter: '=param',
        remove: '&onRemove'
      },
      template: '<span ng-repeat="p in parameter" class="badge">{{p}} <button type="button" class="close" aria-label="Close" ng-click="remove({param: p})"><span aria-hidden="true">&times;</span></button></span>'
    };
  })
;

