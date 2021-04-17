var currentPage = "";
var homeTargets = {
    first: document.querySelectorAll(".hero-intro .hero-card"),
    second: document.querySelectorAll(".hero-intro .hero-card .text"),
    third: document.querySelectorAll(".hero-list .hero-card")
};
var skills = { target: document.getElementById("skills"), delay: 1800, duration: 1500, length: 0 };
var work = { target: document.getElementById("work"), delay: 1800, duration: 1500, length: 0 };
var aboutTarget = document.getElementById("about");
var contactTarget = document.getElementById("contact");
var animeInstances = {};

export function PageTransition(page) {

    if (SamePage(page)) {
        console.log("Same page requested");
        return;
    }

    HideCurrentPage();

    switch (page) {
        case "home": {
            HomeTrigger();
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

    console.log("Current page changed:" + currentPage);
}

function SamePage(requestedPage) {
    return currentPage == requestedPage;
}

function HideCurrentPage() {

    switch (currentPage) {
        case "home": {
            HideTrigger(homeTargets.first);
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
            HideTrigger(aboutTarget);
            break;
        }
        case "contact": {
            HideTrigger(contactTarget);
            break;
        }
        default:
    }
}

function WaitForAnimation(time) {
    DisableControls();
    setTimeout(EnableControls, time);
}

function SkillsTrigger(aniDirection = 'normal') {

    if (animeInstances.Skills == null) {
        animeInstances.Skills = anime.timeline({ easing: 'easeInOutElastic(1, .5)', direction: 'normal', autoplay: false });

        let StartAnimationObject = {
            first: {
                targets: skills.target,
                translateX: -60 + 'em',
                translateY: 0 + 'em',
                borderRadius: 50 + "%",
                width: 2 + "em",
                height: 2 + "em",
                duration: skills.duration,
                delay: skills.delay
            },
            second: {
                targets: skills.target,
                borderRadius: 1 + "em",
                scale: 1,
                width: 45 + "em",
                height: 35 + "em",
                duration: skills.duration
            }
        };

        skills.length = Object.keys(StartAnimationObject).length;

        animeInstances.Skills
            .add(StartAnimationObject.first)
            .add(StartAnimationObject.second);
    }

    if (aniDirection == 'normal') {
        animeInstances.Skills.play();
    }
    else {
        animeInstances.Skills.reverse();
        animeInstances.Skills.play();
    }

    WaitForAnimation((skills.duration * skills.length) + skills.delay);
    ToggleRippleEffectForActiveElement("skills", aniDirection);
}

function WorkTrigger(aniDirection = 'normal') {

    if (animeInstances.Work == null) {
        animeInstances.Work = anime.timeline({ easing: 'easeInOutElastic(1, .5)', direction: 'normal', autoplay: false });

        let StartAnimationObject = {
            first: {
                targets: work.target,
                translateX: -60 + 'em',
                translateY: -5 + 'em',
                borderRadius: 50 + "%",
                width: 2 + "em",
                height: 2 + "em",
                duration: work.duration,
                delay: work.delay
            },
            second: {
                targets: work.target,
                borderRadius: 1 + "em",
                scale: 1,
                width: 45 + "em",
                height: 35 + "em",
                duration: work.duration
            }
        };

        work.length = Object.keys(StartAnimationObject).length;

        animeInstances.Work
            .add(StartAnimationObject.first)
            .add(StartAnimationObject.second);
    }

    if (aniDirection == 'normal') {
        animeInstances.Work.play();
    }
    else {
        animeInstances.Work.reverse();
        animeInstances.Work.play();
    }

    WaitForAnimation((work.duration * work.length) + work.delay);
    ToggleRippleEffectForActiveElement("work", aniDirection);
}

function AboutTrigger() {
    let animeTL = anime.timeline({ easing: 'easeOutElastic(1, .5)' });

    let StartAnimationObject = {
        first: {
            targets: aboutTarget,
            translateX: [0, -64 + 'em'],
            translateY: [0, -12 + 'em'],
            duration: function () { return anime.random(1200, 1800); },
            delay: function (el, i, l) { return anime.random(0, 400); }
        },
        second: {
            targets: aboutTarget,
            borderRadius: function () { return 1 + "em"; },
            scale: function (el, i, l) { return 1; },
            width: function () { return 55 + "em"; },
            height: function () { return 35 + "em"; },
        }
    };

    animeTL
        .add(StartAnimationObject.first)
        .add(StartAnimationObject.second);
}

function ContactTrigger() {
    let animeTL = anime.timeline({ easing: 'easeOutElastic(1, .5)' });

    let StartAnimationObject = {
        first: {
            targets: contactTarget,
            translateX: [0, -64 + 'em'],
            translateY: [0, -14 + 'em'],
            duration: function () { return anime.random(1200, 1800); },
            delay: function (el, i, l) { return anime.random(0, 400); }
        },
        second: {
            targets: contactTarget,
            borderRadius: function () { return 1 + "em"; },
            scale: function (el, i, l) { return 1; },
            width: function () { return 55 + "em"; },
            height: function () { return 35 + "em"; },
        }
    };

    animeTL
        .add(StartAnimationObject.first)
        .add(StartAnimationObject.second);
}

function HomeTrigger() {

    let animeTL = anime.timeline({ easing: 'easeOutElastic(1, .5)' });

    let StartAnimationObject = {
        first: {
            targets: homeTargets.third,
            translateX: [-700, 0],
            translateY: [-1000, 0],
            opacity: [0, 1],
            scale: 0.6,
            duration: function () { return anime.random(1200, 1800); },
            delay: function () { return anime.random(0, 400); }
        },
        second: {
            targets: homeTargets.first,
            translateX: [-1000, 0],
            translateY: [-500, 0],
            opacity: [0, 1],
            borderRadius: 50 + "%",
            scale: 0.6,
            duration: function () { return anime.random(1200, 1800); },
            delay: function () { return anime.random(0, 400); }
        },
        third: {
            targets: homeTargets.first,
            borderRadius: 1 + "em",
            scale: 1,
            width: function (el, i, l) { if (i == 0) return 36 + "em"; if (i == 1) return 45 + "em"; if (i == 2) return 52 + "em"; },
            height: 15 + "em",
            duration: function () { return anime.random(1200, 1800); },
            delay: function () { return anime.random(0, 400); }
        },
        forth: {
            targets: homeTargets.second,
            easing: 'linear',
            opacity: 1
        }
    };

    animeTL
        .add(StartAnimationObject.first)
        .add(StartAnimationObject.second)
        .add(StartAnimationObject.third)
        .add(StartAnimationObject.forth);

    WaitForAnimation((1600 + 250) * 3);
}

function HideTrigger(target) {
    anime({
        targets: target,
        translateX: [0, -1000],
        easing: 'easeInElastic(1, .5)',
        duration: function () { return anime.random(1200, 1800); },
        delay: function (el, i, l) { return anime.random(0, 400); },
    });
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