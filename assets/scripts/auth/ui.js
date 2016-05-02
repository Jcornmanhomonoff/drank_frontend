'use strict';

const app = require('../app-data.js');


let currentDrink = {
  drink_id:'',
  ingredient_id:'',
};

let currentUser = {
  token:'',
  id: undefined,
};

const signInSuccess = (data) => {
  currentUser.token = data.user.token;
  currentUser.id = data.user.id;
  console.log(app);
  $('#signInModal').modal('hide');
  $(".modal-backdrop").hide();
};

const changePasswordSuccess = (data) => {
  console.log(app);
  $('#changePasswordModal').modal('hide');
  $(".modal-backdrop").hide();
  console.log(data);
};

const newDrinkSuccess = (data) => {
  // console.log(data);
  // debugger;
  currentDrink.drink_id = data.drink.id;
  console.log(currentDrink);
  $('#createDrinkModal').modal('hide');
  $(".modal-backdrop").hide();
};

const newIngredientSuccess = (data) => {
  currentDrink.ingredient_id = data.id;
  console.log(currentDrink.ingredient_id);
  console.log(currentDrink);
  $('#createDrinkModal').modal('hide');
  $(".modal-backdrop").hide();
};

const signUpSuccess = (data) => {
  console.log(success);
  $('#signUpModal').modal('hide');
  $(".modal-backdrop").hide();
  console.log(data);
};

const getDrankSuccess = (data) => {
  let getDrankDisplayTemplate = require('./templates/drank-display.handlebars');
  $('.content').append(getDrankDisplayTemplate({
    data: data.drinks
  }));
  console.log(data);
};

const getIngredientsSuccess = (data) => {
  let getDrankDisplayTemplate = require('./templates/drank-display.handlebars');
  $('.content').append(getDrankDisplayTemplate({
    // ingredients: data.ingredients
  }));
  console.log(data);
};

const signOutSuccess = () => {
  app.user = null;
  console.log(app);
};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

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
  currentUser,
  currentDrink,
  getDrankSuccess,
  getIngredientsSuccess,
};
