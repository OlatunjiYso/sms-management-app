import express from 'express';

import messagesController from '../controllers/messages';
import messageValidation from '../validations/messages';

const messagesHandler = express();

messagesHandler.post(
  '/',
  messageValidation.sendingMessage,
  messagesController.sendMessage);

messagesHandler.get('/inbox', messagesController.fetchMyReceivedMessages);

messagesHandler.get('/outbox', messagesController.fetchMySentMessages);

messagesHandler.delete('/:messageId', messagesController.deleteMessage);



export default messagesHandler;