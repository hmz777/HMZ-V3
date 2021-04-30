var pageHistory = [];
var currentPage = null;
var home = {
    options: {
        minDuration: 1000,
        maxDuration: 1200,
        minDelay: 0,
        maxDelay: 400,
        wait: 1000,
        offset: '-=1700'
    }
};
var skills = { delay: 500, duration: 1500, length: 0 };
var work = { delay: 500, duration: 1500, length: 0 };
var about = { delay: 500, duration: 1500, length: 0 };
var contact = { delay: 500, duration: 1500, length: 0 };
var modalOptions = { width: 45, height: 38, xPosition: -60, yPosition: -1 };
var background = { minRand: 500, maxRand: 3000 };
var Eye = { x: 35.757324, y: 17.101318 };
var animeInstances = {};

export function PageTransition(page = "home", alternative = false, direction = 'forwards') {

    let requestedPage = direction == 'forwards' ? page : pageHistory.pop();

    if (SamePage(requestedPage)) {
        return;
    }

    HideCurrentPage();

    switch (requestedPage) {
        case "home": {
            if (alternative) {
                HomeTrigger('reverse', alternative);
            }
            else {
                HomeTrigger();
            }
            break;
        }
        case "skills": {
            SkillsTrigger();
            break;
        }
        case "work": {
            WorkTrigger();
            break;
        }
        case "about": {
            AboutTrigger();
            break;
        }
        case "contact": {
            ContactTrigger();
            break;
        }
        default:
    }

    if (currentPage != null && direction == 'forwards') {
        pageHistory.push(currentPage);
    }

    currentPage = requestedPage;

    if (currentPage == 'home') {
        pageHistory = [];
    }
}

export function GoBack() {
    PageTransition('', true, 'backwards');
}

export function Dispose() {
    pageHistory = [];
    currentPage = null;
    animeInstances = {};
}

function SamePage(requestedPage) {
    return currentPage == requestedPage;
}

function HideCurrentPage() {

    switch (currentPage) {
        case "home": {
            HomeTrigger('normal', true);
            break;
        }
        case "skills": {
            SkillsTrigger('reverse');
            break;
        }
        case "work": {
            WorkTrigger('reverse');
            break;
        }
        case "about": {
            AboutTrigger('reverse');
            break;
        }
        case "contact": {
            ContactTrigger('reverse');
            break;
        }
        default:
    }
}

function WaitForAnimation(time) {
    DisableControls();
    setTimeout(EnableControls, time);
}

function HomeTrigger(aniDirection = 'normal', alternative = false) {
    if (!alternative) {
        WaitForAnimation(((home.maxDuration + home.maxDelay) * 3) + 400);

        let first = document.querySelectorAll(".hero-intro .hero-card");
        let second = document.querySelectorAll(".hero-intro .hero-card .text");
        let third = document.querySelectorAll(".hero-list .hero-card");

        let StartAnimationObject = {
            first: {
                targets: third,
                translateX: [-700, 0],
                translateY: [-1000, 0],
                opacity: [0, 1],
                scale: 0.6,
                duration: function () { return anime.random(home.options.minDuration, home.options.maxDuration); },
                delay: function () { return anime.random(home.options.minDelay, home.options.maxDelay); }
            },
            second: {
                targets: first,
                translateX: [-1000, 0],
                translateY: [-500, 0],
                opacity: [0, 1],
                scale: 0.6,
                duration: function () { return anime.random(home.options.minDuration, home.options.maxDuration); },
                delay: function () { return anime.random(home.options.minDelay, home.options.maxDelay); }
            },
            third: {
                targets: first,
                borderRadius: 1 + "em",
                scale: 1,
                width: function (el, i, l) { if (i == 0) return 36 + "em"; if (i == 1) return 45 + "em"; if (i == 2) return 52 + "em"; },
                height: 8 + 'em',
                duration: function () { return anime.random(home.options.minDuration, home.options.maxDuration); },
                delay: function () { return anime.random(home.options.minDelay, home.options.maxDelay); }
            },
            forth: {
                targets: second,
                easing: 'linear',
                opacity: 1,
                duration: function () { return anime.random(200, 400); },
                delay: function (e, i, j) { return i * 100; }
            }
        };

        animeInstances.Home = anime.timeline({ easing: 'easeOutElastic(1, .5)', autoplay: false });

        animeInstances.Home
            .add(StartAnimationObject.first)
            .add(StartAnimationObject.second, home.options.offset)
            .add(StartAnimationObject.third)
            .add(StartAnimationObject.forth);

        if (animeInstances.Home.reversed) {
            animeInstances.Home.reverse();
        }

        animeInstances.Home.play();
    }
    else {
        WaitForAnimation(home.options.maxDuration);

        if (animeInstances.HomeReverse == null) {
            let target = document.querySelectorAll(".hero-intro .hero-card");

            animeInstances.HomeReverse = anime({
                targets: target,
                translateX: [0, -1000],
                easing: 'easeInElastic(1, .5)',
                duration: function () { return anime.random(home.options.minDuration, home.options.maxDuration); },
                delay: function () { return anime.random(home.options.minDelay, home.options.maxDelay); },
                autoplay: false
            });
        }

        if (aniDirection == 'normal') {
            if (animeInstances.HomeReverse.reversed) {
                animeInstances.HomeReverse.reverse();
            }
            animeInstances.HomeReverse.play();
        }
        else {
            if (!animeInstances.HomeReverse.reversed) {
                animeInstances.HomeReverse.reverse();
            }
            animeInstances.HomeReverse.play();
        }
    }
}

