let navIsOpen = false;

window.addEventListener('resize', function(event) {
    if (this.window.screen.width > 820) {
        openNav();
    } else if (this.window.screen.width < 820) {
        closeNav();
    }
}, true);

function openNav() {
    document.getElementById("nav").style.display = "block";
    document.getElementById("burger-img").src = "./images/close-icon.png";
    navIsOpen = true;
}

function closeNav() {
    if (window.screen.width < 820) {
        document.getElementById("nav").style.display = "none";
        document.getElementById("burger-img").src = "./images/burger-icon.png";
        navIsOpen = false;
    }
}

function burgerClick() {
    if (!navIsOpen) {
        openNav();
    } else {
        closeNav();
    }
}