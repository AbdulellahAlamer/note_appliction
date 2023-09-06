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
