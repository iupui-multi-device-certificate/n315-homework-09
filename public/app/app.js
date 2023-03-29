//TODO: user feedback - IP
//TODO: show/hide login & logout buttons as needed
//TODO: pretty up user feedback w/ sweet alerts 2 per wk01 assessment https://sweetalert2.github.io/
//TODO: rename functions to match front-end buttons rather than firebase since those are wrappers anyways
//TODO: organize code more -- maybe authForm controller
//TODO: move firebase to its own module

import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";

//globals

//?why does it say userExists not read but userFullName is read?
let userExists = false;
let userFullName = "";
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

  //add prevent default on all forms so data does not show as query parameters in url
  let forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    item.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  });

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

//firebase stuff
function initFirebase() {
  //event listener on window
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log("auth change logged in");
      if (user.displayName) {
        //TODO: show name in UI
        userFullName = user.displayName;
        console.log(`auth change: ${userFullName} is logged in`);
      }
      userExists = true;
    } else {
      console.log("auth change logged out");

      userExists = false;
    }
  });
}

function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("signIn: logged in");
      //maybe we should returning a success variable to use elsewhere??
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("Error signing in: " + errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("error signing out");
    });
}

function createAccount(email, password, displayName = "") {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("account created & logged in");
      updateUserProfile(displayName);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("logged in error ", errorMessage);
    });
}

function updateUserProfile(displayName) {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName,
    })
    .then(() => {
      // Update successful
      // ...
      userFullName = displayName;
      //TODO: show name in UI
      console.log("display name updated", userFullName);
    })
    .catch((error) => {
      // An error occurred
      // ...
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("error updating user profile", errorMessage);
    });
}

//TODO: remove this
//add to window namespace per https://stackoverflow.com/questions/57942951/function-not-defined-javascript-onclick b/c using module
//window.signIn = signIn;

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch (error) {
    console.log("error: ", error);
  }
});
