var _ = require("lodash");
var request = require("request");
var configuration = require([__dirname, "..", "config"].join("/"));

exports.create = function(config, fn){
    var uri = [configuration.base_uri, config.uri].join("/");
    var options = {
        uri: [uri, config.format].join("."),
        method: "GET",
        qs: config.qs || {},
        proxy: config.proxy
    }

    request(options, function(err, response, body){
        fn(err, body);
    });
}
