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
  'app.DataEntryFormController'
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
