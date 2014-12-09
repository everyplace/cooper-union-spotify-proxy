var request = require('request')
  , ig = require('instagram-node').instagram();


exports.index = function(req, res){
  res.render('index', { title: 'Cooper Union Instagram Proxy' });
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


exports.instagram_user_search = function(req, res) {
  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});
  ig.user_search(req.params.username, function(err, users, remaining, limit) {

    res.end(JSON.stringify(users));
  });
};

exports.instagram_user_info = function(req, res) {
  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});
  ig.user(req.params.username, function(err, result, remaining, limit) {

    res.end(JSON.stringify(result));
  });
};

exports.instagram_tag_media_recent = function(req, res) {
  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});
  var count = (req.query.count && (req.query.count <= 100)) ? req.query.count : 15;
  ig.tag_media_recent(req.params.tag, {count:count}, function(err, medias, pagination, remaining, limit) {

    res.end(JSON.stringify(medias));
  });
};

exports.instagram_location_venue = function(req, res) {
  ig.use({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET});

  ig.location(req.params.id, function(err, result, remaining, limit) {
    res.end(JSON.stringify(result));
  });

};




// ig.tag_media_recent('tag', [options,] function(err, medias, pagination, remaining, limit) {});
