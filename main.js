var _ = require("lodash");
var Quandl = require([__dirname, "quandl"].join("/"));
var pkg = require([__dirname, "package"].join("/"));

exports = module.exports = function(config){
    var quandl = new Quandl(config);
    quandl.version = pkg.version;
    return quandl;
}
