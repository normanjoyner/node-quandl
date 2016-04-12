var _ = require("lodash");
var async = require("async");
var request = require([__dirname, "request"].join("/"));

module.exports = {

    dataset: function(code, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.auth_token = this.auth_token;
        if (this.api_version == 1) {
            this.last_uri_called = ["api", this.api_version, "datasets", code.source, code.table].join("/");
        } else {
            this.last_uri_called = "api/" + this.api_version + "/datasets/" + code.source;
            if (code.table) {
                this.last_uri_called += "/" + code.table;
            }
        }

        var config = {
            uri: this.last_uri_called, 
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        request.create(config, fn);
    },

    metadata: function(code, options, fn){
        options.exclude_data = true;
        this.dataset(code, options, fn);
    },

    multiset: function(codes, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.auth_token = this.auth_token;

        qs.columns = _.map(codes, function(code){
            var combined_code = [code.source, code.table].join(".");

            code = _.defaults(code, {
                columns: []
            });
            columns = code.columns.join(".");

            if(!_.isEmpty(columns))
                combined_code = [combined_code, columns].join(".");

            return combined_code;
        }).join(",");

        this.last_uri_called = ["api", this.api_version, "multisets"].join("/");
        var config = {
            uri: this.last_uri_called, 
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        request.create(config, fn);
    },

    favorites: function(options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.auth_token = this.auth_token;

        this.last_uri_called = ["api", this.api_version, "current_user", "collections", "datasets", "favourites"].join("/");
        var config = {
            uri: this.last_uri_called, 
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        request.create(config, fn);
    },

    search: function(terms, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.auth_token = this.auth_token;
        qs.query = terms.replace(" ", "+");

        this.last_uri_called = ["api", this.api_version, "datasets"].join("/"); 
        var config = {
            uri: this.last_uri_called, 
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        request.create(config, fn);
    }
}
