import db from '../models/index';

const dbClient = db.client;

const createContactsTable = () => {
  const sqlQuery = `CREATE TABLE Contacts (
    ContactID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PhoneNo varchar(255) NOT NULL,
    CONSTRAINT UC_Contacts UNIQUE (ContactID,PhoneNo),
    PRIMARY KEY (ContactID)
);`;

dbClient.query(sqlQuery, (err, result) => {
  if( err ) {
    if (err.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('Contacts table already exist')
    } else {
      throw err;
    }
  } else {
    console.log('Contacts table created');
  }
});
}

const dropContactsTable = () => {
  const sqlQuery = `DROP TABLE Contacts;`
  dbClient.query(sqlQuery, (err) => {
    if(err) {
      if(err.code === 'ER_BAD_TABLE_ERROR') {
        console.log('Contacts table is not found!')
      } else {
        throw err;
      }
    } else {
      console.log('Contacts table has been dropped!')
    }
  });
}

const contactsMigrations = { createContactsTable, dropContactsTable }

export default contactsMigrations;