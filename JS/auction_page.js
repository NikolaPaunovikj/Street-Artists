//Auction Page
//Small delay between clicking the send to auction button and start of auction
   const auctionItemContainer = document.querySelector('.auction-item-container')
   let artistOnAuction = []
   let remainingTime = 120;
   let apiBid = false
   auctionLogo.addEventListener('click', (e)=>{  
    document.querySelector('.submitBid').style.pointerEvents = 'auto'
   ArtistAccess = false
   input.style.pointerEvents = 'auto'
   biddingForm.style.pointerEvents = 'auto'
   location.hash = 'auction'
   storedItems.forEach(item => {
   if(item.isAuctioning === true){
   auctionItemContainer.innerHTML += `
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
   artistOnAuction.push(item)
   } else {
   biddingContainer.style.display = 'none'
    }
  })
   })
   let isBiddingAllowed = true;
   function updateTimer(remainingTime) {
    if(apiBid){
      remainingTime +=60
      localStorage.setItem('remainingTime', remainingTime);
    }
   const minutes = Math.floor(remainingTime / 60);
   const seconds = remainingTime % 60;
   timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   }
   function startTimer() {
   let remainingTime = localStorage.getItem('remainingTime');
   if (remainingTime === null) {
     remainingTime = 120;    
   } else {
   remainingTime = parseInt(remainingTime);
  }

  updateTimer(remainingTime);
  const interval = setInterval(() => {
  if (remainingTime > 0) {
    biddingContainer.style.display ='block'
    remainingTime--;
    localStorage.setItem('remainingTime', remainingTime);
    updateTimer(remainingTime);
    itemSold.style.display = 'none'
    let liveAuctionPrice = JSON.parse(localStorage.getItem("itemPrice"));
    liveAuctioningPrice.textContent = `$${liveAuctionPrice}`
    const bidValues = document.querySelectorAll('.bid')
    const soldPrice = +bidValues[bidValues.length -1].textContent
    liveAuctioningPrice.textContent = `$${soldPrice}`
    } else {
    biddingContainer.style.display ='none'
    itemSold.style.display = 'block'
    clearInterval(interval);
    isBiddingAllowed = false;
    bidValues = document.querySelectorAll('.bid')
    soldPrice = +bidValues[bidValues.length -1].textContent
    liveAuctioningPrice.textContent = `$${soldPrice}`
    storedItems.forEach(item =>{
    if(item.isAuctioning === true && soldPrice !== 0){
    item.isAuctioning = false
    item.isPublished = false
    item.priceSold = soldPrice
    item.isPublished = false
    const date = new Date(); 
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    item.dateSold = formattedDate
    localStorage.removeItem('itemPrice')
    localStorage.removeItem('remainingTime')
    localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  } else if (item.isAuctioning === true && soldPrice === 0){
    item.isAuctioning = false
    localStorage.removeItem('itemPrice')
    localStorage.removeItem('remainingTime')
    localStorage.setItem("artistsItems", JSON.stringify(storedItems));
  }
      })
     }
    }, 1000);
}
    window.addEventListener('hashchange', function () {
    let lastBid = JSON.parse(localStorage.getItem("itemPrice"));
    biddingValues.innerHTML = `
    <li class='api-bid bid'>${+lastBid}</li>`
    let remainingTime = localStorage.getItem('remainingTime');
    if(remainingTime){
      startTimer()    
      localStorage.setItem('remainingTime', remainingTime);
    }
  });
    window.addEventListener('load', (e)=>{
    let remainingTime = localStorage.getItem('remainingTime');
    let lastBid = JSON.parse(localStorage.getItem("itemPrice"));
    biddingValues.innerHTML = `
    <li class='api-bid bid'>${+lastBid}</li>`
    if(remainingTime){
    startTimer()   
    localStorage.setItem('remainingTime', remainingTime);
    }
  })
biddingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!isBiddingAllowed) {
      return;
  }
  
  const formData = new FormData();
  formData.set('amount', +input.value);
  if (input.value < artistOnAuction[0].price) {
      alert('Input must be a larger number than the current price');
      document.querySelector('.submitBid').style.pointerEvents = 'auto'
  } else {
    document.querySelector('.submitBid').style.pointerEvents = 'none'
      biddingValues.innerHTML += `<li class='my-bid bid'>${input.value}</li>`;
      artistOnAuction[0].price = +input.value;
      localStorage.setItem("itemPrice", JSON.stringify(+input.value));
      const delayTime = Math.random() * 9000 + 1000;
      setTimeout(() => {
          fetch('https://projects.brainster.tech/bidding/api', {
              method: 'POST',
              body: formData,
          })
              .then((res) => res.json())
              .then((data) => {
                  if (data.isBidding) { 
                    document.querySelector('.submitBid').style.pointerEvents = 'auto'
                    apiBid = true                                      
                    biddingForm.style.pointerEvents = 'auto'                   
                    biddingValues.innerHTML += `<li class='api-bid bid'>${data.bidAmount}</li>`;
                    artistOnAuction[0].price = data.bidAmount;
                    localStorage.setItem("itemPrice", JSON.stringify(data.bidAmount));
                  }
              });
      }, delayTime);
  }
});


