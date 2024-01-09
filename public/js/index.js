import "@babel/polyfill";
import { login, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { displayMap } from "./mapbox";
import { bookTour } from "./stripe";
import {signup} from "./signUp";

const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const signUpForm = document.querySelector('.form-signup');
const logoutBtn = document.querySelector(".nav__el--logout");
const userPasswordForm = document.querySelector(".form-user-settings");
const userDataForm = document.querySelector(".form-user-data");
const bookBtn = document.getElementById("book-tour");
const header = document.getElementById("header");

if (mapBox) {
  header.focus();
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const passwordConfirm = document.getElementById(
      'signup-passwordConfirm',
    ).value;
    const password = document.getElementById('signup-password').value;

    signup(username, email, password, passwordConfirm);
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").innerHTML = "Updating...";
    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { currentPassword, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").innerHTML = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

if (bookBtn)
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
