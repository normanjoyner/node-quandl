var _ = require("lodash")
var assert = require("assert")
var Quandl = require([__dirname, "..", "main"].join("/"));
var quandl;

describe("quandl", function(){
    before(function(fn){
        quandl = new Quandl();
        fn();
    });

    describe("Quandl()", function(){
        it("required api methods exist", function(){
            var required_keys = [
                "configure",
                "dataset",
                "metadata",
                "multiset",
                "favorites",
                "search"
            ]

            assert.deepEqual(_.keys(quandl.__proto__), required_keys);
        });

        it("default config parameters are set correctly", function(){
            assert.equal(quandl.api_version, "v1");
            assert.equal(quandl.auth_token, undefined);
        });

    });

    describe("configure()", function(){
        it("sets config parameters correctly", function(){
            quandl.configure({
                api_version: 1,
                auth_token: "dsahFHUiewjjd"
            });
            assert.equal(quandl.api_version, "v1");
            assert.equal(quandl.auth_token, "dsahFHUiewjjd");
        });

    });
});
