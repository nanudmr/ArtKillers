const slides = document.querySelectorAll(".slide")
let slidePosition = 0
const totalSlide = slides.length*-100
const slider = document.querySelector(".slider")
let intervalTime = 4000

function carousel(){
    if(slidePosition === totalSlide +100){
        slidePosition = 0
        slider.style.transform = `translate(${slidePosition}vw, 0)`
    } else {
        slidePosition-=100
        slider.style.transform = `translate(${slidePosition}vw, 0)`
    }
}

// setInterval(carousel, intervalTime)


//TOUCH FUNCTION
let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX) {
    //   console.log('swiped left!')
      if(slidePosition === -300){
          slidePosition+=300
      } else{
        slidePosition-= 100
      }
      slider.style.transform = `translate(${slidePosition}vw, 0)`
    }
  if (touchendX > touchstartX) {
    //   console.log('swiped right!')
      if(slidePosition === 0){
          slidePosition-=300
      } else{
        slidePosition+=100
      }
      slider.style.transform = `translate(${slidePosition}vw, 0)`
    }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})