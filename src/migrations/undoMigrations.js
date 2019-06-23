import db from '../models';
import contactsMigrations from './contacts';
import messagesMigrations from './messages';
import messageRecipientsMigrations from './messageRecipients';

const dbClient = db.client;
dbClient.query("USE SmsManagement;", (err, result) => {
  if(err) { throw err; }
});

const undoMigrations = () => {
  messageRecipientsMigrations.dropMessageRecipientsTable();
  messagesMigrations.dropMessageTable();
  contactsMigrations.dropContactsTable();
};



undoMigrations();