'use strict'

const app = require('../app-data.js')
// const authApi = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields')
const drinkApi = require('./drinkApi')
const store = require('../store')

console.log(app)
console.log(drinkApi)

const success = (data) => {
  console.log(data)
}

const failure = (error) => {
  console.error(error)
}

const signUpSuccess = (data) => {
  console.log(success)
  $('#signUpModal').modal('hide')
  $(".modal-backdrop").hide()
  console.log(data)
}

const signInSuccess = (data) => {
  app.token = data.user.token
  app.id = data.user.id
  console.log(app)
  drinkApi.getDrank(getDrankSuccess, failure)
  $('#signInModal').modal('hide')
  $(".modal-backdrop").hide()
  $('.open-create-drink').show()
  $('.get-drank').show()
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
  $('.open-create-drink').hide()
  $('.get-drank').hide()
}

const newDrinkSuccess = (data) => {
  // console.log(data)
  // debugger
  app.drinkId = data.drink.id
  console.log(app)
  $('#createDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
  drinkApi.getDrank(getDrankSuccess, failure)
}

const newIngredientSuccess = (data) => {
  app.ingredientId = data.id
  console.log(app)
  $('#createDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
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


  // OPENS EDIT DRINK FORM BUTTON
  //storing id once edit button is clicked and showing modal
  $('.content').on('click', '.open-edit-drink', function (event){  //gets drink id
    event.preventDefault()
    localStorage.setItem('id', $(this).attr('data-drink-id')) //sets drink id
    $('#editDrinkModal').modal('show')
    console.log(event.target)
  })
  $('#edit-drink').on('submit', function (event){
    event.preventDefault()
    let data = $('#name').val()
    let id = localStorage.getItem('id') //gets current drink id
    drinkApi.editDrank(editDrankSuccess, failure, data, id)
    localStorage.clear()
  })
  $('.delete-drank').on('click', function (event){
    event.preventDefault()
    let id = localStorage.getItem('id') //gets current drink id
    drinkApi.deleteDrank(deleteDrankSuccess, failure, id)
  })

const getIngredientsSuccess = (data) => {
  let getDrankDisplayTemplate = require('./templates/drank-display.handlebars')
  $('.content').append(getDrankDisplayTemplate({
    ingredients: data.ingredients
  }))
}

// $('#exampleModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })



const editDrankSuccess = (data) => {
  app.drinkId = data.drink.id
  console.log(app)
  $('#editDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
  drinkApi.getDrank(getDrankSuccess, failure)
}

const editIngredientSuccess = (data) => {
  app.ingredientId = data.id
  console.log(app.ingredientId)
  console.log(app)
  $('#editDrinkModal').modal('hide')
  $(".modal-backdrop").hide()
  localStorage.clear()
}

// const deleteDrankSuccess = () => {
//   $('#editDrinkModal').modal('hide')
//   console.log(app)
// }



module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  changePasswordSuccess,
  newDrinkSuccess,
  newIngredientSuccess,
  app,
  getDrankSuccess,
  getIngredientsSuccess,
  editDrankSuccess,
  editIngredientSuccess,
  deleteDrankSuccess,
}
