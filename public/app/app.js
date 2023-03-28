//globals

let userExists = false;

const toggleMobileMenu = () => {
  $(".hamburger").toggleClass("active");
  $(".nav-menu").toggleClass("active");
};

function initListeners() {
  $(".hamburger").click(function (e) {
    toggleMobileMenu();
  });

  //close when click a nav link
  $(".nav-link").click(function (e) {
    toggleMobileMenu();
  });

  $("#signInBtn").click(function (e) {
    signIn();
  });

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
      document.getElementById("userName").innerHTML = "";
      // for testing hide the create recipe link
      document.getElementById("createRecipe").style.display = "none";

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
