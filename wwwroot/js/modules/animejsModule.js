export function InitAnimeJs() {
    //ProcessText();
    StartAnimation();
}

function ProcessText() {
    let children = Array.from(document.getElementsByClassName("hero-text")[0].children);
    let content = [];

    children.forEach(function (ele, index) {
        content[index] = function () {
            let html = "";
            ele.textContent.split("").forEach(function (letter, index) {
                if (letter == " ") {
                    return true;
                }

                html += `<span class="letter">${letter}</span>`;
            });

            return html;
        }();
    });

    children[0].innerHTML = content[0];
    children[1].innerHTML = content[1];
    children[2].innerHTML = content[2];
}

function StartAnimation() {
    let animeCardTargets = document.querySelectorAll(".hero-intro .hero-card");
    let animeTextTargets = document.querySelectorAll(".hero-intro .hero-card .text");
    let animeListTargets = document.querySelectorAll(".hero-list .hero-card");

    let animeTL = anime.timeline({
        duration: 2000
    });

    animeTL.add({
        targets: animeListTargets,
        translateX: [-1000, 0],
        translateY: [-500, 0],
        opacity: [0, 1],
        scale: function (el, i, l) { return 0.6; },
        duration: function () { return anime.random(1200, 1800); },
        delay: function (el, i, l) { return anime.random(0, 400); },
        direction: 'forward'
    }).add({
        targets: animeCardTargets,
        translateX: [-1000, 0],
        translateY: [-500, 0],
        opacity: [0, 1],
        borderRadius: function () { return 50 + "%"; },
        scale: function (el, i, l) { return 0.6; },
        duration: function () { return anime.random(1200, 1800); },
        delay: function (el, i, l) { return anime.random(0, 400); },
        direction: 'forward'
    }).add({
        targets: animeCardTargets,
        borderRadius: function () { return 1 + "em"; },
        scale: function (el, i, l) { return 1; },
        width: function (el, i, l) { if (i == 0) return 36 + "em"; if (i == 1) return 45 + "em"; if (i == 2) return 52 + "em"; },//38-51
        height: function () { return 15 + "em"; },
    }).add({
        targets: animeTextTargets,
        opacity: function () { return 1; }
    });
}

function TechTrigger() {

}