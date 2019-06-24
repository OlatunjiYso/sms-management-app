## sms-management-app API
API design for sms management.




### Features
- Sending SMS
- Fetching user inbox.
- Fetching user outbox
- Deleting messages.




### Available endpoints


|        ENDPOINT / PATH         |    HTTP VERB      |             Purpose                |         Req Body
|--------------------------------|:-----------------:|:----------------------------------:|:--------------------------------
|  api/v1/contacts/              |     GET           | fetches all contacts               |       
|  api/v1/contacts/              |     POST          | adds a new contact                 | name, phoneNumber
|  api/v1/messages/inbox         |     GET           | fetches messages sent to a user    |        
|  api/v1/messages/outbox        |     GET           | fetches messages sent by a user    | recipientId, senderId, message
|  api/v1/messages/              |     POST          | sends a message to a contact       |
|  api/v1/messages/:messageId    |     DELETE        | deletes a message.                 |





### Setting up 
- clone the project
- on the root directory, run `npm install`
- setup your local MYSQL database
- run migration script with `npm doMigrate`
- start the app with `npm start`





### Technology Stack
- Node 
- Express
- MySQL

