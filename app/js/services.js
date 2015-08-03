'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])
.value('version', '0.1')

// have no idea what it means, but works. taken from: http://jsfiddle.net/yoorek/2zt27/1/
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
        return $q.when(_db.post(record))
            .then(function (result) {
            return _db.get(result.id);
        });
    };

    Database.prototype.remove = function (record) {
        return $q.when(_db.remove(record));
    };

    return Database;
});