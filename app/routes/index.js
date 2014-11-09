var request = require('request')
  , ig = require('instagram-node').instagram();


exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Weather Proxy' });
};

exports.json = function(req, res, next) {
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  next();
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
