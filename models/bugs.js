const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    assignedBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    comments: {
        comment:[
            {
                user:{
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                }
            }
        ]
    }

});

bugSchema.methods.addComment = function(comment){
    const username = comment.user;
    const content = comment.content;
    console.log(comment);
    const updatedComments = [...this.comments];
    updatedComments.push({
       user : username,
       content: content
    });
    this.comments = updatedComments;
    return this.save();

};





module.exports = mongoose.model('Bug', bugSchema);



/*
const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'bugs.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Bugs {
    constructor(title, description, assignedTo, assignedBy, status, priority) {
        this.name = title;
        this.desc = description;
        this.date = Date.now().toString();
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
     //   this._id = id ? new mongodb.ObjectId(id): null;
        this.status = status;
        this.priority = priority;
       // this._id = id ? new mongodb.ObjectId(id): null;
    }

     save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('bugs')
                .updateOne({ _id: this._id}, { $set: this });
        } else {
            dbOp = db.collection('bugs').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('bugs')
            .find()
            .toArray()
            .then(bugs => {
                console.log(bugs);
                return bugs;
            })
            .catch(err => {
                console.log(err);
            });
    }
};*/
