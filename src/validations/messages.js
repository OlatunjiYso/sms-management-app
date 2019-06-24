const { check, body, validationResult } = require('express-validator');

class MessagesValidation {
  static sendingMessage(req, res, next) {
    const { senderId, recipientId, message } = req.body;
    let errors = [];

    if(!senderId) {
      errors.push('senderId cannot be null');
    }
    if(!recipientId) {
      errors.push('recipientId cannot be null');
    }
    if(!message || message.trim().length < 2 ) {
      errors.push('please enter a valid message')
    }

    if (errors.length === 0) {
      next();
    } else {
      res.status(400)
        .json({
          msg: 'message not sent!',
          errors
        })
    }
    
  }

}

export default MessagesValidation;
