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

        var config = {
            uri: ["api", this.api_version, "datasets", code.source, code.table].join("/"),
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

        var config = {
            uri: ["api", this.api_version, "multisets"].join("/"),
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

        var config = {
            uri: ["api", this.api_version, "current_user", "collections", "datasets", "favourites"].join("/"),
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

        var config = {
            uri: ["api", this.api_version, "datasets"].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        request.create(config, fn);
    }
}
