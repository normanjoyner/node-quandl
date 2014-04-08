var _ = require("lodash")
var assert = require("assert")
var pkg = require([__dirname, "..", "package"].join("/"));
var Quandl = require([__dirname, "..", "main"].join("/"));
var quandl;

describe("main", function(){
    before(function(fn){
        quandl = new Quandl();
        fn();
    });

    describe("new Quandl()", function(){
        it("api_version parameter exists", function(){
            assert.ok(_.has(quandl, "api_version"));
        });

        it("auth_token parameter exists", function(){
            assert.ok(_.has(quandl, "auth_token"));
        });

        it("version parameter exists", function(){
            assert.ok(_.has(quandl, "version"));
        });

        it("version parameter equals that defined in package.json", function(){
            assert.equal(quandl.version, pkg.version);
        });
    });

});
