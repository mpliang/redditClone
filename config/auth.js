'use strict';
let jwt = require('express-jwt');
let CONSTANTS = require('./constants.js');
let auth = jwt({secret: CONSTANTS.SECRET, userProperty: 'payload'});

module.exports = auth;
