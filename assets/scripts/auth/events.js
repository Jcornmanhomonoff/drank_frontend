'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const authApi = require('./api');
const authUi = require('./ui');

const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this)
    console.log("sign-up success")
    event.preventDefault()
    authApi.signUp(authUi.success, authUi.failure, data)
  })
  $('#sign-in').on('submit', function (event) {
    let data = getFormFields(this)
    console.log("sign-in success")
    event.preventDefault()
    authApi.signIn(authUi.signInSuccess, authUi.failure, data)
  })
  $('#sign-out').on('click', function (event) {
    console.log("sign-out success")
    event.preventDefault()
    authApi.signOut(authUi.signOutSuccess, authUi.failure)
  })
  $('#change-password').on('submit', function (event){
    let data = getFormFields(this)
    event.preventDefault()
    authApi.changePassword(authUi.changePasswordSuccess, authUi.failure, data)
  })
  $('#create-drink').on('submit', function (event){
    event.preventDefault()
    let data = getFormFields(this)
    console.log(data)
    data.drinks.user_id = app.id
    authApi.newDrink(authUi.newDrinkSuccess, authUi.failure, data)
    authApi.newIngredient(authUi.newIngredientSuccess, authUi.failure, data)
  })
  $('#get-drank').on('click', function (event){
    event.preventDefault()
    $('.content').html('')
    authDrink.getDrank(authUi.getDrankSuccess, authUi.failure)
    authApi.getIngredients(authUi.getIngredientsSuccess, authUi.failure)
  })
}

module.exports = {
  addHandlers
}
