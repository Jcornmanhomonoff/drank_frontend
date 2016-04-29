'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const getFormFields = require('../../lib/get-form-fields');

const authApi = require('./auth/api');
const authUi = require('./auth/ui');

// const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this);
    console.log("sign-up success");
    event.preventDefault();
    authApi.signUp(authUi.success, authUi.failure, data);
  });
  $('#sign-in').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.failure, data);
  });
  $('#sign-out').on('click', function (event) {
    console.log("sign-out success")
    event.preventDefault();
    authApi.signOut(authUi.signOutSuccess, authUi.failure);
  });
  $('#change-password').on('submit', function (event){
    let data = getFormFields(this);
    event.preventDefault();
    authApi.changePassword(authUi.success, authUi.failure, data);
  });
