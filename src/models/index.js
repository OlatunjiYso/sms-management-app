import 'dotenv/config';
import mysql from 'mysql';
console.log('THIS IS THE PASSWORD------------>>>>>>>>>>', process.env.LOCAL_DB_HOST);
const client = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USERNAME,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB
});

const makeConnection = ()=> {
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected to SmsManagement database!");
  });
}


const db = { client, makeConnection } 

export default db;