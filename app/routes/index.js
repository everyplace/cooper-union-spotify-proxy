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

exports.instagram_location = function(req, res) {
  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});

  ig.location_search({ lat: parseFloat(req.params.lat), lng: parseFloat(req.params.long) }, function(err, result, remaining, limit) {

    var resultCache = [];
    for(i in result) {
      ig.location_media_recent(result[i].id, {min_timestamp:1388534400}, function(err, result, pagination, remaining, limit) {
        // console.log(err, result);
        for(j in result) {
          resultCache.push(result[j]);
        }

        if(i = result.length -1 ){
          res.end(JSON.stringify(resultCache));
        }
      });

    }

  });

};