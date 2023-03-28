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

  //this works
  //https://stackoverflow.com/questions/35406896/onclick-function-used-on-dynamic-content-not-working-properly
  //see rrk response
  $(document).on("click", "#loginBtn", function () {
    signIn();
  });

  //this works because it's on every page and not dynamically loaded
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
      // document.getElementById("userName").innerHTML = "Michael";
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

//add to window namespace per https://stackoverflow.com/questions/57942951/function-not-defined-javascript-onclick b/c using module
window.signIn = signIn;

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch (error) {
    console.log("error: ", error);
  }
});
