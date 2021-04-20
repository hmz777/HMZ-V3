var currentPage = "";
var home = {
    first: document.querySelectorAll(".hero-intro .hero-card"),
    second: document.querySelectorAll(".hero-intro .hero-card .text"),
    third: document.querySelectorAll(".hero-list .hero-card"),
    options: {
        minDuration: 1000,
        maxDuration: 1200,
        minDelay: 0,
        maxDelay: 400,
        wait: 1500,
        offset: '-=1200'
    }
};
var skills = { target: document.getElementById("skills"), delay: 500, duration: 1500, length: 0 };
var work = { target: document.getElementById("work"), delay: 500, duration: 1500, length: 0 };
var about = { target: document.getElementById("about"), delay: 500, duration: 1500, length: 0 };
var contact = { target: document.getElementById("contact"), delay: 500, duration: 1500, length: 0 };
var animeInstances = {};

export function PageTransition(page, alternative = false) {

    if (SamePage(page)) {
        return;
    }

    HideCurrentPage();

    switch (page) {
        case "home": {
            if (alternative) {
                HomeTrigger('reverse');
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

    currentPage = page;
}

function SamePage(requestedPage) {
    return currentPage == requestedPage;
}

function HideCurrentPage() {

    switch (currentPage) {
        case "home": {
            HomeTrigger();
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

function HomeTrigger(aniDirection = 'normal') {

    if (animeInstances.Home == null) {
        WaitForAnimation(((1800 + 400) * 3) + 450 + 500);

        animeInstances.Home = anime.timeline({ easing: 'easeOutElastic(1, .5)' });

        let StartAnimationObject = {
            first: {
                targets: home.third,
                translateX: [-700, 0],
                translateY: [-1000, 0],
                opacity: [0, 1],
                scale: 0.6,
                duration: function () { return anime.random(1200, 1800); },
                delay: function () { return anime.random(0, 400); }
            },
            second: {
                targets: home.first,
                translateX: [-1000, 0],
                translateY: [-500, 0],
                opacity: [0, 1],
                borderRadius: 50 + "%",
                scale: 0.6,
                duration: function () { return anime.random(1200, 1800); },
                delay: function () { return anime.random(0, 400); }
            },
            third: {
                targets: home.first,
                borderRadius: 1 + "em",
                scale: 1,
                width: function (el, i, l) { if (i == 0) return 36 + "em"; if (i == 1) return 45 + "em"; if (i == 2) return 52 + "em"; },
                height: 8 + 'em',//15
                duration: function () { return anime.random(1200, 1800); },
                delay: function () { return anime.random(0, 400); }
            },
            forth: {
                targets: home.second,
                easing: 'linear',
                opacity: 1,
                duration: function () { return anime.random(300, 450); },
                delay: function (e, i, j) { return (i) * 20; }
            }
        };

        animeInstances.Home
            .add(StartAnimationObject.first)
            .add(StartAnimationObject.second, home.options.offset)
            .add(StartAnimationObject.third)
            .add(StartAnimationObject.forth);
    }
    else {
        WaitForAnimation(home.options.wait + 500);

        if (animeInstances.HomeReverse == null) {
            animeInstances.HomeReverse = anime({
                targets: home.first,
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

        let StartAnimationObject = {
            first: {
                targets: skills.target,
                translateX: -60 + 'em',
                translateY: 0 + 'em',
                borderRadius: 1 + "em",
                width: 45 + "em",
                height: 35 + "em",
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

    //WaitForAnimation((skills.duration * skills.length) + skills.delay);
    ToggleRippleEffectForActiveElement("skills", aniDirection);
}

function WorkTrigger(aniDirection = 'normal') {

    if (animeInstances.Work == null) {

        let StartAnimationObject = {
            first: {
                targets: work.target,
                translateX: -60 + 'em',
                translateY: -5 + 'em',
                borderRadius: 1 + "em",
                width: 45 + "em",
                height: 35 + "em",
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

        let StartAnimationObject = {
            first: {
                targets: about.target,
                translateX: -60 + 'em',
                translateY: -10 + 'em',
                borderRadius: 1 + "em",
                width: 45 + "em",
                height: 35 + "em",
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

        let StartAnimationObject = {
            first: {
                targets: contact.target,
                translateX: -60 + 'em',
                translateY: -15 + 'em',
                borderRadius: 1 + "em",
                width: 45 + "em",
                height: 35 + "em",
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