'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', []).
  value('version', '0.1');

// Inject the pouchdb object into your services
// See: https://github.com/wspringer/angular-pouchdb#usage
// angular.factory('someservice', function(pouchdb) {
//   // Do something with pouchdb.
// });

// Injecting a database as a dependency
// https://github.com/wspringer/angular-pouchdb#injecting-a-database-as-a-dependency
// angular.module('app.services').
//   factory('$db', function(pouchdb) {
//     return pouchdb.create('testdb');
// });

// angular.module('app.services').
//   factory('testservice', function($db) {
//     return {
//       add: function(obj) { $db.put(obj); }
//     };
// });

//  angular.module('app.services').service('syncService',
//     function ($q, $log, $rootScope, storageService, pouchdb, config) {
//     }
// );