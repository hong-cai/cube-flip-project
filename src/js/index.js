import 'jquery';
import { gsap } from 'gsap/dist/gsap';
import '../css/style.scss';
const frontImages = document.querySelectorAll('.front');
const bottomImages = document.querySelectorAll('.bottom');
const leftImages = document.querySelectorAll('.left');
const rightImages = document.querySelectorAll('.right');
const topImages = document.querySelectorAll('.top');
const backImages = document.querySelectorAll('.back');
const cubeWrapper = document.querySelector('.screen-carousel-1');
const cubes = document.querySelectorAll('.cube');
const allSides = document.querySelectorAll('.screen-carousel-1 .one-screen');
const sideBtns = document.querySelectorAll('.side-btn');
const btnId = sideBtns.id;
const rows = 2;
const cubeWidth = cubeWrapper.offsetWidth / (cubes.length / rows);
const columns = 3;
let init = 0;
let animation;





/** ================================
 **      - Toggle menu dropdown list -
 ** ================================ */
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

var userMenuDiv = document.getElementById("userMenu");
var userMenu = document.getElementById("userButton");

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;

function check(e) {
    var target = (e && e.target) || (event && event.srcElement);

    //User Menu
    if (!checkParent(target, userMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, userMenu)) {
            // click on the link
            if (userMenuDiv.classList.contains("invisible")) {
                userMenuDiv.classList.remove("invisible");
            } else { userMenuDiv.classList.add("invisible"); }
        } else {
            // click both outside link and outside menu, hide menu
            userMenuDiv.classList.add("invisible");
        }
    }

    //Nav Menu
    if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
                navMenuDiv.classList.remove("hidden");
            } else { navMenuDiv.classList.add("hidden"); }
        } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
        }
    }

}

function checkParent(t, elm) {
    while (t.parentNode) {
        if (t == elm) { return true; }
        t = t.parentNode;
    }
    return false;
}



/** ================================
 **      - Face image distance -
 ** ================================ */
// only for 2 rows of images,need optimization
function loadImage(imageGroup, string) {
    imageGroup.forEach((image, index) => {
        image.style.backgroundImage = "url(./css/img/" + string + ".jpg)";
        image.style.opacity = 1;
        if (index >= (cubes.length / rows)) {
            image.style.backgroundPosition = (cubes.length / rows - index) * cubeWidth + "px " + (1 - rows) * cubeWidth + "px";
        } else {
            image.style.backgroundPosition = "-" + index * cubeWidth + "px 0px";
        }

    });
}
loadImage(leftImages, "view");
loadImage(rightImages, "run");
loadImage(topImages, "city");
loadImage(bottomImages, "grey");
loadImage(frontImages, "slide");
loadImage(backImages, "mirror-edge-com");


function unloadImage(imageGroup, string) {
    imageGroup.forEach((image, index) => {
        image.style.backgroundImage = "";
    });
}


function autoFlip(images, flipped) {
    if (flipped === false) {
        window.requestAnimationFrame(() => { sideFlip(images, 90) });
    } else {
        window.requestAnimationFrame(() => { sideFlip(images, 0) });
    }
    async function sideFlip(images, deg) {
        for (let i = 0; i < images.length; i++) {
            await new Promise(r => setTimeout(r, 1000));
            console.log(images);
        }
        window.requestAnimationFrame(sideFlip);
    }
}

function flipImage(btn, allSides) {
    // bottom to front
    // transform: rotateX(90deg);
    // top to front
    // transform: rotateX(-90deg);
    // left to front
    // transform: rotateY(90deg);
    // back to front, front to back
    // transform: rotateY(180deg);
    // right to front
    // transform: rotateY(-90deg);
    allSides.forEach((side) => {
        let direction = { x: "X", y: "Y" };
        let sideClass = [...side.children].map((img) => {
            if (img.className === btn.id) {
                flip(btn.id, side)
            } else {
                console.log(btn.id)
            }



        })

    }
    )
}

function flip(direction, singleSide) {
    switch (direction) {
        case "left":
            singleSide.style.transform = "rotateY(90deg)";
            break;
        case "right":
            singleSide.style.transform = "rotateY(-90deg)";
            break;
        case "top":
            singleSide.style.transform = "rotateX(-90deg)";
            break;
        case "bottom":
            singleSide.style.transform = "rotateX(90deg)";
            break;
        case "back":
            singleSide.style.transform = "rotateY(180deg)";
            break;
        case "front":
            singleSide.style.transform = "rotateY(-180deg)";
            break;
        default:
            console.log("no btn clicked")
            break;
    }

}


function btnToSide(btn) {
    flipImage(btn, allSides);

}



function flipCube() {
    const rots = {
        x: 0,
        y: 0,
        z: 0
    };
    // const endless;
    let flip = gsap.timeline({
        repeat: -1,
        yoyo: true,
        pause: false,
        repeatDelay: 2,
        defaults: {
            delay: 3,
            duration: 1,
        },
        onUpdate: () => {
            gsap.set(cubes, {
                stagger: {
                    each: 0.3,
                    // ease: "Power1.easeInOut"
                    ease: "sine.inOut",
                    // ease: "power2.in"
                },
                transform: `rotateX(${rots.x}deg) rotateY(${rots.y}deg) rotateZ(${rots.z}deg)`,
            });
        }
    })
        .to(rots, { y: -90 }) //riht
        .to(rots, { y: -180 }) //back
        .to(rots, { y: -270 }) //left
        .to(rots, { x: 90 }) //bottom
        .to(rots, { x: -90 })//bottom to top
    return flip;
}


document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {
        // window.requestAnimationFrame(flipCube);
        // start endless run
        // start the flipCube
        // let endless = gsap.delayedCall(0, flipCube);

        sideBtns.forEach(btn => {
            // btn.addEventListener("mouseenter", function () {
            //     // endless.kill();
            //     console.log('killed')
            // });
            // btn.addEventListener("mouseleave", function () {
            //     // endless = gsap.delayedCall(1, flipCube);
            //     console.log('resume')
            // });

            btn.addEventListener("click", () => { btnToSide(btn) })
        });

        cubeWrapper.addEventListener('mouseenter', () => { let flip = flipCube(); flip.pause(); console.log('killed') })
    }
})




