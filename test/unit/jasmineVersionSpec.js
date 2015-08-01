'use strict';

/* jasmine specs for services go here */

describe('Test to print out jasmine version', function() {
it('prints jasmine version', function() {
        console.log('jasmine-version:' + jasmine.getEnv().versionString());
    });
});
