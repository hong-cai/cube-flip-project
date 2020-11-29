console.log('in js');
import 'jquery';


const upImages = document.querySelectorAll('.screen-carousel-1 .one-screen .up-image');
const downImages = document.querySelectorAll('.screen-carousel-1 .one-screen .down-image');
const imageWraps=document.querySelectorAll('.screen-carousel-1 .one-screen');
let init=0;
let flipped=false;

/** ================
 ** - Screen Carousel -
 ** ================ */
function loadImages(images,string){
    images.forEach((image,index)=>{
        image.style.backgroundImage="url(./css/img/"+string+(index+1)+".jpg)";
        image.style.backgroundSize="contain";
    })
}
loadImages(upImages,'Skyscraper');
loadImages(downImages,'sakura');




function autoFlip(images,flipped){
  if(flipped===false){
      window.requestAnimationFrame(()=>{sideFlip(images,90)});
  }else{
      window.requestAnimationFrame(()=>{sideFlip(images,0)});
  }
  async function sideFlip(images,deg){
      for (let i = 0; i < images.length; i++) {
          await new Promise(r => setTimeout(r, 300));
          images[i].style.transform="rotateX("+deg+"deg)";
      }
      window.requestAnimationFrame(sideFlip);
  }
}


window.onload=function(){
  if(init===0){
    init+=1;
    setTimeout(()=>{autoFlip(imageWraps,flipped)},1000)
}
    let timer=setInterval(function(){
            autoFlip(imageWraps,flipped)
        flipped=!flipped;
    },6000)
}



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

var cube = document.querySelector('.cube');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

function changeSide() {
  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener( 'change', changeSide );