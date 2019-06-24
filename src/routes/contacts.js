import express from 'express';

import contactsController from '../controllers/contacts';
import contactsValidation from '../validations/contacts';

const contactsHandler = express();

contactsHandler.post(
  '/',
  contactsValidation.addingContact,
  contactsController.AddContact);

contactsHandler.get('/', contactsController.FetchAllContacts);


export default contactsHandler;