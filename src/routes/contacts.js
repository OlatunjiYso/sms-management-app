import express from 'express';

import contactsController from '../controllers/contacts';

const contactsHandler = express();

contactsHandler.post('/', contactsController.AddContact);

contactsHandler.get('/', contactsController.FetchAllContacts);


export default contactsHandler;