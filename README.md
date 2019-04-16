# User Portfolio React App Using Authentication and One to Many

To test out the [application](https://userportfolios.herokuapp.com/).

Register your own account or alternatively you can login to an existing account with following credentials:

email: mary@umail.com
pw:    1234

<kbd><img src="https://media.giphy.com/media/homDKRoRtWOxAZD5N3/giphy.gif" /></kbd>

This application uses CRUD functionality.(Create, Read, Update, Delete)

The REST API requests found in [server.js](https://github.com/MGN00150905/Full-Stack-MERN-OnetoMany-Auth-Portfolio-App/blob/master/src/server/index.js) are as follows

## API Requests          

```js

GET('/api/home')            // Fetch Home component. Which gets all portfolios using React Router

GET('/api/users')           // Get all users

POST('/api/register')       // Create new user(register)

GET('/api/folios')          // Get all portfolios

GET('/api/folios/:id')      // Get a portfolio by the ID

POST('/api/folios')         // Create portfolio

PUT('/api/folios')          //  Edit Portfolio

DELETE('/api/folios')       //  Deletes portfolio from db

GET('/api/users/:id/folios') //  Grabs a particular users portfolios

POST('/api/authenticate')     //  Creates array of entered details and compares with registered user details

GET('/api/checkToken')      //  Checking token (if(LoggedIn)...)

GET('/api/logout')          //  Logs User out

```
