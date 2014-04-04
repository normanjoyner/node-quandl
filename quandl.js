var _ = require("lodash");
var api = require([__dirname, "lib", "api"].join("/"));

function Quandl(config){
    var self = this;
    _.each(api, function(method, name){
        self[name] = method;
    });

    this.configure(config || {});
}

Quandl.prototype.configure = function(config){
    this.config = _.defaults(config, {
        api_key: undefined,
        api_version: 1
    });

    this.config.api_version = ["v", this.config.api_version].join("");
}

module.exports = Quandl;
