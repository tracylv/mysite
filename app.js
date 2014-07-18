/**
 * Created by tracy_000 on 3/29/14.
 */

var grunt = require('grunt');
var geddy = require('geddy');


if(process.env.GEDDY_ENVIRONMENT && process.env.GEDDY_ENVIRONMENT.length > 0)
{
    grunt.tasks(["optresc"], {}, function(){

        // start the website
        geddy.start({environment: process.env.GEDDY_ENVIRONMENT});

        // start watch task
        grunt.tasks(['rescwatch']);
    });
}
else
{
    // start the website
    geddy.start({environment: 'production'});
}

