const sliderContainer = document.querySelector('.slider-container')
// Visitor Code
  const displayPublishedCards = () =>{
  const slider = document.createElement('div')
  slider.classList.add('slider')
  sliderContainer.append(slider)
  const slideTrack = document.createElement('div')
  slideTrack.classList.add('slide-track')
  slider.append(slideTrack)
  visitorHomePageSection.append(sliderContainer)
  storedItems.forEach(item =>{
  if(item.isPublished===true){
  const slide = document.createElement('div')
  slide.classList.add('slide')
  slideTrack.append(slide)
  const image = document.createElement('img')
  image.setAttribute('src', item.image)
  slide.append(image)
  image.addEventListener('click', (e)=>{
  location.hash = 'visitor/listing'
  displayVisitorCards(filteredStoredItems)
  })
  }
  })
  }

  const displayPublishedCards2 = () =>{
  const slider2 = document.createElement('div')
  slider2.classList.add('slider2')
  sliderContainer.append(slider2)
  const slideTrack2 = document.createElement('div')
  slideTrack2.classList.add('slide-track2')
  slider2.append(slideTrack2)
  visitorHomePageSection.append(sliderContainer)
  storedItems.forEach(item =>{
  if(item.isPublished===true){
  const slide2 = document.createElement('div')
  slide2.classList.add('slide2')
  slideTrack2.append(slide2)
  const image = document.createElement('img')
  image.setAttribute('src', item.image)
  slide2.append(image)
  image.addEventListener('click', (e)=>{
  location.hash = 'visitor/listing'
  displayVisitorCards(filteredStoredItems)
  })
  }
  })
  }

  displayPublishedCards()
  displayPublishedCards2()

  listingPageRouteButton.addEventListener('click', (e)=>{
  location.hash = 'visitor/listing'
  displayVisitorCards(filteredStoredItems)
  })

  let filteredStoredItems = storedItems.filter((item)=> item.isPublished === true)

  const displayVisitorCards = (filteredItems) => {
  visitorListingPage.innerHTML = ''
  for(let i=0; i<filteredItems.length; i++){
  if(i % 2 ===0){
  visitorListingPage.innerHTML += 
  `<div class="visitor-item-container">
  <div class="visitor-item-picture">
  <img class='picture' src="${filteredItems[i].image}" alt="">
  </div>
  <div class="visitor-item-description-container">
  <div class="visitor-item-description-top">
  <div class="visitor-item-description-title">
  <h1>${filteredItems[i].artist}</h1>
  </div>
  <div class="visitor-item-description-price">
  <p>${filteredItems[i].price}$</p>
  </div>
  </div>
  <div class="visitor-item-description-bottom">
  <h5>${filteredItems[i].title}</h5> 
  <p>${filteredItems[i].description}</p>
  </div>
  </div>
  </div>
   `
  } else {
  visitorListingPage.innerHTML += 
  `<div class="visitor-item-container">
  <div class="visitor-item-picture">
  <img class='picture' src="${filteredItems[i].image}" alt="">
  </div>
  <div class="visitor-item-description-container odd">
  <div class="visitor-item-description-top ">
  <div class="visitor-item-description-title">
  <h1>${filteredItems[i].artist}</h1>
  </div>
  <div class="visitor-item-description-price">
  <p class='odd-button'>${filteredItems[i].price}$</p>
  </div>
  </div>
  <div class="visitor-item-description-bottom  ">
  <h5>${filteredItems[i].title}</h5> 
  <p>${filteredItems[i].description}</p>
  </div>
  </div>
  </div>
    `
  }
  }
  }

  filterLogo.addEventListener('click', (e)=>{
  visitorFilterPage.style.display='block'
  visitorFilterPage.classList.add('visitor-filter-page-active')

  storedData.forEach(data => {
  const option = document.createElement('option')   
  option.innerText = data.name
  option.setAttribute('value', data.name) 
  filterOption.append(option)
  })
  itemTypes.forEach(data => {
  const option = document.createElement('option')   
  option.innerText = data
  option.setAttribute('value', data) 
  filterType.append(option)
  })
  })
  let artist = ''
  filterOption.addEventListener('change', (e)=>{
  artist = filterOption.value
  })
  let type=''
  filterType.addEventListener('change', ()=>{
  type = filterType.value
  })
  acceptFilter.addEventListener('click', ()=>{
  let title = document.querySelector('.item-title-filter').value.toLowerCase();
  let minPrice = +document.querySelector('.min-price').value
  let maxPrice = +document.querySelector('.max-price').value
  filterOption.innerHTML = ''
  filterType.innerHTML = ''
  const filtered = filteredStoredItems.filter((item)=>{
  if(title && !item.title.toLowerCase().includes(title)) return false;
  if(artist && item.artist !== artist) return false;
  if(minPrice && item.price < minPrice) return false;
  if(maxPrice && item.price > maxPrice) return false;
  if(type && item.type !== type) return false;
  return true
  })
  displayVisitorCards(filtered)
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  })
  addNewItemSection.classList.remove('active') 
  cancelFilter.addEventListener('click', (e)=>{
  filterOption.innerHTML = ''
  filterType.innerHTML = ''
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  })
