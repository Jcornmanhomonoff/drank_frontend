'use strict'

const app = require('../app-data.js')
const getFormFields = require('../../../lib/get-form-fields')
const drinkApi = require('./drinkApi')
const api = require('./api')
const store = require('../store')

const removeClass = () => {
    $('button').removeClass('error');
}

const success = (data) => {
  console.log(data)
}

const failure = (error) => {
  console.error(error)
}

const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = () => {
  $('#sign-up button').html('Error Signing Up')
  $('#sign-up button').addClass('error')
  setTimeout(function () {
    $('#sign-up button').html('Submit')
    removeClass()}, 3000)
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
  }, 1000)
  $('#change-password').show()
  $('.change-password').show()
  $('.sign-out').show()
  $('#sign-in').hide()
  $('.open-sign-in').hide()
  $('#sign-up').hide()
  $('.open-sign-up').hide()
}

const signInFailure = () => {
  $('#sign-in button').html('Error Signing In')
  $('#sign-in button').addClass('error')
  setTimeout(function () {
    $('#sign-in button').html('Submit')
    removeClass()}, 3000)
}

const changePasswordSuccess = (data) => {
  $('#changePasswordModal').modal('hide')
  $(".modal-backdrop").hide()
  console.log(data)
}

const changePasswordFailure = () => {
  $('#change-password button').html('Please try again')
  $('#change-password button').addClass('error')
  setTimeout(function () {
    $('#change-password button').html('Submit')
    removeClass()}, 3000)
}

const signOutSuccess = () => {
  app.token = null
  app.id = null
  console.log(store)
  store.drinks = null
  $('.content').html('')
  $('#sign-up').show()
  $('.open-sign-up').show()
  $('.open-sign-in').show()
  $('.open-sign-up').addClass('active')
  $('.open-sign-in').removeClass('active')
  $('#change-password').hide()
  $('.change-password').hide()
  $('.sign-out').hide()
  // $('html').css('overflow-y', 'hidden')
}

const newDrinkSuccess = (data) => {
  app.drinkId = data.drink.id
  $('#createDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
  drinkApi.getDrank(getDrankSuccess, failure)
}

const deleteDrankSuccess = () => {
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
  $('.cancel').hide()
  drinkApi.getDrank(getDrankSuccess, failure)
}


module.exports = {
  failure,
  success,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  newDrinkSuccess,
  getDrankSuccess,
  editDrankSuccess,
  deleteDrankSuccess,
  removeClass
}
