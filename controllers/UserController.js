var usersModel = require('../models/users');
var redis = require('../lib/redis');
var elasticSearchClient = require('../lib/elasticsearch');


module.exports = {
    getUser: async (req, res) => {
        let data = await usersModel.find();
        var promiseArr = data.map(obj => {
            return redis.GetKey(`user:${obj._id}`).then(rsRedis => {
                console.log("valueRedis valueRedis", rsRedis);
                let objNew = obj.toObject();
                if (!rsRedis.err) {
                    objNew['valueRedis'] = JSON.parse(rsRedis.data);
                }
                else {
                    objNew['valueRedis'] = null;
                    //call database and reset
                }
                // console.log("valueRedis obj", objNew);
                return objNew;
            })

        })
        Promise.all(promiseArr).then(rs => {
            res.json({ err: false, data: rs });
        })
    },
    createUser: async (req, res) => {
        let { name, password } = req.query;
        let data = await usersModel.create({ name, password })
        console.log("data Alllllll ", data);
        console.log("data 11111 ", data.id, data._id);
        let dataUser = await redis.SetData({ key: `user:${data._id}`, data: JSON.stringify(data) });
        console.log("dataUser dataUser dataUser", dataUser);
        res.json({ err: null, data: data });

    },
    findElasticSearch: async (req, res) => {
        let rsSearch = await elasticSearchClient.search(
            'shoppost',
             'shoppost',
           {
                "query": {
                    "term": {
                        "_id": "5a0be1a13b4acd4870f5ae38"
                    }
                }
            }
        )
        res.json({data: rsSearch})
    }
}