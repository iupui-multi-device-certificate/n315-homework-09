import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import {
  initFirebaseAuth,
  signIn,
  signOut,
  createAccount,
  updateUserProfile,
} from "./firebase/firebaseUser.js";

import { toggleMobileMenu, toggleCurrentPage } from "./helpers.js";

//globals
const titleBase = "The Jungle Cook";

/* 
**************************************
  router stuff
**************************************
*/
const routes = {
  home: homeView(),
  login: loginView(),
};

const changeRoute = () => {
  let hashTag = window.location.hash;

  //? maybe it would be better to map the hash in the routes as part of the route object rather than mess with it here
  let pageID = hashTag.replace("#", "");

  //set to home if empty string
  if (pageID == "") {
    pageID = "home";
  }

  //so can set the current page underline when page loads
  if (hashTag === "") {
    hashTag = "#home";
  }

  document.getElementById("app").innerHTML = routes[pageID];

  document.title = `${titleBase} | ${pageID.toUpperCase()}`;
  console.log("app.js > changeRoute > ", hashTag);
  toggleCurrentPage(hashTag);
};

/* 
**************************************
  forms stuff
  NOTE: not moving to separate module to avoid issues w/ not recognizing firebase functions
  in future, may be better to use an MVC component hybrid:
  components
    auth
      model
      view
      controller 
**************************************
*/
const handleLoginSubmit = (e) => {
  e.preventDefault();

  const currentForm = e.currentTarget.form;
  const { loginEmail: email, loginPassword: password } =
    getFormData(currentForm);

  signIn(email, password);
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

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebaseAuth();
    initListeners();
  } catch (error) {
    console.log("error: ", error);
  }
});
