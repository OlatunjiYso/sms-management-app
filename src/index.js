import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import contactsHandler from './routes/contacts';
import messagesHandler from './routes/messages';

import db from './models';

//connect db
db.makeConnection();


const app = express();

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/contacts/', contactsHandler);
app.use('/api/v1/messages/', messagesHandler);


app.listen(process.env.PORT || 3000);