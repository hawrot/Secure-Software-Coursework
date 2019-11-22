const fs = require('fs');
const path = require('path');

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
    constructor(title, description, date, assignedBy, assignedTo) {
        this.name = title;
        this.desc = description;
        this.date = date;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
    }

    save() {
        getProductsFromFile(bugs => {
            bugs.push(this);
            fs.writeFile(p, JSON.stringify(bugs), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};