function SkillsTrigger(aniDirection = 'normal') {

    if (animeInstances.Skills == null) {
        let target = document.getElementById("skills");

        let StartAnimationObject = {
            first: {
                targets: target,
                translateX: modalOptions.xPosition + 'em',
                translateY: modalOptions.yPosition + 'em',
                borderRadius: 1 + "em",
                width: modalOptions.width + "em",
                height: modalOptions.height + "em",
                scale: 1,
                duration: skills.duration,
                delay: skills.delay,
                autoplay: false,
                easing: 'easeInOutElastic(1, .5)'
            }
        };

        animeInstances.Skills = anime(StartAnimationObject.first);
        skills.length = Object.keys(StartAnimationObject).length;
    }

    if (aniDirection == 'normal') {
        if (animeInstances.Skills.reversed) {
            animeInstances.Skills.reverse();
        }
        animeInstances.Skills.play();
    }
    else {
        if (!animeInstances.Skills.reversed) {
            animeInstances.Skills.reverse();
        }
        animeInstances.Skills.play();
    }

    ToggleRippleEffectForActiveElement("skills", aniDirection);
}

function WorkTrigger(aniDirection = 'normal') {

    if (animeInstances.Work == null) {
        let target = document.getElementById("work");

        let StartAnimationObject = {
            first: {
                targets: target,
                translateX: modalOptions.xPosition + 'em',
                translateY: (modalOptions.yPosition - 5) + 'em',
                borderRadius: 1 + "em",
                width: modalOptions.width + "em",
                height: modalOptions.height + "em",
                scale: 1,
                duration: work.duration,
                delay: work.delay,
                autoplay: false,
                easing: 'easeInOutElastic(1, .5)'
            }
        };

        animeInstances.Work = anime(StartAnimationObject.first);

        work.length = Object.keys(StartAnimationObject).length;
    }

    if (aniDirection == 'normal') {
        if (animeInstances.Work.reversed) {
            animeInstances.Work.reverse();
        }
        animeInstances.Work.play();
    }
    else {
        if (!animeInstances.Work.reversed) {
            animeInstances.Work.reverse();
        }
        animeInstances.Work.play();
    }

    //WaitForAnimation((work.duration * work.length) + work.delay);
    ToggleRippleEffectForActiveElement("work", aniDirection);
}

function AboutTrigger(aniDirection = 'normal') {

    if (animeInstances.About == null) {
        let target = document.getElementById("about");

        let StartAnimationObject = {
            first: {
                targets: target,
                translateX: modalOptions.xPosition + 'em',
                translateY: (modalOptions.yPosition - 10) + 'em',
                borderRadius: 1 + "em",
                width: modalOptions.width + "em",
                height: modalOptions.height + "em",
                scale: 1,
                duration: about.duration,
                delay: about.delay,
                autoplay: false,
                easing: 'easeInOutElastic(1, .5)'
            }
        };

        animeInstances.About = anime(StartAnimationObject.first);

        about.length = Object.keys(StartAnimationObject).length;
    }

    if (aniDirection == 'normal') {
        if (animeInstances.About.reversed) {
            animeInstances.About.reverse();
        }
        animeInstances.About.play();
    }
    else {
        if (!animeInstances.About.reversed) {
            animeInstances.About.reverse();
        }
        animeInstances.About.play();
    }

    //WaitForAnimation((about.duration * about.length) + about.delay);
    ToggleRippleEffectForActiveElement("about", aniDirection);
}

