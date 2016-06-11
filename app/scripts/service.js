'use strict';

angular.module('jobSearchApp')
    .constant('baseURL','https://api-v2.themuse.com/')
    .service('resourceService',[ '$resource', 'baseURL', function( $resource, baseURL) {

        this.params = {page : 0};

        /* Resource Jobs */
        this.getJobs = function() {
          return $resource(baseURL+'jobs/:jobId', null);
        };

        this.clearParams = function() {
          this.params = {page : 0};
        };

        this.updatePage = function(page) {
          this.params.page = page;
        };

        this.updateParams = function(params) {
          if (!params.location || 0 === params.location.length) {
            delete this.params.location;
          } 
          else {
            this.params.location = params.location;
          }

          if (!params.company || 0 === params.company.length) {
            delete this.params.company;
          } 
          else {
            this.params.company = params.company;
          }

          if (!params.category || 0 === params.category.length) {
            delete this.params.category;
          } 
          else {
            this.params.category = params.category;
          }

          if (!params.level || 0 === params.level.length) {
            delete this.params.level;
          } 
          else {
            this.params.level = params.level;
          }

          this.params.page = 0;
        };

        this.randomInt = function (min,max) {
          return Math.floor(Math.random() * (max - min +1) + min);
        };

        /* Resource cities */
        this.getCities = function() {
          return $resource('cities.json');
        };
        /* Resource companies */
        this.getCompanies = function() {
          return $resource('companies.json');
        };

        /* list of levels */
        this.levels = ['Internship', 'Entry Level', 'Mid Level', 'Senior Level'];

        /* list of categories */
        this.categories = [ 'Account Management', 'Business & Strategy', 'Creative & Design', 'Customer Service', 'Data Science', 'Editorial', 
          'Education', 'Engineering', 'Finance & Data', 'Fundraising & Development', 'Healthcare & Medicine', 'HR & Recruiting', 
          'Legal', 'Marketing & PR', 'Operations', 'Project & Product Management', 'Retail Sales', 'Social Media & Community'];
        
        /* Saved jobs */
        this.savedJobs = [];

        this.isSaved = function(job) {
            var saved = this.savedJobs;
            for (var i = saved.length - 1; i >= 0; i--) {
                if (saved[i].id === job.id) {
                    return true;
                }
            }
            return false;
        };

        this.saveJob = function(job) {
            if (!this.isSaved(job)) {
              this.savedJobs.push(job);
            }
        };


    }])
    .service('dialogService',[ '$mdDialog', function($mdDialog) {
      
        this.showDialog = function(message, state, title){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .clickOutsideToClose(true)
              .title(title)
              .textContent(message)
              .ariaLabel('Alert Message')
              .ok('OK')
              .targetEvent(state)
          );
        };

    }])
;
