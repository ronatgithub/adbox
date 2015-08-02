'use strict';

/* Controllers */

angular.module('app.controllers', [])
  .controller('MyCtrl1', [function($scope) {
  	// var db = new PouchDB('testdb_v3');
  	var localDB = new PouchDB('adbox_v1');
  	var remoteDB = new PouchDB('https://adscreen.iriscouch.com/adbox_v1');
  	localDB.sync(remoteDB, {
	  live: true,
	  retry: true
	}).on('change', function (change) {
	  // yo, something changed!
	  console.log('yo, something changed')
	}).on('paused', function (info) {
	  // replication was paused, usually because of a lost connection
	  console.log('connection lost')
	}).on('active', function (info) {
	  // replication was resumed
	  console.log('connection resumed')
	}).on('error', function (err) {
	  // totally unhandled error (shouldn't happen)
	  console.log('error, this shouldn`t happen')
	});
  }])
  .controller('MyCtrl2', [function() {

  }]);
