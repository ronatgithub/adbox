'use strict';

/* Controllers */

angular.module('app.controllers', [])
  .controller('MyCtrl1', [function($scope) {
  	
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

// debugger;

// taken from: http://jsfiddle.net/yoorek/2zt27/1/
.controller('MyCtrl2', function ($scope, Database) {
    var db = new Database('test_v1');

    $scope.init = function () {
        db.all()
            .then(function (result) { 
                $scope.data = result; 
        });
    };

    $scope.populate = function () {
        db.create({
            name: 'One'
        });
        db.create({
            name: 'Two'
        });
        db.create({
            name: 'Three'
        });
    };

    $scope.remove = function (item, index) {
        db.remove(item);
        $scope.data.splice(index, 1);
    };

    $scope.db = db;
})



