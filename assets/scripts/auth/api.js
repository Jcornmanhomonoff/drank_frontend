'use strict';

//written function to test if all of your code works
// const signUp = (success, failure, data) => {
//   Math.random() > 0.5 ? success('in signUp') : failure(data);
// };

const app = require('../app-data.js');
const ui = require('./ui.js');


const signUp = (success, failure, data) => {
  // debugger;
  $.ajax({
    method:'POST',
    url: app.api  + '/sign-up',
    data,
  })
  .done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  // debugger;
  $.ajax({
    method:'DELETE',
    url: app.api + '/sign-out/' + ui.currentUser.id,
    headers: {
      Authorization: 'Token token=' + ui.currentUser.token,
    },
  })
  .done(success)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  // debugger;
  $.ajax({
    method:'POST',
    url: app.api + '/sign-in',
    data: data,
  })
  .done(success)
  .fail(failure);
};

const changePassword = (success, failure, data) => {
  $.ajax({
    method: 'PATCH',
    url: app.api + '/change-password/' + ui.currentUser.id,
    data,
    headers: {
      Authorization: 'Token token='+ ui.currentUser.token,
    },
  })
  .done(success)
  .fail(failure);
  };

  const newDrink = (success, failure, data) => {
    // debugger;
    console.log(data);
    console.log(ui.currentUser.token);
    $.ajax({
      method:'POST',
      url: app.api  + '/drinks',
      headers: {
        Authorization: 'Token token='+ ui.currentUser.token,
      },
      data: {
        "drink": {
          "name": data.drinks.name
        }
      },
    })
    .done(success)
    .fail(failure);
  };

  const newIngredient = (success, failure, data) => {
    // debugger;
    console.log(data);
    console.log(ui.currentUser.token);
    $.ajax({
      method:'POST',
      url: app.api  + '/ingredients',
      headers: {
        Authorization: 'Token token='+ ui.currentUser.token,
      },
      data: {
        "ingredient": {
          "alcohol": data.drinks.alcohol,
          "mixer": data.drinks.mixer,
          "suggestion": data.drinks.suggestion
        }
      },
    })
    .done(success)
    .fail(failure);
  };

  const getDrank = (success, failure) => {
    $.ajax({
      method:'GET',
      url: app.api  + '/drinks',
      headers: {
        Authorization: 'Token token='+ ui.currentUser.token,
      },
    })
    .done(success)
    .fail(failure);
  };

  const getIngredients = (success, failure) => {
    $.ajax({
      method:'GET',
      url: app.api  + '/ingredients',
      headers: {
        Authorization: 'Token token='+ ui.currentUser.token,
      },
    })
    .done(success)
    .fail(failure);
  };

  const editDrank = (success, failure) => {
    // debugger;
    $.ajax({
      method:'PATCH',
      url: app.api + '/drinks/' + ui.currentUser.id,
      headers: {
        Authorization: 'Token token='+ ui.currentUser.token,
      },
      data: {
        "drink": {
          "name": data.drinks.name
        }
      },
      })
      .done(success)
      .fail(failure);
  };

  // const newIngredient = (success, failure, data) => {
  //   // debugger;
  //   console.log(data);
  //   console.log(ui.currentUser.token);
  //   $.ajax({
  //     method:'POST',
  //     url: app.api  + '/drink_ingredients',
  //     headers: {
  //       Authorization: 'Token token='+ ui.currentUser.token,
  //     },
  //     data: {
  //       "drink_ingredient": {
  //         "drink_id": data.drinks.drink_id,
  //         "ingredient_id": data.drinks.ingredient_id,
  //       }
  //     },
  //   })
  //   .done(success)
  //   .fail(failure);
  // };

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  newDrink,
  newIngredient,
  getDrank,
  getIngredients,
  editDrank,
  app,
};
