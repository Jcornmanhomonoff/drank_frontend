'use strict'

const app = require('../app-data.js')
const ui = require('./ui.js')


const signUp = (success, failure, data) => {
  $.ajax({
    method:'POST',
    url: app.api + 'sign-up',
    data,
  })
  .done(success)
  .fail(failure)
}

const signOut = (success, failure) => {
  $.ajax({
    method:'DELETE',
    url: app.api + 'sign-out/' + app.id,
    headers: {
      Authorization: 'Token token=' + app.token,
    },
  })
  .done(success)
  .fail(failure)
}

const signIn = (success, failure, data) => {
  $.ajax({
    method:'POST',
    url: app.api + 'sign-in',
    data: data,
  })
  .done(success)
  .fail(failure)
}

const changePassword = (success, failure, data) => {
  $.ajax({
    method: 'PATCH',
    url: app.api + 'change-password/' + app.id,
    data,
    headers: {
      Authorization: 'Token token='+ app.token,
    },
  })
  .done(success)
  .fail(failure)
}

//   const newIngredient = (success, failure, data) => {
//   // debugger
//   console.log(data)
//   console.log(app.token)
//   $.ajax({
//     method:'POST',
//     url: app.api + 'ingredients',
//     headers: {
//       Authorization: 'Token token='+ app.token,
//     },
//     data: {
//       "ingredient": {
//         "alcohol": data.drinks.alcohol,
//         "mixer": data.drinks.mixer,
//         "suggestion": data.drinks.suggestion
//       }
//     },
//   })
//   .done(success)
//   .fail(failure)
// }
//
//
// const getIngredients = (success, failure) => {
//   $.ajax({
//     method:'GET',
//     url: app.api + 'ingredients',
//     headers: {
//       Authorization: 'Token token='+ app.token,
//     },
//   })
//   .done(success)
//   .fail(failure)
// }
//
//
// const editIngredient = (success, failure, data, id) => {
//   // debugger
//   console.log(id)
//   console.log(app.token)
//   $.ajax({
//     method:'PATCH',
//     url: app.api + 'ingredients/' + id,
//     headers: {
//       Authorization: 'Token token='+ app.token,
//     },
//   })
//   .done(success)
//   .fail(failure)
// }



module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
