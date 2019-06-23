import mysql from 'mysql';

const client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
})

const makeConnection = ()=> {
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

const createDatabase= ()=> {
  client.query("CREATE DATABASE SmsManagement", (err, result)=> {
    if(err) {
      if (err.code === 'ER_DB_CREATE_EXISTS') {
      } else {
        throw err;
      }
    }
  });
  client.query("USE SmsManagement;", (err, result) => {
    if(err) { throw err; }
  });
};

const db = { client, makeConnection, createDatabase } 

export default db;