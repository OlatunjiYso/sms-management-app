import express from 'express';

import messagesController from '../controllers/messages';

const messagesHandler = express();

messagesHandler.post('/', messagesController.sendMessage);

messagesHandler.get('/inbox', messagesController.fetchMyReceivedMessages);

messagesHandler.get('/outbox', messagesController.fetchMySentMessages);

messagesHandler.delete('/:messageId', messagesController.deleteMessage);



export default messagesHandler;