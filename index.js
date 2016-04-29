'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js');

// styles
require('./assets/styles/index.scss');

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

// attach getFormFields globally

require('expose?getFormFields!./lib/get-form-fields.js');

// SIGN UP AND IN, MODAL DROP DOWN

// OPENS SIGNIN FROM DROPDOWN
$('.open-sign-in').on('click', function(event){
  event.preventDefault();
  $('#signInModal').modal('show');
});

// OPENS SIGNUP FROM DROPDOWN
$('.open-sign-up').on('click', function(event){
  event.preventDefault();
  $('#signUpModal').modal('show');
});
