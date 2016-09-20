let Navbar = (function () {
    let navbarEl = document.getElementsByClassName("navbar")[0];
    console.log("navbarEl", navbarEl);
    let navbarCollapseIconEl =
        document.getElementsByClassName("navbar__collapse-icon")[0];
    console.log("navbarCollapseIconEl", navbarCollapseIconEl);
    let navbarNavItems = document.getElementsByClassName("navbar__nav-items")[0];
    console.log("navbarNavItems", navbarNavItems);
    navbarCollapseIconEl.addEventListener("click", function (e) {
        console.log("icon clicked");
        if (navbarNavItems.style.display === "") {
            navbarNavItems.style.display = "block";
        } else {
            navbarNavItems.style.display = "";
        }
    });
}());

export default Navbar;