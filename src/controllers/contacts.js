import db from '../models';

const dbClient = db.client;

class contactsController {

  /**
   * @description - Adds a new contact
   * @param {object} req - request body
   * @param {object} res - response body
   */
  static AddContact(req, res) {
    const { phoneNumber, name } = req.body;
    let sqlQuery = `INSERT INTO Contacts (Name, PhoneNo)
    VALUES ('${name}', '${phoneNumber}');`;

    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        res.status(501)
          .json({
              error: err.sqlMessage, 
              msg: 'internal server error'
          })
      } else {
        res.status(201).json({
          msg: 'contact successfully added!',
          affectedRows: result.affectedRows
        })
      }
    });
  }

  static FetchAllContacts(req, res) {
    let sqlQuery = `SELECT * FROM Contacts;`
    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        res.status(501)
          .json({
              msg: 'internal server error',
              error: err.sqlMessage
          })
      } else {
          res.status(200)
            .json({
              msg: 'contacts found',
              contacts: result
            });
      }
    });
  }
}

export default contactsController;