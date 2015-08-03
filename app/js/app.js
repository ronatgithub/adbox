'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', [
  'ngRoute',
  'pouchdb',
  'app.filters',
  'app.services',
  'app.directives',
  'app.controllers',
  'routeStyles',
  'formly',
  'formlyBootstrap',
  'app.DataEntryFormController',
  'ngFileUpload'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'partials/partial1.html',
    controller: 'MyCtrl1',
    css: ['css/app.css']
  });
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html',
    controller: 'MyCtrl2',
    css: ['css/app.css']
  });
  $routeProvider.when('/view3', {
    templateUrl: 'partials/partial3.html',
    controller: 'AdBoxFormController as vm',
    css: ['css/app.css', 'bower_components/bootstrap/dist/css/bootstrap.min.css']
  });
  $routeProvider.otherwise({
    redirectTo: '/view1'
  });
}])
// https://gist.github.com/kentcdodds/8bfdbf832b3cebfb050f
.run(function(formlyConfig) {
        formlyConfig.setType({
            name: 'upload-file',
            template: '<input type="file" ngf-select ng-model="files" name="files" accept="image/*" required="" ngf-multiple="false"><img class="thumbnail" ngf-src="files[0]">',
            extends: 'input',
            defaultOptions: {
                templateOptions: {
                    label: 'File Upload',
                }
            },
            controller: 
              function ($scope, Upload) {
                  $scope.$watch('files', function () {
                      $scope.upload($scope.files);console.log($scope.files);
                  });
                  // set default directive values
                  // Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );
                  $scope.upload = function (files) {
                      if (files && files.length) {
                          for (var i = 0; i < files.length; i++) {
                              var file = files[i];
                              Upload.upload({
                                  url: 'upload/url',
                                  fields: {'username': $scope.username},
                                  file: file
                              }).progress(function (evt) {
                                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                  console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                              }).success(function (data, status, headers, config) {
                                  console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                              }).error(function (data, status, headers, config) {
                                  console.log('error status: ' + status);
                              })
                          }
                      }
                  };
              } // end of function
        }); // end formly config
}) // end of .run