var db = require('../db/index');
const redis = db.redis;
module.exports = {
    SetData: ({ key, data }) => {
        console.log("key la", key);
        console.log("data la", data);
        const results = redis.pipeline().set(key, data).exec();
        return results.then(result => { return { err: false, data: result } })
            .catch((err) => { return { err: true, data: null } });
    },
    SetDataExpiry: ({ key, data, time }) => {
        const timeExpriry = time * 60;
        const results = redis.pipeline()
            .set(key, data)
            .expire(key, timeExpriry)
            .exec();
        return results.then(result => { return { err: false, data: result } })
            .catch((err) => { return { err: false, data: result } })
    },
    GetKey: (key) => {
        console.log("key key", key);
        // const results = redis.pipeline().get(key).exec();
        return redis.get(key).then((result) => {
            console.log("result result result", result);
            if (result) {
                return { err: false, data: result }
            }
            else {
                return { err: true, data: null };
            }
        })
            .catch((err) => { return { err: true, data: null } });
    },
    DelKey: (key) => {
        const results = redis.pipeline().del(key).exec();
        return results.then(result => { return { err: false, data: result[0][1] } })
            .catch((err) => { return { err: true, data: null } });
    },

    Hset: ({ key, field, data }) => {
        const results = redis.pipeline([['hset', key, field, JSON.stringify(data)]]).exec();
        return results.then((result) => {
            if (result && result[0] && result[0][1]) {
                return { err: false, data: result[0][1] }
            }
            else {
                return { err: true, data: null };
            }
        })
            .catch((err) => { return { err: true, data: null } });
    },

    HgetKey: ({ key, field }) => {
        const results = redis.pipeline([['hget', key, field]]).exec();
        return results
            .then((result) => {
                if (result && result[0] && result[0][1]) {
                    return { err: false, data: result[0][1] }
                }
                else {
                    return { err: true, data: null };
                }
            })
            .catch((err) => { return { err: true, data: null } });
    },

    HdelKey: ({ key, field }) => {
        const results = redis.pipeline([['hdel', key, field]]).exec();
        return results
            .then((result) => {
                if (result && result[0] && result[0][1]) {
                    return { err: false, data: result[0][1] }
                }
                else {
                    return { err: true, data: null };
                }
            })
            .catch((err) => { return { err: true, data: null } });
    },
}

