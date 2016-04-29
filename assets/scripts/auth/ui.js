'use strict';

const app = require('../app-data.js');

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app);
};

const signUpSuccess = (data) => {
  console.log(success);
};

const signOutSuccess = () => {
  app.user = null;
  console.log(app);
};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  app,
};
