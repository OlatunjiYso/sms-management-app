import db from '../models';

const dbClient = db.client;

const createMessagesTable = () => {
  const sqlQuery = ` CREATE TABLE Messages(
    messageID int NOT NULL AUTO_INCREMENT,
    senderID int NOT NULL,
    message varchar(1000) NOT NULL,
    PRIMARY KEY (messageID),
    FOREIGN KEY (senderID) REFERENCES Contacts(ContactID),
    UNIQUE (messageID)
  );`

  dbClient.query(sqlQuery, (err, result) => {
    if( err ) {
      if (err.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('Messages table already exist')
      } else {
        throw err;
      }
    } else {
      console.log('Messages table created');
    }
  });
  
}

const dropMessageTable = () => {
  const sqlQuery = `DROP TABLE Messages;`;
  dbClient.query(sqlQuery, (err) => {
    if(err) {
      if(err.code === 'ER_BAD_TABLE_ERROR') {
        console.log('Messages table is not found!')
      } else {
        throw err;
      }
    } else {
      console.log('Messages table has been dropped!')
    }
  });
}

const messageMigrations = { createMessagesTable, dropMessageTable };



export default messageMigrations;