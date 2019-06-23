import db from '../models';

const dbClient = db.client;

const createMessageRecipientsTable = () => {
  let sqlQuery = `CREATE TABLE MessageRecipients (
    id int NOT NULL AUTO_INCREMENT,
    recipientID int NOT NULL,
    messageID int NOT NULL,
    status varchar(255) NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (id),
    FOREIGN KEY (recipientID) REFERENCES Contacts(ContactID),
    FOREIGN KEY (messageID) REFERENCES Messages(messageID),
    UNIQUE (id)
  );`

  dbClient.query(sqlQuery, (err) => {
    if( err ) {
      if (err.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('MessageRecipients table already exist')
      } else {
        throw err;
      }
    } else {
      console.log('MessageRecipients table created');
    }
  });
}

  const dropMessageRecipientsTable = () => {
    let sqlQuery = `DROP TABLE MessageRecipients`;

    dbClient.query(sqlQuery, (err) => {
      if(err) {
        if(err.code === 'ER_BAD_TABLE_ERROR') {
          console.log('MessageRecipients table is not found!')
        } else {
          throw err;
        }
      } else {
        console.log('MessageRecipients table has been dropped!')
      }
    });
  }

  const messageRecipientsMigrations = { createMessageRecipientsTable, dropMessageRecipientsTable };


  export default messageRecipientsMigrations;