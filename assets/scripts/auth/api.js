'use strict'

const app = require('../app-data.js')

const signUp = (success, failure, data) => {
  $.ajax({
    method:'POST',
    url: app.api + 'sign-up',
    data,
  })
  .done(function () {
    return signIn(success, failure, data)
  })
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

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
