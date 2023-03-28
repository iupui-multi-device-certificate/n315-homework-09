import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";

//globals

let userExists = false;
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

  // $("#loginBtn").click(function (e) {
  //   console.log(e.currentTarget);
  //   // signIn();
  // });

  $("#signOutBtn").click(function (e) {
    signOut();
  });
}

//firebase stuff
function initFirebase() {
  //event listener on window
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log("auth change logged in");
      document.getElementById("userName").innerHTML = "Michael";
      userExists = true;
    } else {
      console.log("auth change logged out");
      // document.getElementById("userName").innerHTML = "";
      userExists = false;
    }
  });
}

function signIn() {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      // Signed in..
      console.log("signed in");
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

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch (error) {
    console.log("error: ", error);
  }
});
