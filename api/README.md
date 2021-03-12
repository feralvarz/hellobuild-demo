# Hello Build Demo API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## Installation

run `yarn install` to add scripts, then `yarn start`,\
or\
 `npm install` then `npm start`

---

## Google Calendar Endpoints

- Auth endpoint for google calendar\
  **GET** http://localhost:3000/calendar/auth-url

- Authorize token internally / Refresh Token\
  **GET** http://localhost:3000/calendar/authorize

- Google Oauth Callback, sets token\
  **POST** http://localhost:3000/calendar/oauth2callback

- Whether user is authenticated in the app\
  **GET** http://localhost:3000/calendar/authorized

- Removes token and credentials\
  **GET** http://localhost:3000/calendar/reset

- List upcoming events from next month\
  **GET** http://localhost:3000/calendar/list

- Cancel an event\
  **POST** http://localhost:3000/calendar/cancelevent

## Github Endpoints

- Whether user is authenticated with Github\
  **GET** http://localhost:3000/api/github/authorized

- Authorize token internally / Refresh Token\
  **GET** http://localhost:3000/api/github/authorize

- Github Oauth Callback, sets token\
  **POST** http://localhost:3000/api/github/oauth2callback

- List Repositories for authorized user\
  **GET** http://localhost:3000/api/github/list

## User Endpoints

- Check if user is authorized using local storage with file system\
  **POST** http://localhost:3000/users/authorize

- Register a new user and saves to file system\
  **POST** http://localhost:3000/users/register

- Remove user credentials from backend\
  **DELETE** http://localhost:3000/users/oauth2callback
