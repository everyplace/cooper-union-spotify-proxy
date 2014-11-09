var request = require('request')
  , ig = require('instagram-node').instagram();


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

exports.instagram_search = function(req, res) {

  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});
  ig.tag_media_recent(req.params.search, function(err, medias, pagination, remaining, limit) {

    res.end(JSON.stringify(medias));
  });


};
