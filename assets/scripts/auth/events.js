'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const app = require('../app-data')
const authApi = require('./api')
const ui = require('./ui')
const showDrankTemplate = require('./templates/drank-content.handlebars')
const drinkApi = require('./drinkApi')
const store = require('../store')

const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this)
    console.log("sign-up success")
    event.preventDefault()
    authApi.signUp(ui.success, ui.failure, data)
  })
  $('#sign-in').on('submit', function (event) {
    let data = getFormFields(this)
    console.log("sign-in success")
    event.preventDefault()
    authApi.signIn(ui.signInSuccess, ui.failure, data)
  })
  $('#sign-out').on('click', function (event) {
    console.log("sign-out success")
    event.preventDefault()
    authApi.signOut(ui.signOutSuccess, ui.failure)
  })
  $('#change-password').on('submit', function (event){
    let data = getFormFields(this)
    event.preventDefault()
    authApi.changePassword(ui.changePasswordSuccess, ui.failure, data)
  })
  $('#create-drink').on('submit', function (event){
    event.preventDefault()
    let data = getFormFields(this)
    console.log(data)
    data.drinks.user_id = app.id
    authApi.newDrink(ui.newDrinkSuccess, ui.failure, data)
    authApi.newIngredient(ui.newIngredientSuccess, ui.failure, data)
  })
  $('#get-drank').on('click', function (event){
    event.preventDefault()
    $('.content').html('')
    authDrink.getDrank(ui.getDrankSuccess, ui.failure)
    authApi.getIngredients(ui.getIngredientsSuccess, ui.failure)
  })
  $('.content').on('click', '.drink', onShowDrank)
  $('.content').on('click', '.edit-drink', onOpenEditDrank)
  $('.content').on('submit', '.update-drink', onEditDrank)
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

let drinkId = ''

const onOpenEditDrank = function (event) {
  event.preventDefault()
  drinkId = $(this).data('id')
  const drinkVal = $(this).siblings().html()
  $(this).siblings().replaceWith("<form class='update-drink'><input value='" + drinkVal + "'></input><br><button class='drink-btn' type='submit'>Submit</button></form>")
  $('.edit-drink').hide()
  return drinkId
}

const onEditDrank = function (event) {
  event.preventDefault()
  const drinkName = $(this).siblings().val()
  drinkApi.editDrank(ui.editDrankSuccess, ui.failure, drinkName, drinkId)
}

module.exports = {
  addHandlers
}
