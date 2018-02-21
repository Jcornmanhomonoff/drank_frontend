'use strict'

const app = require('../app-data.js')
const getFormFields = require('../../../lib/get-form-fields')
const drinkApi = require('./drinkApi')
const store = require('../store')

const success = (data) => {
  console.log(data)
}

const failure = (error) => {
  console.error(error)
}

const signUpSuccess = (data) => {
  console.log(success)
  console.log(data)
}

const signInSuccess = (data) => {
  app.token = data.user.token
  app.id = data.user.id
  console.log(app)
  drinkApi.getDrank(getDrankSuccess, failure)
  // Add scroll animation to make drink section
  $('html, body').css('overflow-y', 'visible');
  $('html, body').animate({
    scrollTop: $('.create-drinks-section').offset().top
  }, 1000);
}

const changePasswordSuccess = (data) => {
  console.log(app)
  $('#changePasswordModal').modal('hide')
  $(".modal-backdrop").hide()
  console.log(data)
}

const signOutSuccess = () => {
  app.user = null
  $('#editDrinkModal').modal('hide')
  $('#createDrinkModal').modal('hide')
  console.log(app)
  $('.content').html('')
}

const newDrinkSuccess = (data) => {
  app.drinkId = data.drink.id
  $('#createDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
  drinkApi.getDrank(getDrankSuccess, failure)
}

const deleteDrankSuccess = () => {
  $('.content').html('') //reloads html
  localStorage.clear()
  drinkApi.getDrank(getDrankSuccess, failure)
}

const getDrankSuccess = (data) => {
  let getDrankDisplayTemplate = require('./templates/drank-display.handlebars')
  $('.content').html(getDrankDisplayTemplate({
    drinks: data.drinks
  }))
  console.log(data)
  store.drinks = data.drinks
}

const editDrankSuccess = (data) => {
  app.drinkId = data.drink.id
  drinkApi.getDrank(getDrankSuccess, failure)
}


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  changePasswordSuccess,
  newDrinkSuccess,
  getDrankSuccess,
  editDrankSuccess,
  deleteDrankSuccess,
}