function ContactTrigger(aniDirection = 'normal') {
    if (animeInstances.Contact == null) {
        let target = document.getElementById("contact");

        let StartAnimationObject = {
            first: {
                targets: target,
                translateX: modalOptions.xPosition + 'em',
                translateY: (modalOptions.yPosition - 15) + 'em',
                borderRadius: 1 + "em",
                width: modalOptions.width + "em",
                height: modalOptions.height + "em",
                scale: 1,
                duration: contact.duration,
                delay: contact.delay,
                autoplay: false,
                easing: 'easeInOutElastic(1, .5)'
            }
        };

        animeInstances.Contact = anime(StartAnimationObject.first);

        contact.length = Object.keys(StartAnimationObject).length;
    }

    if (aniDirection == 'normal') {
        if (animeInstances.Contact.reversed) {
            animeInstances.Contact.reverse();
        }
        animeInstances.Contact.play();
    }
    else {
        if (!animeInstances.Contact.reversed) {
            animeInstances.Contact.reverse();
        }
        animeInstances.Contact.play();
    }

    //WaitForAnimation((contact.duration * contact.length) + contact.delay);
    ToggleRippleEffectForActiveElement("contact", aniDirection);
}

function DisableControls() {
    let btns = document.querySelectorAll("button");

    btns.forEach(function (btn, index) {
        btn.setAttribute("disabled", true);
    });
}

function EnableControls() {
    let btns = document.querySelectorAll("button");

    btns.forEach(function (btn, index) {
        btn.removeAttribute("disabled");
    });
}

function ToggleRippleEffectForActiveElement(id, direction) {
    let listCards = document.querySelectorAll(".hero-nav-item");

    if (direction == "normal") {
        listCards.forEach(function (ele, index) {
            if (ele.id == id) {
                ele.classList.remove("ripple-animation");
            }
            else {
                ele.classList.add("ripple-animation");
            }
        });
    }
    else {
        listCards.forEach(function (ele, index) {
            ele.classList.add("ripple-animation");
        });
    }
}

function RandomColor() {
    return "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
}

export function BackgroundAnimation() {

    //let path1 = anime.path('#path1');
    //let path2 = anime.path('#path2');

    //let path2 = document.getElementById("path2");

    //let duration = 5000;

    //anime({
    //    targets: path2,
    //    loop: true,
    //    easing: 'easeInOutExpo',
    //    direction: 'alternate',
    //    duration: duration,
    //    autoplay: false,
    //});
}

export function InitEyeMovement() {

    if (animeInstances.Eye == null) {
        let target = document.getElementById('eye');

        animeInstances.Eye = anime.timeline({ targets: target, easing: 'easeInOutCubic', autoplay: false });
        let duration = 3000;

        animeInstances.Eye.add({
            translateX: [
                { value: '-50em', duration: duration },
                { value: '0', duration: duration }
            ],
            translateY: [
                { value: '2em', duration: duration },
                { value: '0', duration: duration }
            ],
            zIndex: [
                { value: 1, round: true, duration: duration - 1000 },
                { value: 2, round: true, duration: duration }
            ]
        });
    }

    animeInstances.Eye.play();

    //AnimateEye();
    EyeTracker();
}

function EyeTracker() {
    document.addEventListener('mousemove', function (e) {
        let InnerEye = document.getElementById('InnerEye');
        let Cords = InnerEye.getBoundingClientRect();
        let workingCords = { x: e.clientX, y: e.clientY };
        let test = { x: -20, y: -12 };

        test.x += workingCords.x / 60;
        test.y += workingCords.y / 52;

        InnerEye.style.transform = 'translate(' + (Eye.x + test.x) + 'px,' + (Eye.y + test.y) + 'px)';
    });
}