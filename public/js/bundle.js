(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
exports.showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

},{}],2:[function(require,module,exports){
/* eslint-disable */
// import { showAlert } from "./alerts";
const alert = require("./alert");

const form = document.querySelector(".form-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const data = {
    email: username,
    password: password,
  };
  try {
    const loginAPI = await fetch("api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const api_data = await loginAPI.json();
    console.log(api_data);
    if (api_data.status === "success") {
      alert.showAlert("success", "you have logged ins");
      window.setTimeout(() => {
        location.assign("/homePage");
      }, 1000);
    }
    if (api_data.status === "fail") {
      alert.showAlert("error", "email or password is wronge");
    }
  } catch (err) {
    alert.showAlert("error", "email or password is wronge");
  }
});

},{"./alert":1}]},{},[2]);
