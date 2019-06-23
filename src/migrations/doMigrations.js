import db from '../models';
import contactsMigrations from './contacts';
import messagesMigrations from './messages';
import messageRecipientsMigrations from './messageRecipients';

const dbClient = db.client;
dbClient.query("USE SmsManagement;", (err, result) => {
  if(err) { throw err; }
});

const runMigrations = () => {
  contactsMigrations.createContactsTable();
  messagesMigrations.createMessagesTable();
  messageRecipientsMigrations.createMessageRecipientsTable();
}



runMigrations();