var http = require("http");
var querystring = require("querystring");

module.exports = function(key) {
	this.key = key;

	var getJSON = function(options, onResult)
	{	
    

    var prot = http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
	};

	this.getNews = function(callback) {
	var query = querystring.stringify({ id: '1002', fields: 'title,teaser', output: 'JSON', apikey: this.key});
	var path = "/query?" + query;
	var host = "api.npr.org";
	
  
	var options = {
		host: host,
		path: path,
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json'
	    }
	};

	getJSON(options,
        function(statusCode, result)
        {
            // I could work with the result html/json here.  I could also just return it
            //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            callback(result);
        });


	};

}