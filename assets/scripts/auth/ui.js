'use strict'

const app = require('../app-data.js')
const getFormFields = require('../../../lib/get-form-fields')
const drinkApi = require('./drinkApi')
const api = require('./api')
const store = require('../store')
const showDrankTemplate = require('./templates/drank-content.handlebars')

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
  console.log(data)
  $('.user-name').text('Welcome ' +  data.user.first_name)
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
  $('#change-password button').html('Success')
  setTimeout(function () {
    $('#change-password button').html('Submit')
  }, 3000)
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
  $('.user-name').text('')
  $('#sign-in input').val('')
  $('#sign-up input').val('')
  $('#create-drink input').val('')
  $('html').css('overflow-y', 'hidden')
}

const newDrinkSuccess = (data) => {
  app.drinkId = data.drink.id
  drinkApi.getDrank(getDrankSuccess, failure)
  $('#create-drink input').val('')
  $('html,body').animate({scrollTop: $('.drink-list-section').offset().top},1000);
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
  drinkApi.getDrank(getDrankSuccess, failure)
  const drank = store.drinks.find(function (drink) {
    return drink.id === app.drinkId
  })
  const showDrankHtml = showDrankTemplate({ drank })
  $('.drink-content').html(showDrankHtml)
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
