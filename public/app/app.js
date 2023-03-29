//TODO: user name in UI?
//TODO: show/hide login & logout buttons as needed
//TODO: pretty up user feedback w/ sweet alerts 2 per wk01 assessment https://sweetalert2.github.io/
//TODO: organize code more -- maybe authForm controller

import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import {
  initFirebaseAuth,
  signIn,
  signOut,
  createAccount,
  updateUserProfile,
} from "./firebase/firebaseUser.js";

//globals
const titleBase = "The Jungle Cook";

//refactor to own file
//router is a type of controller

const routes = {
  home: homeView(),
  login: loginView(),
};

const changeRoute = () => {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  //set to home if empty string
  if (pageID == "") {
    pageID = "home";
  }
  document.getElementById("app").innerHTML = routes[pageID];

  document.title = `${titleBase} | ${pageID.toUpperCase()}`;
};

const toggleMobileMenu = () => {
  $(".hamburger").toggleClass("active");
  $(".nav-menu").toggleClass("active");
};

const prevDefaultAllForms = () => {
  //add prevent default on all forms so data does not show as query parameters in url
  let forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    item.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  });
};

function initListeners() {
  $(window).on("hashchange", changeRoute);
  changeRoute();

  $(".hamburger").click(function (e) {
    toggleMobileMenu();
  });

  //close when click a nav link
  $(".nav-link").click(function (e) {
    toggleMobileMenu();
  });

  prevDefaultAllForms();

  //this works
  //https://stackoverflow.com/questions/35406896/onclick-function-used-on-dynamic-content-not-working-properly
  //see rrk response
  $(document).on("click", "#loginBtn", handleLoginSubmit);

  $(document).on("click", "#signupBtn", handleSignUpSubmit);

  //this works because it's on every page and not dynamically loaded
  $("#signOutBtn").click(function (e) {
    signOut();
  });
}

const handleLoginSubmit = (e) => {
  e.preventDefault();

  const currentForm = e.currentTarget.form;
  const { loginEmail: email, loginPassword: password } =
    getFormData(currentForm);

  signIn(email, password);
  //TODO: decide if the form only be cleared if successful?
  //TODO: move this to onAuthStateChanged?
  clearFormData(currentForm);
};

const handleSignUpSubmit = (e) => {
  e.preventDefault();
  const currentForm = e.currentTarget.form;

  const {
    firstName,
    lastName,
    signupEmail: email,
    signupPassword: password,
  } = getFormData(currentForm);

  const displayName = `${firstName} ${lastName}`;
  createAccount(email, password, displayName);
  //TODO: decide if the form only be cleared if successful?
  //TODO: move this to onAuthStateChanged?
  clearFormData(currentForm);
};

const getFormData = (form) => {
  const formData = new FormData(form);

  const formDataObject = Object.fromEntries(formData);

  return formDataObject;
};

const clearFormData = (form) => {
  form.reset();
};

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebaseAuth();
    initListeners();
  } catch (error) {
    console.log("error: ", error);
  }
});
