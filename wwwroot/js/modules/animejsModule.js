export function InitAnimeJs() {
    //ProcessText();
    //StartAnimation();
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
    let animeTargets = document.querySelectorAll(".hero-text .letter");

    let animeTL = anime.timeline({
        duration: 5000
    });

    animeTL.add({
        targets: animeTargets,
        translateX: [-1000, 0],
        translateY: [-500, 0],
        //scale: function (el, i, l) { return 1.5; },
        //borderRadius: function () { return ['50%', anime.random(10, 35) + '%']; },
        duration: function () { return anime.random(1200, 1800); },
        delay: function (el, i, l) { return anime.random(0, 400); },
        direction: 'forward'
    });
}