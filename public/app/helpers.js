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

export const toggleCurrentPage = (currentPage) => {
  //https://codepen.io/Coding-in-Public/pen/MWroExJ
  //except also need to remove from rest when change page
  //get their hash not href (which is the whole link)
  document.querySelectorAll(".nav-menu .nav-link").forEach((navLink) => {
    //just get the anchor tags
    if (navLink.tagName === "A") {
      //use aria-current for accessibility reasons

      //remove aria-current from everywhere first
      navLink.removeAttribute("aria-current", "page");

      if (navLink.hash === currentPage && navLink.hash != "#login") {
        navLink.setAttribute("aria-current", "page");
      }
    }
  });
};
