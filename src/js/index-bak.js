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
let flipped = false;

/** ================
 ** - Screen Carousel -
 ** ================ */
function loadImages(images, string) {
	images.forEach((image, index) => {
		image.style.backgroundImage = "url(./css/img/" + string + (index + 1) + ".jpg)";
		image.style.backgroundSize = "contain";
	})
}
// loadImages(frontImages, 'Skyscraper');
// loadImages(bottomImages, 'sakura');
// loadImages(leftImages, 'mirror');
// loadImages(rightImages, 'run');
// loadImages(topImages, 'grey');
// loadImages(backImages, 'city');

//



/** ================================
 **      - Face image distance -
 ** ================================ */
// only for 2 rows of images,need optimization
function loadImage(imageGroup, string) {
	imageGroup.forEach((image, index) => {
		image.style.backgroundImage = "url(./css/img/" + string + ".jpg)";
		if (index >= (cubes.length / rows)) {
			// image.style.left = (index - cubes.length / rows) * cubeWidth + "px";
			image.style.backgroundPosition = (cubes.length / rows - index) * cubeWidth + "px " + (1 - rows) * cubeWidth + "px";
		} else {
			// image.style.left = index * cubeWidth + "px";
			image.style.backgroundPosition = "-" + index * cubeWidth + "px 0px";
		}

	});
}
// loadImage(leftImages, "slide");
// loadImage(rightImages, "run");
loadImage(topImages, "city");
// loadImage(bottomImages, "grey");
loadImage(frontImages, "view");
// loadImage(backImages, "mirror-edge-com");


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


function addImage() { }

function flipCube(direction,) {

	gsap.to(cubes,
		{
			delay: 1,
			duration: .5,
			yoyo: true,
			css: {
				rotationX: -90,
				x: 0,
				y: cubeWidth / 2,
				z: "-" + cubeWidth / 2
			},
			stagger: {
				each: 0.22,
				ease: "Power1.easeInOut"
				// ease: "power2.in"
			}
		},

	)
		// .to(cubes, {
		//     duration: .5,
		//     css: {
		//         rotationX: -90,
		//         x: 0,
		//         y: 150,
		//         z: "-" + 150
		//     },
		//     ease: "Power1.easeInOut"
		// }, 0.22).to(cubes, {
		//     duration: .5,
		//     css: {
		//         rotationY: -90,
		//         x: 0,
		//         y: 150,
		//         z: "-" + 150
		//     },
		//     ease: "Power1.easeInOut"
		// }, 0.22)
		;
}


document.addEventListener('DOMContentLoaded', function () {

	window.onload = function () {
		sideBtns.forEach(btn => {
			btn.addEventListener("click", () => { btnToSide(btn) })
		});
		window.requestAnimationFrame(flipCube);
	}
})



// for (var i = 0; i < 100; i++) {
//     var star =
//       '<div class="star m-0" style="animation: twinkle ' +
//       (Math.random() * 5 + 5) +
//       's linear ' +
//       (Math.random() * 1 + 1) +
//       's infinite; top: ' +
//       Math.random() * $(window).height() +
//       'px; left: ' +
//       Math.random() * $(window).width() +
//       'px;"></div>';
//     $('.homescreen').append(star);
//   }




/** ================
 ** - Cube  -
 ** ================ */

// var cube = document.querySelector('.cube');
// var radioGroup = document.querySelector('.radio-group');
// var currentClass = '';

// function changeSide() {
//     // var checkedRadio = radioGroup.querySelector(':checked');
//     // var showClass = 'show-' + checkedRadio.value;
//     if (currentClass) {
//         cube.classList.remove(currentClass);
//     }
//     cube.classList.add(showClass);
//     currentClass = showClass;
// }
// // set initial side
// changeSide();

// radioGroup.addEventListener('change', changeSide);









//testimonial : version 1
jQuery(function ($) {
	var cards = $('#card-slider .slider-item').toArray();

	startAnim(cards);

	function startAnim(array) {
		if (array.length >= 4) {
			TweenMax.fromTo(array[0], 0.5, { x: 0, y: 0, opacity: 0.75 }, { x: 0, y: -120, opacity: 0, zIndex: 0, delay: 0.03, ease: Cubic.easeInOut, onComplete: sortArray(array) });

			TweenMax.fromTo(array[1], 0.5, { x: 79, y: 125, opacity: 1, zIndex: 1 }, { x: 0, y: 0, opacity: 0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut });

			TweenMax.to(array[2], 0.5, { bezier: [{ x: 0, y: 250 }, { x: 65, y: 200 }, { x: 79, y: 125 }], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut });

			TweenMax.fromTo(array[3], 0.5, { x: 0, y: 400, opacity: 0, zIndex: 0 }, { x: 0, y: 250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut },);
		} else {
			$('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
		}
	}

	function sortArray(array) {
		clearTimeout(delay);
		var delay = setTimeout(function () {
			var firstElem = array.shift();
			array.push(firstElem);
			return startAnim(array);
		}, 3000)
	}

});





//testimonial : version 1
jQuery(function ($) {
	var cards = $('#card-slider .slider-item').toArray(),
		autoAdvance = gsap.delayedCall(3, function () {
			cards.push(cards.shift());
			startAnim(cards);
			autoAdvance.restart(true);
		});

	$('#card-slider').hover(function () { autoAdvance.pause(); }, function () { autoAdvance.resume(); });

	startAnim(cards);

	function startAnim(array) {
		if (array.length >= 4) {
			gsap.fromTo(array[0], { x: 0, y: 0, opacity: 0.75 }, { x: 0, y: -120, opacity: 0, zIndex: 0, delay: 0.03, ease: "cubic.inOut", onComplete: sortArray, onCompleteParams: [array] });

			gsap.fromTo(array[1], { x: 79, y: 125, opacity: 1, zIndex: 1 }, { x: 0, y: 0, opacity: 0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: "cubic.inOut" });

			gsap.to(array[2], { motionPath: [{ x: 0, y: 250 }, { x: 65, y: 200 }, { x: 79, y: 125 }], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: "cubic.inOut" });

			gsap.fromTo(array[3], { x: 0, y: 400, opacity: 0, zIndex: 0 }, { x: 0, y: 250, opacity: 0.75, zIndex: 0, ease: "cubic.inOut" });
		} else {
			$('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
		}
	}

});