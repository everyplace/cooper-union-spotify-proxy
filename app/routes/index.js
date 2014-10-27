var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Weather Proxy' });
};


exports.weather = function(req, res){

  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  console.log("Weathering...");
  var wunderground_api = process.env.WUNDERGROUND_API;
  var weatherUndergroundUrl = "http://api.wunderground.com/api/"+wunderground_api+"/conditions/q/"+req.params.state+"/"+req.params.city+".json";
  console.log(weatherUndergroundUrl);
  request(weatherUndergroundUrl,function(err, response, body){

    res.end(body);

  });

};
