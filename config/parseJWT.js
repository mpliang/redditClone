"use strict";
let atob = require('atob');

let parseJWT = (authHeader) =>{
  let jwt = authHeader.replace(/Bearer /, "");
  let userId = (JSON.parse(atob(jwt.split('.')[1])))._id;
  return userId;
}

module.exports = parseJWT
