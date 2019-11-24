const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, bugs, id){
        this.username = username;
        this.email = email;
        this.bugs = bugs; // []
        this._id = id;
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }
    static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }

}