'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const appData = require('../app-data')
const api = require('./api')
const ui = require('./ui')
const showDrankTemplate = require('./templates/drank-content.handlebars')
const drinkApi = require('./drinkApi')
const store = require('../store')

const onSignUp = function (event) {
  let data = getFormFields(this)
  event.preventDefault()
  api.signUp(ui.success, ui.failure, data)
}

const onSignIn = function (event) {
  let data = getFormFields(this)
  console.log("sign-in success")
  event.preventDefault()
  api.signIn(ui.signInSuccess, ui.failure, data)
}

const onSignOut = function (event) {
  console.log("sign-out success")
  event.preventDefault()
  api.signOut(ui.signOutSuccess, ui.failure)
}

const onChangePw = function (event) {
  let data = getFormFields(this)
  event.preventDefault()
  api.changePassword(ui.changePasswordSuccess, ui.failure, data)
}

const onShowDrank = function (event) {
    event.preventDefault()
    // get id from clicked item
    const drankId = event.target.id
    // get drank with matching id
    const drank = store.drinks.find(function (drink) {
      return drink.id.toString() === drankId
    })
    console.log(drank)
    const showDrankHtml = showDrankTemplate({ drank })
    $('.drink-content').html(showDrankHtml)
}

const onCreateDrank = function (event) {
  event.preventDefault()
  let data = getFormFields(this)
  console.log(data)
  data.drinks.user_id = appData.id
  drinkApi.newDrink(ui.newDrinkSuccess, ui.failure, data)
  api.newIngredient(ui.newIngredientSuccess, ui.failure, data)
}

let drinkId = ''

const onOpenEditDrank = function (event) {
  event.preventDefault()
  drinkId = $(this).data('id')
  const drinkVal = $(this).siblings("h2").html()
  $(this).siblings("h2").replaceWith("<form class='update-drink'><input value='" + drinkVal + "'></input><br><button class='submit-edit-drink drink-btn' type='submit'>Submit</button></form>")
  $('.edit-drink').hide()
  $('.cancel').show()
  return drinkId
}

const onEditDrank = function (event) {
  event.preventDefault()
  const drinkName = $(this).find("input").val()
  drinkApi.editDrank(ui.editDrankSuccess, ui.failure, drinkName, drinkId)
}

const onDeleteDrank = function (event) {
  event.preventDefault()
  const drankId = $(this).data('id')
  console.log(drankId)
  drinkApi.deleteDrank(ui.deleteDrankSuccess, ui.failure, drankId)
}

const onCancelEdit = function (event) {
  event.preventDefault()
  const drinkVal = $(this).siblings("form").find("input").val()
  $(this).siblings("form").replaceWith("<h2>" + drinkVal + "</h2>")
  $('.edit-drink').show()
  $('.cancel').hide()
  $('.submit-edit-drink').hide()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePw)
  $('#create-drink').on('submit', onCreateDrank)
  $('#sign-out').on('click', onSignOut)
  $('.content').on('click', '.drink', onShowDrank)
  $('.content').on('click', '.edit-drink', onOpenEditDrank)
  $('.content').on('submit', '.update-drink', onEditDrank)
  $('.content').on('click', '.delete-drink', onDeleteDrank)
  $('.content').on('click', '.cancel', onCancelEdit)
}

module.exports = {
  addHandlers
}
