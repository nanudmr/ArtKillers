const slider = document.querySelector(".slider-container")
const slides = Array.from(document.querySelectorAll(".slide")) 
const body = document.querySelector("body")

console.log(body)

let isDragging = false
let startPosition = 0
let currentTranslate = 0
let previousTranslate = 0
let animationID = 0
let currentIndex = 0

slides.forEach((slide, index) => {

    // Prevent Image Drag
    const slideImg = slide.querySelector("img")
    slideImg.addEventListener("dragstart", (e)=>{
        e.preventDefault()
    })

    // Touch Events
    slide.addEventListener("touchstart", touchStart(index))
    slide.addEventListener("touchend", touchEnd)
    slide.addEventListener("touchmove", touchMove)


    // Mouse Events
    slide.addEventListener("mousedown", touchStart(index))
    slide.addEventListener("mouseup", touchEnd)
    slide.addEventListener("mouseleave", touchEnd)
    slide.addEventListener("mousemove", touchMove)


})

// Disable Context Menu
window.oncontextmenu = function(e){
    e.preventDefault()
    e.stopPropagation()
    return false
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index){
    return function(event){
        currentIndex = index
        isDragging = true
        startPosition = getPositionX(event)

        animationID = requestAnimationFrame(animation)

        body.classList.add("grabbing")
    }
}

function touchEnd(){
    isDragging = false
    cancelAnimationFrame(animationID)
    const movedBy = currentTranslate - previousTranslate

    if(movedBy < -60 && currentIndex < slides.length -1){
        currentIndex += 1
    }

    if(movedBy > 60 && currentIndex > 0){
        currentIndex -= 1
    }

    setPositionByIndex()

    body.classList.remove("grabbing")
}

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = previousTranslate + currentPosition - startPosition
    }
}


function animation(){
    setSliderPosition()
    if(isDragging){
        requestAnimationFrame(animation)
    }
}

function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth
    previousTranslate = currentTranslate
    setSliderPosition()
}