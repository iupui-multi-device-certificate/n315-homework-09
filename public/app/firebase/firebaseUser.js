import { showSignedIn, showSignedOut } from "../helpers.js";

//useful example of onAuthStateChanged:
//https://fireship.io/lessons/firebase-quickstart/
//because the is a subscriber but async, need to do stuff in this function
export const initFirebaseAuth = () => {
  //can this be returned???
  let status = { loggedIn: false, message: "", displayName: "" };

  //event listener on window
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("firebaseUser > line 9 > auth change logged in");

      //set this via object, use a ternary on the displayName
      status = {
        loggedIn: true,
        message: "Login Successful",
        displayName: user.displayName ? user.displayName : "",
      };

      console.log("firebaseUser > ln 25> ", status);
      showSignedIn(status.displayName);

      // userName.innerHTML = `Hello ${status.displayName}`;
    } else {
      console.log("firebaseUser > auth change logged out");

      status = {
        loggedIn: false,
        message: "Logout successful",
      };
      console.log("firebaseUser > ", status);
      showSignedOut();
    }
  });
};

export const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("firebaseUser > signIn: logged in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("firebaseUser > signIn: Error signing in: " + errorMessage);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("firebaseUser > signOut: signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("firebaseUser > signOut: error signing out");
    });
};

export const createAccount = (email, password, displayName = "") => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("firebaseUser > createAccount: account created & logged in");
      updateUserProfile(displayName);

      showSignedIn(displayName);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(
        "firebaseUser > createAccount: logged in error ",
        errorMessage
      );
    });
};

export const updateUserProfile = (displayName) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName,
    })
    .then(() => {
      // Update successful
      console.log("firebaseUser > updateUserProfile: display name updated");
    })
    .catch((error) => {
      // An error occurred
      // ...
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(
        "firebaseUser > updateUserProfile: error updating user profile",
        errorMessage
      );
    });
};
