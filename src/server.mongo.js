import mongo from 'mongodb';
const mongodb = mongo.MongoClient;

export const getChannelList = cb => {
    mongodb.connect(__MONGO_URL__, (err, db) => {
        db.collection("channels")
        .find({})
        .toArray((err, result) => {
            cb(result);
            db.close();
        });
    });
};

export const getMessageList = (channelId, cb) => {
    mongodb.connect(__MONGO_URL__, (err, db) => {
        db.collection("messages")
        .find({ "channelId": parseInt(channelId) })
        .sort({ $natural: -1 })
        .limit(50)
        .toArray((err, result) => {
            cb(result);
            db.close();
        });
    });
};

export const sendMessage = (msg, cb) => {
    mongodb.connect(__MONGO_URL__, (err, db) => {
        const WriteResult = db.collection("messages")
        .insert({
            user: msg.user,
            channelId: parseInt(msg.channelId),
            text: msg.text
        });

        if (WriteResult.nInserted === 0)
            console.log(WriteResult.writeError.errmsg);
        else
            cb();
    })
};
