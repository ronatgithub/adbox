'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])
.value('version', '0.1')

// Service to Share Data Between Controllers
// http://stackoverflow.com/questions/12008908/how-can-i-pass-variables-between-controllers
.service('sharedProperties', function() {
  // private variable
  var _dataObj = {};
  this.dataObj = _dataObj;
})

// Service to query CarQueryApi and get Json data returned to use as select options in formly form
// http://angular-formly.com/#/example/other/async-select-options-with-controller
// http://www.carqueryapi.com/documentation/api-usage/
.factory('jsonService', function jsonService($http){
    return {
      getJSON: getJSON
    };

    function getJSON(cmd) {
        //var cmd = 'getMakes';
        var source_url = 'http://www.carqueryapi.com/api/0.3/?callback=JSON_CALLBACK&cmd=' + cmd;
      return $http.jsonp(source_url) // http://mysafeinfo.com/api/data?list=autocompanies&format=json
      .success(function(data){ console.log(data); })
      .error(function(data){ console.log( "nope" ); }); ;
    }
})


// factory for pouchdb
// have no idea what it means, but it works. taken from: http://jsfiddle.net/yoorek/2zt27/1/
.factory('Database', function ($q) {
    var _db,
    _databaseName;

    var Database = function (databaseName) {
        _databaseName = databaseName;
        _db = new PouchDB(_databaseName);
    };

    Database.prototype.all = function () {
        var options = {
            include_docs: true
        };

        return $q.when(_db.allDocs(options))
            .then(function (result) {
            var converted;

            converted = result.rows.map(function (element) {
                return element.doc;
            });

            return converted;
        });
    };

    Database.prototype.create = function (record) {
        return $q.when(_db.put(record)) // _db.post(record)
            .then(function (result) {
            return _db.get(result.id);
        });
    };

    Database.prototype.remove = function (record) {
        return $q.when(_db.remove(record));
    };

    return Database;
});