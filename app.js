//configuring environment variable
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const { init, getData } = require('./util/database');
const { ObjectId } = require('mongodb');
const obj = {
    "name": "book",
    "title": "Technology",
    "page_numbers": 250,
    "publish_year": 2021,
    "edition": "6th",
    "country": "India",
    "price": 1100,
    "Domain": "science and technology",
    "subject": "engineering"
}
const obj1 = {
    "name": "interior",
    "title": "furniture",
    "model": 2015,
    "grade": "1st",
    "country": "India",
    "price": 5000
}



async function startServer() {
    try {
        await init();
        //server running 
        app.listen(PORT, (e) => {
            if (!e) {
                console.log('Server running on port: ' + PORT);
            } else {
                console.log('Error starting server:', e);
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


(async () => {
    await startServer();
    const client = getData();
    const db = client.db('store');
    const collection = db.collection('products');

    //create
    const collectionCreate = async () => {
        try {
            if (client) {
                const res = await collection.insertOne(obj1);
                console.log('Document inserted:', res);
            } else {
                throw 'db not found';
            }
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    };


    //read
    const collectionRead = async () => {
        try {
            if (client) {
                // const res = await collection.findOne({ '_id': documentId });
                const res = await collection.find({});
                console.log('Document inserted:', await res.toArray());
            } else {
                throw 'db not found';
            }
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    };


    //update
    const collectionUpdate = async () => {
        try {
            if (client) {
                const res = await collection.updateOne({ '_id': documentId }, { $set: { 'publish_year': 1966 } });
                // console.log('Document inserted:', await res.toArray());
            } else {
                throw 'db not found';
            }
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    };


    //delete
    const collectionDelete = async () => {
        try {
            if (client) {
                const res = await collection.deleteOne({ '_id': documentId });
                // console.log('Document inserted:', await res.toArray());
            } else {
                throw 'db not found';
            }
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    };

    await collectionCreate();
    await collectionRead();
    // await collectionUpdate();
    // await collectionDelete();
    // await collectionRead();
})();


const documentId = new ObjectId('65e5a0c25f8dad224d0d6062');
