var body = document.querySelector('body');
var navbar = document.getElementById('navbar');
var navBtn = document.getElementById("navBtn");
var sideNavRef;
var lastScrollPos;

export function PassSideNavRef(SideNavRef) {
    sideNavRef = SideNavRef;
}

export function InitNavbarEventListeners() {

    if (!IsNavRefPassed()) {
        return false;
    }

    body.addEventListener("click", function (e) {
        let ele = e.target;

        if (ele.closest("#navbar") == null && ele.closest("#sidenav") == null) {
            return sideNavRef.invokeMethodAsync("CloseMenu");
        }
    });

    InitScrollListener();
    InitMouseTracker();
    RetractNavbar();
}

export function ToggleBackBlur() {
    let main = document.querySelector('main');

    if (main.classList.contains('blur')) {
        main.classList.remove('blur');
    }
    else {
        main.classList.add('blur');
    }
}

function IsNavRefPassed() {
    return sideNavRef != null;
}

function InitScrollListener() {
    document.addEventListener("scroll", function (e) {
        if (window.scrollY > lastScrollPos) {
            RetractNavbar();
        }

        lastScrollPos = window.scrollY;
    });
}

function InitMouseTracker() {
    document.addEventListener("mousemove", function (e) {
        if (e.clientX <= 70) {
            AdvanceNavbar();
        }
        else {
            RetractNavbar();
        }
    });
}

function AdvanceNavbar() {
    if (!(sideNavRef.invokeMethod("IsMenuOpen"))) {
        navbar.classList.remove("is-open");
        navBtn.removeAttribute("disabled");
    }
}

function RetractNavbar() {
    if (!(sideNavRef.invokeMethod("IsMenuOpen"))) {
        navbar.classList.add("is-open");
        navBtn.setAttribute("disabled", true);
    }
}