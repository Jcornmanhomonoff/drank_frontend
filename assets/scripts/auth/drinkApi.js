'use strict';

const app = require('../app-data.js')
const ui = require('./ui.js')

const newDrink = (success, failure, data) => {
  console.log(data)
  $.ajax({
    method:'POST',
    url: app.api + 'drinks',
    headers: {
      Authorization: 'Token token='+ app.token,
    },
    data
  })
  .done(success)
  .fail(failure)
}

const getDrank = (success, failure) => {
  $.ajax({
    method:'GET',
    url: app.api + 'drinks',
    headers: {
      Authorization: 'Token token='+ app.token,
    },
  })
  .done(success)
  .fail(failure)
}


const editDrank = (success, failure, data, drinkId) => {
  console.log(data)
  $.ajax({
    method:'PATCH',
    url: app.api + 'drinks/' + drinkId,
    headers: {
      Authorization: 'Token token='+ app.token,
    },
    data
    })
    .done(success)
    .fail(failure)
}


const deleteDrank = (success, failure, drinkId) => {
  console.log(drinkId)
  $.ajax({
    method:'DELETE',
    url: app.api + 'drinks/' + drinkId,
    headers: {
      Authorization: 'Token token='+ app.token,
    },
  })
  .done(success)
  .fail(failure)
}


module.exports = {
  newDrink,
  getDrank,
  editDrank,
  deleteDrank,
}
