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
  }, 1000)
  $('#change-password').show()
  $('.change-password').show()
  $('.sign-out').show()
  $('#sign-in').hide()
  $('.open-sign-in').hide()
  $('#sign-up').hide()
  $('.open-sign-up').hide()
}

const changePasswordSuccess = (data) => {
  console.log(app)
  $('#changePasswordModal').modal('hide')
  $(".modal-backdrop").hide()
  console.log(data)
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
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  changePasswordSuccess,
  newDrinkSuccess,
  getDrankSuccess,
  editDrankSuccess,
  deleteDrankSuccess,
}
