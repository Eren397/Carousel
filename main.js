const carouselSlider = document.querySelector('.carousel__slider')
const carouselImages = document.querySelectorAll('.carousel__images')
const btnNext = document.querySelector('.carousel__controls--next')
const btnPrevious = document.querySelector('.carousel__controls--previous')
const userEvents = ['click', 'touchstart']
let index = 1

const addEventListenerObj = {
    listener(userEvents, eventObj, callback){
        userEvents.forEach(userEvent => {
            eventObj.addEventListener(userEvent, callback)
        })
    }
}
function cloneImages(){
    const firstImage = carouselImages[0]
    const cloneFirstImage = firstImage.cloneNode(true)
    const lastImage = carouselImages[carouselImages.length - 1]
    const cloneLastImage = lastImage.cloneNode(true)  
    carouselSlider.appendChild(cloneFirstImage)   
    carouselSlider.insertBefore(cloneLastImage, firstImage)    
}
cloneImages()

addEventListenerObj['listener'](userEvents, btnNext, nextSlide)
addEventListenerObj['listener'](userEvents, btnPrevious, previousSlide)

function nextSlide(){
    index++
    carouselSlider.style.transition = `left .6s ease`
    carouselSlider.style.left = `${-100 * index}%`   
    this.style.display = 'none'   
}
function previousSlide(){
    index--
    carouselSlider.style.transition = `left .6s ease`
    carouselSlider.style.left = `${-100 * index}%` 
    this.style.display = 'none'   
}
function createIndicators(){
    const carouselIndicators = document.querySelector('.carousel__indicators')
    for(let i = 0; i < carouselImages.length; i++){
        const indicator = document.createElement('span')
        indicator.classList.add('carousel__indicator')
        carouselIndicators.appendChild(indicator)        
    }
    const allIndicators = document.querySelectorAll('.carousel__indicator')
    allIndicators.forEach((all, position) => {
        addEventListenerObj['listener'](userEvents, all, () => {
            goToTargetImg(position)
        })
    })
    function goToTargetImg(position){
        index = position + 1
        carouselSlider.style.transition = `left .6s ease`
        carouselSlider.style.left = `${-100 * index}%`            
        whereIsYouSlide()
    }    
}
createIndicators()
function whereIsYouSlide(){
    const allIndicators = document.querySelectorAll('.carousel__indicator')
    allIndicators.forEach(all => {
        all.classList.remove('carousel__indicator--red')
    })
    allIndicators[index - 1].classList.add('carousel__indicator--red')    
}
whereIsYouSlide()
carouselSlider.addEventListener('transitionend', () => {
    btnNext.style.display = null
    btnPrevious.style.display = null
    if(index > carouselImages.length){
        index = 1
        carouselSlider.style.transition = null
        carouselSlider.style.left = `${-100 * index}%` 
    }else if(index < 1 ){
        index = carouselImages.length
        carouselSlider.style.transition = null
        carouselSlider.style.left = `${-100 * index}%` 
    }
    whereIsYouSlide()
})