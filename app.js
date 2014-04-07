/**
 * Created by tracy_000 on 3/29/14.
 */

var grunt = require('grunt');
var geddy = require('geddy');

grunt.tasks(["optresc"], {}, function(){

    // start the website
    geddy.start({environment: process.env.GEDDY_ENVIRONMENT || 'production'});

    // start watch task
    grunt.tasks(['rescwatch']);
});

