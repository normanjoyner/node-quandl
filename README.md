node-quandl
====================

##About

###Description
A nodejs module for interacting with the Quandl API.

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```npm install quandl```

###Configuration
Simply require the quandl module, instantiate a new Quandle object, configure it if necessary, and start making calls. The auth token and api version are configurable.

New Quandl objects can be instantiated with configuration parameters. Here is an example:
```javascript
var Quandl = require("quandl");
var quandl = new Quandl({
    auth_token: "dsahFHUiewjjd",
    api_version: 1
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

The auth_token parameter defaults to undefined (anonymous access). Be aware of the [Quandl Usage Rules](http://www.quandl.com/help/api#Usage-Rules).
The api_version parameter defaults to 1, for v1 api access.

###Supported API versions
* v1

###Supported API Methods
* [Getting a Dataset](http://www.quandl.com/help/api#A-Simple-Example)
* [Getting Metadata](http://www.quandl.com/help/api#Getting-Metadata)
* [Getting Multiple Datasets](http://www.quandl.com/help/api#Multiple-Datasets)
* [Performing a Search](http://www.quandl.com/help/api#Doing-a-Search)
* [Getting Favorites](http://www.quandl.com/help/api#Getting-Favourites)

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

Search for datasets pertaining to "crude oil", and print response:
```javascript
quandl.search("crude oil", { format: "json" }, function(err, response){
    console.log(err);
    console.log(response);
});
```
