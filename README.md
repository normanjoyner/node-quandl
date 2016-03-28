node-quandl
====================

##About

###Description
A nodejs module for interacting with the [Quandl](https://www.quandl.com) API.

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```npm install quandl```

###Configuration
Simply require the quandl module, instantiate a new Quandl object, configure it if necessary, and start making calls. The auth token and api version are configurable.

New Quandl objects can be instantiated with configuration parameters. Here is an example:
```javascript
var Quandl = require("quandl");
var quandl = new Quandl({
    auth_token: "dsahFHUiewjjd",
    api_version: 3,
    proxy: "http://myproxy:3128"
});
```

Quandl objects can also be configured via the ```.configure(options)``` method. Here is an exmaple:
```javascript
var Quandl = require("quandl");
var quandl = new Quandl();

var options = {
    auth_token: "dsahFHUiewjjd"
}

quandl.configure(options);
```

The auth_token parameter defaults to undefined (anonymous access). Be aware of the [Quandl Usage Rules](https://www.quandl.com/help/api#Usage-Rules).
The api_version parameter defaults to 3, for v3 api access.
The proxy parameter routes all requests through the specfied proxy.

###Supported API versions
* v1
* v3

###Supported API Methods
* [Getting a Dataset](https://www.quandl.com/help/api#A-Simple-Example)
* [Getting Metadata](https://www.quandl.com/help/api#Getting-Metadata)
* [Getting Multiple Datasets](https://www.quandl.com/help/api#Multiple-Datasets)
* [Performing a Search](https://www.quandl.com/help/api#Doing-a-Search)
* [Getting Favorites](https://www.quandl.com/help/api#Getting-Favourites)

###Examples
Fetch Mt. Gox Bitcoin dataset, and print response:
```javascript
quandl.dataset({ source: "BITCOIN", table: "MTGOXUSD" }, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```
Fetch dataset metadata, and print response:
```javascript
quandl.metadata("ZILLOW", "ZIP_ALLHOMES_15235", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

Search for datasets pertaining to "crude oil", and print xml response:
```javascript
quandl.search("crude oil", { format: "xml" }, function(err, response){
    console.log(err);
    console.log(response);
});
```

###Passing Search Parameters
It's possible to make simple transformations of the data prior to retrieving it. For example, you can trim the data by excluding certain fields, slice the data using start and end dates, and even sort the data in ascending or descending order.

In the following example, only the closing prices for Facebook between January 30, 2015 and January 29, 2016 are retrieved. In this case, the closing prices are presented in ascending order.

```javascript
var quandl = new Quandl({
  auth_token: "MY API TOKEN",
  api_version: 3
});

quandl.dataset({
  source: "WIKI",
  table: "FB"
}, {
  order: "asc",
  exclude_column_names: true,
  // Notice the YYYY-MM-DD format
  start_date: "2015-01-30",
  end_date: "2016-01-29",
  column_index: 4
}, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

You can customize the dataset object by adding extra parameters. For more information about these optional parameters, please take a look at [Quandl's API Docs](https://www.quandl.com/docs/api?json#data).

If you don't want to hard code the start and/or end dates, use [Moment](http://momentjs.com/) to capture and manipulate the current date and time.

###Running Tests
```npm test```
