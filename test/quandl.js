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
            assert.equal(quandl.api_version, "v3");
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


    describe("contains last_uri_call", function(){
        it("contains an empty string value", function() {
            assert.equal(quandl.last_uri_called, "");
        });

        it("has correct api call for v3", function() {
            quandl.configure({
                api_version: 3,
                auth_token: "dsahFHUiewjjd"
            });

            quandl.dataset(
                {source: 'CBOE/VXEEM', format: 'json'},
                function(){});

            assert.equal(
                quandl.last_uri_called, 
                "api/v1/datasets/CBOE/VXEEM.json");
        });
    });

});
