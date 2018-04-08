var mongoose = require('mongoose');
var Redis = require("ioredis");

mongoose.Promise = Promise;  
mongoose.connect('mongodb://localhost/product')
  .then(() =>  console.log('Connection MongoDb succesful'))
  .catch((err) => console.error(err));

  var redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4(IPv4) or 6(IPv6)
  });
  redis.on('connect', function () { 
    console.log("Connect Redis thanh cong roi");
  });

  module.exports = {
    redis
  }