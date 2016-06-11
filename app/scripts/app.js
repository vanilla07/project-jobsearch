'use strict';

/**
 * @ngdoc overview
 * @name jobSearchApp
 * @description
 * # jobSearchApp
 *
 * Main module of the application.
 */
angular
  .module('jobSearchApp', [
    'ngAnimate',
    'ngMaterial',
    'ngResource',
    'ui.router',
    'angularMoment',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        
      // route for the home page 
      .state('app', {
          url:'/',
          views: {
              'header': {
                  templateUrl : 'views/header.html',
                  controller  : 'HeaderCtrl'
              },
              'content': {
                  templateUrl : 'views/main.html',
                  controller  : 'MainCtrl'
              },
              'footer': {
                  templateUrl : 'views/footer.html',
              }
          }

      })
      // route for the jobs listing
      .state('app.jobs', {
          url:'jobs',
          views: {
              'content@': {
                  templateUrl : 'views/jobs.html',
                  controller  : 'JobsCtrl'                  
              }
          },
      })
      // route for the random job
      .state('app.random', {
          url:'random',
          views: {
              'content@': {
                  templateUrl : 'views/random.html',
                  controller  : 'RandomCtrl'                  
              }
          },
      })
      // route for the random job
      .state('app.saved', {
          url:'saved',
          views: {
              'content@': {
                  templateUrl : 'views/saved.html',
                  controller  : 'SavedCtrl'                  
              }
          },
      })

      ;
    
    $urlRouterProvider.otherwise('/');
  }])
  .filter('unsafe', function($sce) { return $sce.trustAsHtml; })
  ;
