const mongoose = require('mongoose');

// DEV
//require('dotenv').config();

const IP        = process.env.MONGODB_IP;
const dbName    = process.env.MONGODB_DB;
const user      = process.env.MONGODB_USER;
const password  = process.env.MONGODB_PASSWORD;

class DB { 
    constructor() {
        console.log("Connecting to database");
        var url = "mongodb+srv://";
        url += user ? (user +":"+password+"@") : "";
        url += IP;
        url += "/"+dbName;

        mongoose.connect(url, {useNewUrlParser: true});
    }
}

class DBI {
    static DBInterface;
    static getInterface() {
        if(!this.DBInterface)
            this.DBInterface = new DB();

        return this.DBInterface;
    }

    static getConnection() {
        this.getInterface();
        return mongoose.connection;
    }

    static initConnection() {
        this.getInterface();
    }
}

module.exports = DBI;