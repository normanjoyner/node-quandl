var _ = require("lodash");
var api = require([__dirname, "lib", "api"].join("/"));

function Quandl(config){
    this.configure(config || {});
}

Quandl.prototype.configure = function(config){
    this.auth_token = config.auth_token || undefined;
    this.proxy = config.proxy || undefined;
    this.api_version = config.api_version || 3;
    this.api_version = ["v", this.api_version].join("");
}

_.each(api, function(method, name){
    Quandl.prototype[name] = method;
});

module.exports = Quandl;
