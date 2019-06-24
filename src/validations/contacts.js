const { check, body, validationResult } = require('express-validator');
class ContactsValidation {

  static addingContact(req, res, next) {
    let { phoneNumber, name } = req.body;
    let errors = [];

    if(!phoneNumber || phoneNumber.trim().length < 10 ) {
      errors.push('Please enter phone number up to 10 digits');
    }
    if(!name || name.trim().length < 2 ) {
      errors.push('please enter a valid name ')
    }

    if (errors.length === 0) {
      next();
    } else {
      res.status(400)
        .json({
          msg: 'contact not added',
          errors
        })
    }
    
  }

}

export default ContactsValidation;

