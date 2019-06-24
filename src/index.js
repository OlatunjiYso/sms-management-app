import express from 'express';
import bodyParser from 'body-parser';

import contactsHandler from './routes/contacts';
import messagesHandler from './routes/messages';

import db from './models';

//connect db
db.makeConnection();
db.createDatabase();


const app = express();

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/contacts/', contactsHandler);
app.use('/api/v1/messages/', messagesHandler);


app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);