export const showSignedIn = (userFullName) => {
  //little slow, is display none faster??
  document.getElementById("loginNav").hidden = true;
  document.getElementById("logoutNav").hidden = false;
  document.getElementById("userFullName").innerHTML = `Hello ${userFullName}`;

  //these aren't working w/ id on the a tag
  // document.getElementById("loginNav").style.display = none;
};

export const showSignedOut = () => {
  document.getElementById("loginNav").hidden = false;
  document.getElementById("logoutNav").hidden = true;
  document.getElementById("userFullName").innerHTML = "";
};

export const toggleMobileMenu = () => {
  $(".hamburger").toggleClass("active");
  $(".nav-menu").toggleClass("active");
};
