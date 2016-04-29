'use strict';

//written function to test if all of your code works
// const signUp = (success, failure, data) => {
//   Math.random() > 0.5 ? success('in signUp') : failure(data);
// };

const app = require('../app-data.js');
const ui = require('./ui.js');


const signUp = (success, failure, data) => {
  // debugger;
  $.ajax({
    method:'POST',
    url: app.api  + '/sign-up',
    data,
  })
  .done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  // debugger;
  $.ajax({
    method:'DELETE',
    url: app.api + '/sign-out/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  })
  .done(success)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  // debugger;
  $.ajax({
    method:'POST',
    url: app.api + '/sign-in',
    data: data,
  })
  .done(success)
  .fail(failure);
};

const changePassword = (success, failure, data) => {
  $.ajax({
    method: 'PATCH',
    url: app.api + '/change-password/' + app.user.id,
    data,
    headers: {
      Authorization: 'Token token='+ app.user.token,
    },
  })
  .done(success)
  .fail(failure);
  };


module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
