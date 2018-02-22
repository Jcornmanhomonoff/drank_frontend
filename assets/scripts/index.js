
// user require with a reference to bundle the file and use it in this file
// var example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const getFormFields = require('../../lib/get-form-fields')

const app = require('./app-data.js')
const authApi = require('./auth/api')
const authUi = require('./auth/ui')
const authDrink = require('./auth/drinkApi')
const events = require('./auth/events')

$(() => {
  events.addHandlers()
  $('#sign-in').hide()
  $('#change-password').hide()
  $('.change-password').hide()
  $('.sign-out').hide()
  $('.open-sign-up').addClass('active')
  $('.open-sign-up').on('click', function (event) {
    event.preventDefault()
    $('#sign-in').hide()
    $('.open-sign-in').removeClass('active')
    $('#sign-up').show()
    $('.open-sign-up').addClass('active')
  })
  $('.open-sign-in').on('click', function (event) {
    event.preventDefault()
    $('#sign-up').hide()
    $('.open-sign-up').removeClass('active')
    $('#sign-in').show()
    $('.open-sign-in').addClass('active')
  })
})

// OPENS CHANGE PASSWORD FROM DROPDOWN
$('.open-change-password').on('click', function(event){
  event.preventDefault()
  $('#changePasswordModal').modal('show')
})
