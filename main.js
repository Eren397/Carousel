const carouselSlider = document.querySelector('.carousel__slider')
const carouselImages = document.querySelectorAll('.carousel__image')
const btnNext = document.querySelector('.carousel__controls--next')
const btnPrevious = document.querySelector('.carousel__controls--previous')
const userEvents = ['click', 'touchstart']

let index = 1

const forEachObj = {
    insertEvents(userEvents, element, callback){
        userEvents.forEach(userEvent => {
            element.addEventListener(userEvent, callback)
        })
    },
    removeEvents(userEvents, element, callback){
        userEvents.forEach(userEvent => {
            element.removeEventListener(userEvent, callback)
        })
    }    
}

forEachObj['insertEvents'](userEvents, btnNext, nextSlide)
forEachObj['insertEvents'](userEvents, btnPrevious, previousSlide)

function cloneImages(){
    const firstImage = carouselImages[0]
    const cloneFirstImage = firstImage.cloneNode(true)
    carouselSlider.appendChild(cloneFirstImage)    

    const lastImage = carouselImages[carouselImages.length - 1]
    const cloneLastImage = lastImage.cloneNode(true)
    carouselSlider.insertBefore(cloneLastImage, firstImage)
}
cloneImages()

function nextSlide(e){
    e.preventDefault()
    index++     
    carouselSlider.style.transition = 'left .3s ease-in-out'
    carouselSlider.style.left = `${-100 * index}%` 
    forEachObj['removeEvents'](userEvents, this, nextSlide)      
}

function previousSlide(e){
    e.preventDefault()
    index--
    carouselSlider.style.transition = 'left .3s ease-in-out'
    carouselSlider.style.left = `${-100 * index}%` 
    forEachObj['removeEvents'](userEvents, this, previousSlide)   
}

function createIndicators(){
    const carouselIndicators = document.querySelector('.carousel__indicators')
    for(let i = 0; i < carouselImages.length; i++){
        const span = document.createElement('span')
        span.classList.add('carousel__indicator')
        carouselIndicators.appendChild(span)
    }
    const allCarouselIndicators = document.querySelectorAll('.carousel__indicator')
    allCarouselIndicators.forEach((ind, position) => {
        forEachObj['insertEvents'](userEvents, ind, (e) => {
            e.preventDefault()
            setImage(position)             
        })
    })

    function setImage(position){
        index = position + 1
        carouselSlider.style.transition = 'left .3s ease-in-out'
        carouselSlider.style.left = `${-100 * index}%`        
    }
    whereIsTheImage()
}
createIndicators()
function whereIsTheImage(){
    const allCarouselIndicators = document.querySelectorAll('.carousel__indicator')
    allCarouselIndicators.forEach(i => {
        i.classList.remove('carousel__indicator--red')
    })
    allCarouselIndicators[index - 1].classList.add('carousel__indicator--red')   
}
carouselSlider.addEventListener('transitionend', () => {

    forEachObj['insertEvents'](userEvents, btnNext, nextSlide)
    forEachObj['insertEvents'](userEvents, btnPrevious, previousSlide)

    if(index > carouselImages.length){
        index = 1
        carouselSlider.style.transition = null
        carouselSlider.style.left = `${-100 * index}%` 
    }else if(index < 1){
        index = carouselImages.length
        carouselSlider.style.transition = null
        carouselSlider.style.left = `${-100 * index}%`         
    }
    whereIsTheImage()
})

