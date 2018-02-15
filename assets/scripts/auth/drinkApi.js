'use strict';

//written function to test if all of your code works
// const signUp = (success, failure, data) => {
//   Math.random() > 0.5 ? success('in signUp') : failure(data);
// };

const app = require('../app-data.js');
const ui = require('./ui.js');



const getDrank = (success, failure) => {
  $.ajax({
    method:'GET',
    url: app.api + 'drinks',
    headers: {
      Authorization: 'Token token='+ app.token,
    },
  })
  .done(success)
  .fail(failure);
};


const editDrank = (success, failure, data, drinkId) => {
  console.log(drinkId);
  console.log(data);
  $.ajax({
    method:'PATCH',
    url: app.api + 'drinks/' + drinkId,
    headers: {
      Authorization: 'Token token='+ app.token,
    },
    data: {
      'drink': {
        'name': data
      }
    }
    })
    .done(success)
    .fail(failure);
};


const deleteDrank = (success, failure, drinkId) => {
  console.log(drinkId);
  $.ajax({
    method:'DELETE',
    url: app.api + 'drinks/' + drinkId,
    headers: {
      Authorization: 'Token token='+ app.token,
    },
  })
  .done(success)
  .fail(failure);
};


module.exports = {
  getDrank,
  editDrank,
  deleteDrank,
};
