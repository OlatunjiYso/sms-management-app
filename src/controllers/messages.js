import db from '../models';

const dbClient = db.client;

/**
 * @description - contains static methods for messages
 */
class MessagesController {

  /**
   * @description - sends a new message.
   * @param {object} req - request object
   * @param {object} res -response object
   */
static sendMessage(req, res) {
  const { senderId, recipientId, message } = req.body;

  let sqlQuery = `INSERT INTO Messages (senderId, message)
  VALUES (${senderId}, '${message}');`

  dbClient.query(sqlQuery, (err, result) => {
    if(err) {
      res.status(500)
        .json({
          msg: 'internal server error',
          error: err
        })
    } else {
      let messageId = result.insertId;
      let sqlQuery = `INSERT INTO MessageRecipients (recipientId, messageId)
      VALUES (${recipientId}, ${messageId});`

      dbClient.query(sqlQuery, (err, result) => {
        if (err) { 
          res.status(500)
            .json({
              msg: 'internal server error',
              error: err.sqlMessage
            })
        } else {
          res.status(201)
            .json({
              msg: 'message sent!',
              result
            })
        }
      });
    }
  })
}

static fetchMyReceivedMessages(req, res) {
  const { myId } = req.body;

  let sqlQuery = `SELECT Contacts.Name AS Sender, Contacts.PhoneNo, MessageRecipients.status, Messages.message 
  FROM ( (MessageRecipients
    INNER JOIN Messages ON MessageRecipients.messageID = Messages.messageID)
    INNER JOIN Contacts ON Messages.senderId = Contacts.ContactID)
    WHERE MessageRecipients.recipientID= ${myId};`

    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
        .json({
          msg: 'internal server error',
          error: err.sqlMessage
        })
      } 
      return res.status(200)
        .json({
          msg: 'here is your inbox',
          messages: result
        });
    });
}

static fetchMySentMessages(req, res) {
  const { myId } = req.body;

  let sqlQuery = `SELECT Contacts.Name AS Recipient, Contacts.PhoneNo As RecipientPhone, MessageRecipients.status, Messages.message 
  FROM ( (MessageRecipients
    INNER JOIN Messages ON MessageRecipients.messageID = Messages.messageID)
    INNER JOIN Contacts ON MessageRecipients.recipientID = Contacts.ContactID)
    WHERE Messages.senderID= ${myId};`

    dbClient.query(sqlQuery, (err, result) => {
      if (err) {
        return res.status(501)
        .json({
          msg: 'internal server error',
          error: err.sqlMessage
        })
      } 
      return res.status(200)
        .json({
          msg: 'here is your outbox',
          messages: result
        });
    });
}

/**
 * @description - deletes a message specified by id
 * @param {object} req - request object
 * @param {object} res - response object
 */
static deleteMessage(req, res) {
  const { messageId } = req.params;

  let sqlQuery = `DELETE FROM MessageRecipients WHERE MessageRecipients.messageID = ${messageId};`

  dbClient.query(sqlQuery, (err, result) => {
    if(err) {
      return res.status(501)
        .json({
          msg: 'Internal servevr error',
          error: err.sqlMessage
        })
    }
    let sqlQuery = `DELETE FROM Messages WHERE Messages.messageID = ${messageId};`
    dbClient.query(sqlQuery, (err, result) => {
      if(err) {
        return res.status(501)
          .json({
            msg: 'internal serveer error',
            error: err.sqlMessage
          })
      }
      return res.status(200)
        .json({
          msg: 'message deleted!',
          result
        })
    });
  })
}
}

export default MessagesController;