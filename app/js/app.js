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
// setWrapper for loading status to be displayed when json select list is loading data. the html is in same file as the form itself
.run(function(formlyConfig) {
    formlyConfig.setWrapper({
      name: 'loading',
      templateUrl: 'loading.html'
    });
  })
// https://gist.github.com/kentcdodds/8bfdbf832b3cebfb050f or https://gist.github.com/benoror/6d70a1d81caa0ce08523
// setType for ng-file-upload implementation into formly fields
.run(function(formlyConfig) {
        formlyConfig.setType({
            name: 'upload-file',
            template: '<input type="file" ngf-select ng-model="files" name="files" accept="image/*" required="" ngf-multiple="false"><img class="img-thumbnail img-responsive" ngf-src="files[0]">',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            extends: 'input',
            defaultOptions: {
                //templateOptions: {label: 'File Upload',}
            },
            controller: /* @ngInject */ function ($scope, Upload, sharedProperties) {
              $scope.$watch('files', function () { 
            
                  if( $scope.files && $scope.files.length) {
                    sharedProperties.dataObj[$scope.options.key] = {// $.scope.options.key comes from formly field-key (reference to formly fields) see also http://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object-literal
                        content_type: $scope.files[0].type,// prepare an object to use as pouchdb attachment with the files from file uploader. use the sharedProperties service to share data between controllers
                        data: $scope.files[0]
                    }
                  } // end of if
                  console.log(sharedProperties.dataObj);
              });
                  // set default directive values
                  // Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );
            } // end of function
        }) // end formly config
}) // end of .run
