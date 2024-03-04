

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let client;
const init = async () => {
    try {
        client = await mongoClient.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.jbcuqst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('connected!');
    } catch (e) {
        console.log(e);
    }
};

const getData = () => {
    if (client) {
        return client
    } else {
        throw 'no db found';
    }
};

module.exports = { init, getData };