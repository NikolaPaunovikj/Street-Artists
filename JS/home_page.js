fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("artistsData", JSON.stringify(data));
  })
  .then(data =>{
  let storedData = JSON.parse(localStorage.getItem("artistsData"));
  storedData.forEach(data => {
  const option = document.createElement('option')   
  option.innerText = data.name
  option.setAttribute('value', data.name) 
  artistSelect.append(option)
  })  
  artistSelect.addEventListener('change', ()=>{
  location.hash='artist'
  let selectedValue = document.querySelector('.artist-dropdown').value
  selectedArtist = storedItems.filter(el => {
  return el.artist === selectedValue
  })
  generateChart()
  artistName.textContent = selectedArtist[0].artist
  let totalItems = selectedArtist.length
  selectedArtist.map(el =>{ 
   let checkDateSold = Object.hasOwn(el, 'dateSold')
   let checkPriceSold = Object.hasOwn(el, 'priceSold')
   if(checkDateSold){
   soldItems ++
   itemsSold.textContent = `${soldItems} / ${totalItems}`
   } else {
    itemsSold.textContent = `${soldItems} / ${totalItems}`
   } 
   if(checkPriceSold){
   totalIncome += el.priceSold
   totalIncomeDiv.textContent = `${totalIncome} $`
   } else {
    totalIncomeDiv.textContent = `${totalIncome} $`
   }    
   })
   })
   visitorButton.addEventListener('click', (e)=>{
   location.hash = 'visitor'
   })   
   })
      
  const handleRouter = () =>{
  let hash = location.hash
  if(hash.includes('artist')){
  homePage.style.display = 'none'
  artistPage.style.display = 'block'
  navBar.style.display = 'block'
  visitorNavBarSection.style.display = 'none'
  visitorHomePageSection.style.display = 'none'
  carouselVisitorsPage.style.display='none'
  filterLogo.style.display='none'
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  } else if(hash.includes('listing')){
  homePage.style.display = 'none'
  artistPage.style.display= 'none'
  visitorNavBarSection.style.display = 'block'
  visitorHomePageSection.style.display = 'none'
  carouselVisitorsPage.style.display='none'
  visitorListingPage.style.display = 'block'
  filterLogo.style.display='block'
  auctionPage.style.display = 'none'
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  } else if(hash.includes('addItem')){
  displayItemsPage()
  homePage.style.display = 'none'
  artistPage.style.display = 'none'
  navBar.style.display = 'block'
  visitorNavBarSection.style.display = 'none'
  visitorHomePageSection.style.display = 'none'
  carouselVisitorsPage.style.display='none'
  filterLogo.style.display='none'
  auctionPage.style.display = 'none'
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  } else if(hash.includes('auction')){
  auctionPage.style.display = 'block'
  homePage.style.display = 'none'
  artistPage.style.display = 'none'
  navBar.style.display = 'none'
  visitorNavBarSection.style.display = 'block'
  visitorHomePageSection.style.display = 'none'
  visitorListingPage.style.display ='none'
  carouselVisitorsPage.style.display='none'
  filterLogo.style.display='none'
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  }
  else if(hash.includes('visitor')) {
  homePage.style.display = 'none'
  artistPage.style.display= 'none'
  visitorNavBarSection.style.display = 'block'
  visitorHomePageSection.style.display = 'block'
  carouselVisitorsPage.style.display='block'
  filterLogo.style.display='none'
  auctionPage.style.display = 'none'
  visitorFilterPage.classList.remove('visitor-filter-page-active')
  }
  }   
  window.addEventListener('hashchange', handleRouter)
  window.addEventListener('load',(e)=>{
  location.hash = ''
  })
    // HAMBURGER MENU
  const hamburger = document.querySelector('.hamburger-menu')
  const navMenu = document.querySelector('.nav-menu')
  hamburger.addEventListener('click', ()=>{
  navMenu.classList.toggle('active')
  })
    // _______________________