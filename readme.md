# QPay

QPay is a money transaction app
It's a personal project that i didn't finish
This is the first phase of the application
  - user authentication
    - register
    - login
    - renew JWT token
  - balance management
    - get user balance
    - send balance to another user

## API Documentation
API documentation can be found [here](https://documenter.getpostman.com/view/5845507/SVSKMp21?version=latest)

### Installation

QPay requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.
```sh
$ npm install
```
Copy the contents of .env.example file to .env file
```sh
$ cp .env.example .env
```
Then update the Database credentials in your .env file

To start the development server simply run
```sh
$ npm run dev
```
To transpile es6 code using babel and start a production server run
```sh
$ npm start
```