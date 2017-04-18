
'use latest';

var MongoClient = require('mongodb').MongoClient;
var waterfall   = require('async').waterfall;

/**
 * @param {secret} MONGO_URL - Mongo database url
 */
module.exports = (ctx, cb) => {

    var MONGO_URL = ctx.data.MONGO_URL;
    if (!MONGO_URL) return cb(new Error('MONGO_URL secret is missing'))

    if (!ctx.query.url) {
        return cb(null, 'Error');
    }

    waterfall([
        done => {
            MongoClient.connect(MONGO_URL, function(err, db) {
                if(err) return done(err);

                done(null, db);
            });
      },
      (db, done) => {
            db
                .collection('stats')
                .findOneAndUpdate(
                    { url: ctx.query.url }, 
                    { $inc: { count: 1 } }, 
                    { },
                    (err, r) => {
                        let res = r.value;
                        if (res) {
                            res = {...res, count: res.count + 1 }
                        }
                        done(null, db, res);
                    });
      },
      (db, v, done) => {
            if (!v) {
                const toInsert = { url: ctx.query.url, count: 1 };
                db
                    .collection('stats')
                    .insertOne(toInsert, (err, result) => {
                        if(err) return done(err);

                        done(null, toInsert);
                  });
            } else {
                done(null, v);
            }
      }
    ], cb);
};
