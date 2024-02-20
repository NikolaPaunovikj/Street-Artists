  const artistItemPage = document.querySelector('.artist-items-page')
// Artist Items Page
  const displayItemsPage = () => {
  snapshot.style.pointerEvents = 'auto'
  errorSpan.style.display = 'none'
  snapshotP.style.display = 'block'
  snapshotCamera.style.display = 'block'
  snapshot.classList.remove('error')
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));
  location.hash = 'addItem'
  artistItemPage.innerHTML = ''
  artistItemPage.style.display = 'block'
  const addItemContainer = document.createElement('div')
  addItemContainer.classList.add('add-item-container')
  const addItem = document.createElement('div')
  addItem.classList.add('add-item')
  const addItemText = document.createElement('p')
  addItemText.classList.add('add-item-text')
  addItemText.textContent = '+Add new item'
  artistItemPage.appendChild(addItemContainer)
  addItemContainer.appendChild(addItem)
  addItem.appendChild(addItemText)

  addItem.addEventListener('click', (e) => {
  addEditText.textContent = 'Add new Item'
  artistItemPage.style.display = 'none'
  imageInput.style.pointerEvents = 'auto' 
  titleInput.value = ''
  descriptionInput.value = ''
  typeInput.value = ''
  priceInput.value = ''
  imageInput.value = ''
  picture = ''
  snapshotImage.src = ''
  href = ''
  snapshotImage.style.display = 'none'
  confirmEdit.style.display = 'none'
  addNewItemBtn.style.display = 'block'
  const addNewItemSection = document.querySelector('.add-new-item-section')
  addNewItemSection.classList.toggle('active')
})
  selectedArtist.forEach(item =>{
  let checkDateSold = Object.hasOwn(item, 'dateSold')
  const artistItemContainer = document.createElement('div')
  artistItemContainer.classList.add('artist-item-container')
  artistItemPage.appendChild(artistItemContainer)
  const artistItemPicture = document.createElement('div')
  const picture = document.createElement('img')
  picture.setAttribute('src', `${item.image}`)
  artistItemPicture.classList.add('artist-item-picture')
  picture.classList.add('picture')
  artistItemContainer.append(artistItemPicture)
  artistItemPicture.append(picture)
  const artistItemDescriptionContainer = document.createElement('div')
  artistItemDescriptionContainer.classList.add('artist-item-description-container')
  artistItemContainer.append(artistItemDescriptionContainer)
  if(checkDateSold){
    item.price === item.priceSold
  }
  const originalDateString = item.dateCreated;
  const parts = originalDateString.split('T')[0].split('-');
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  const convertedDateString = `${day}.${month}.${year}`;
  artistItemDescriptionContainer.innerHTML += ` <div class="artist-item-description-top">
  <div class="artist-item-description-title">
  <p>${item.title}</p>
  <small>${convertedDateString}</small>
  </div>
  <div class="artist-item-description-price">
  <p>$${item.price}</p>
  </div>
  </div>
  <div class="artist-item-description-bottom">
  <p>
  ${item.description}
  </p>
  </div>`
// Create Buttons
  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('buttons-container')
  artistItemContainer.append(buttonsContainer)
  const buttonsDiv = document.createElement('div')
  buttonsDiv.classList.add('buttons-div')
  buttonsContainer.append(buttonsDiv)
  const sendToAuctionButton = document.createElement('button')
  const unpublish = document.createElement('button')
  const remove = document.createElement('button')
  const edit = document.createElement('button')
  edit.setAttribute('id', storedItems.length)
  sendToAuctionButton.classList.add('send-to-auction')
  if(checkDateSold){
    sendToAuctionButton.style.pointerEvents = 'none'
    sendToAuctionButton.style.backgroundColor = 'grey'
    unpublish.style.pointerEvents = 'none'
    unpublish.style.backgroundColor = 'grey'
    edit.style.pointerEvents = 'none'
    edit.style.backgroundColor = 'grey'
    edit.style.color = 'white'
    remove.style.pointerEvents = 'none'
    remove.style.backgroundColor = 'grey'
    
  }
  if(item.isAuctioning === true){
  sendToAuctionButton.style.backgroundColor = 'grey'
  unpublish.style.pointerEvents = 'none'
  unpublish.style.backgroundColor = 'grey'
  edit.style.pointerEvents = 'none'
  edit.style.backgroundColor = 'grey'
  edit.style.color = 'white'
  remove.style.pointerEvents = 'none'
  remove.style.backgroundColor = 'grey'
  }
  if(item.isPublished){
  unpublish.classList.add('unpublish')
  unpublish.textContent = 'Unpublish'
  } else {
  unpublish.classList.add('publish')
  unpublish.textContent = 'Publish'
  }
  remove.classList.add('remove')
  edit.classList.add('edit')
  edit.textContent = 'Edit'
  sendToAuctionButton.textContent = 'Send to auction'
  remove.textContent = 'Remove'
  buttonsDiv.append(sendToAuctionButton)
  buttonsDiv.append(unpublish)
  buttonsDiv.append(remove)
  buttonsDiv.append(edit)
  remove.setAttribute('id', item.id)
  unpublish.setAttribute('id', item.id)
  sendToAuctionButton.setAttribute('id', item.id)
  edit.setAttribute('id', item.id)
  addNewItemSection.classList.remove('active')  
  unpublish.addEventListener('click', function(e){
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));
  let btnId = +unpublish.id
  let index = storedItems.findIndex(el => el.id === btnId)
  let index2 = selectedArtist.findIndex(el=>el.id === btnId)
  artistEdit = selectedArtist[index2]  
  if(storedItems[index].isPublished === true){
  storedItems[index].isPublished = false
  artistEdit.isPublished = false
  unpublish.classList.add('publish')
  unpublish.classList.remove('unpublish')
  unpublish.textContent = 'Publish'
  } else {
  storedItems[index].isPublished = true
  artistEdit.isPublished = true
  unpublish.classList.add('unpublish')
  unpublish.classList.remove('publish')
  unpublish.textContent = 'Unpublish'
  }
  localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  })
  remove.addEventListener('click', function(e){  
  let storedItems = JSON.parse(localStorage.getItem("artistsItems")); 
  modal.style.display = 'block'  
  confirmRemoval.addEventListener('click', (e)=>{
  modal.style.display = 'none'
  storedItems =  storedItems.filter((element)=> element.id != remove.id) 
  selectedArtist =  selectedArtist.filter((element)=> element.id != remove.id)
  artistItemContainer.remove()
  localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  })
  cancelRemoval.addEventListener('click', (e)=>{
  modal.style.display = 'none'
  })
  })     
  
  sendToAuctionButton.addEventListener('click', (e)=>{
    startTimer()
  noItemsAuction.style.display = 'none'
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));   
  let auctionBtnId = +sendToAuctionButton.id
  let index = storedItems.findIndex(el => el.id === auctionBtnId)
  let auctioningCounter = []
  storedItems.forEach(artist => {
  auctioningCounter.push(artist.isAuctioning)
  })
  if(auctioningCounter.includes(true)){
  alert('You already have a live auctioned item')
  } else {
  storedItems[index].isAuctioning = true
  sendToAuctionButton.style.backgroundColor = 'grey'
  unpublish.style.pointerEvents = 'none'
  unpublish.style.backgroundColor = 'grey'
  storedItems[index].isPublished = true
  edit.style.pointerEvents = 'none'
  edit.style.backgroundColor = 'grey'
  remove.style.pointerEvents = 'none'
  remove.style.backgroundColor = 'grey'
  } 
  startTimer();

  localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  })
  edit.addEventListener('click', (e)=>{  
  const addNewItemSection = document.querySelector('.add-new-item-section')
  addEditText.textContent = 'Edit Item'
  addNewItemSection.classList.toggle('active')
  artistItemPage.style.display = 'none'
  href = ''      
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));
  let btnId = +edit.id
  let index = storedItems.findIndex(el => el.id === btnId)
  let index2 = selectedArtist.findIndex(el=>el.id === btnId)
  artistEdit = selectedArtist[index2]   
  titleInput.value = artistEdit.title
  descriptionInput.value = artistEdit.description
  typeInput.value = artistEdit.type
  priceInput.value = artistEdit.price
  imageInput.value = ''
  snapshotImage.src = artistEdit.image
  imageInput.style.pointerEvents = 'auto' 
  if(artistEdit.image.includes('data:image')){
  imageInput.value = ''
  snapshotImage.style.display = 'block'
  imageInput.style.pointerEvents = 'none' 
  }
  else {
  imageInput.value = artistEdit.image
  snapshotImage.style.display = 'none'
  snapshot.style.pointerEvents = 'none'
  errorSpan.style.display = 'block'
  snapshotP.style.display = 'none'
  snapshotCamera.style.display = 'none'
  snapshot.classList.add('error')
  }
  snapshotImage.value = picture
  publishedCheckbox.checked = artistEdit.isPublished        
  addNewItemSection.classList.add('active')    
  confirmEdit.style.display = 'block'
  addNewItemBtn.style.display = 'none'
  confirmEdit.addEventListener('click', (e)=>{            
  const date = new Date()
  let currentDay = String(date.getDate()).padStart(2,'0')
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}.${currentMonth}.${currentYear}`
  artistEdit.title =  titleInput.value
  artistEdit.description =  descriptionInput.value
  artistEdit.price =  priceInput.value   
  artistEdit.dateCreated =  `${currentDate}` 
  if(href === ''){
  href = snapshotImage.src
  } else {
  artistEdit.image = href
  }
  if(imageInput.value !==''){
  artistEdit.image = imageInput.value
  }
  let isPublished = true               
  if(publishedCheckbox.checked){
  isPublished = true
  } else {
  isPublished = false
  }
  if(titleInput.value !== '' && descriptionInput.value !== '' && typeInput.value !== '' && priceInput.value !== ''){
  if(imageInput.value === '' && href === ''){
  alert('Please upload a picture')
  } else {
  artistEdit.isPublished = isPublished 
  storedItems.findIndex(el => el.id === btnId)
  storedItems.splice(index,1)
  storedItems.push(selectedArtist[index2])
  localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  displayItemsPage()
  addNewItemSection.classList.remove('active')  
  } 
  } 
  else{
  alert('Please input all of the requiered fields')
  }                                      
  })   
  })      
  // }
  })
  }
  cancelBtn.addEventListener('click', (e)=>{
  addNewItemSection.classList.toggle('active')
  artistItemPage.style.display = 'block'
})
  
  const addNewItemSection = document.querySelector('.add-new-item-section')
  artistItems.addEventListener('click', displayItemsPage)
  const addNewItemBtn = document.querySelector('.add-new-item-btn')
  const addNewItem = () => {
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));
  let idNumber = storedItems[storedItems.length-1].id + 1
  console.log(idNumber)
  function Artist(description,image,price, artist, dateCreated, publish, isAuctioning, title,type){
  this.id = idNumber++
  this.description = description
  this.image = image
  this.price = price
  this.artist = artist
  this.dateCreated = dateCreated
  this.isPublished = publish
  this.isAuctioning = isAuctioning
  this.title = title
  this.type = type
  }
  const descriptionInput = document.querySelector('.description-input')
  addNewItemBtn.addEventListener('click',(e)=>{
  imageInput.style.pointerEvents = 'auto'
  let storedItems = JSON.parse(localStorage.getItem("artistsItems"));
  const date = new Date()
  let currentDay = String(date.getDate()).padStart(2,'0')
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}.${currentMonth}.${currentYear}`
  // let id = counter
  let description = descriptionInput.value
  let price = +priceInput.value
  let image = picture
  if(imageInput.value !==''){
  image = imageInput.value
  }
  let artistName = selectedArtist[0].artist
  let dateCreated = `${currentDate}`
  let publish = false;
  let isAuctioning = false
  let title = titleInput.value
  let type = typeInput.value
  if(publishedCheckbox.checked){
  published = true
  } 
  else {
  published = false
  }
  if(titleInput.value !== '' && descriptionInput.value !== '' && typeInput.value !== '' && priceInput.value !== ''){
  if(imageInput.value === '' && picture === ''){
  alert('Please upload a picture')
  } 
  else {
  let artist = new Artist(description,image,price,artistName,dateCreated,published,isAuctioning,title,type)
  selectedArtist.push(artist)
  storedItems.push(artist)
  addNewItemSection.classList.toggle('active')
  localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  displayItemsPage()
  } 
  } 
  else{
  alert('Please input all of the requiered fields')
  }  
  })
  }
  addNewItem()

  artistAccess = false
  liveAuctioningItem.addEventListener('click', (e)=>{
  artistAccess = true
  location.hash = 'auction'
  storedItems.forEach(item =>{
    if(item.isAuctioning === true){
   noItemsAuction.style.display = 'none'
   auctionItemContainer.innerHTML = `
   <div class="auction-item-container">
   <div class="visitor-item-picture">
   <img class='picture' src="${item.image}" alt="">
   </div>
   <div class="visitor-item-description-container">
   <div class="visitor-item-description-top">
   <div class="visitor-item-description-title">
   <h1>${item.artist}</h1>
   </div>
   <div class="visitor-item-description-price">
   <p>${item.price}$</p>
   </div>
   </div>
   <div class="visitor-item-description-bottom">
   <h5>${item.title}</h5> 
   <p>${item.description}</p>
   </div>
   </div>
   </div> 
   `   
   noItemsAuction.style.display = 'none'
    } else {
    biddingContainer.style.display = 'none'
    }
  })
  })

  if(ArtistAccess = true){
    input.style.pointerEvents = 'none'
    document.querySelector('.submitBid').style.pointerEvents = 'none'
  }

 