const snapshotImage = document.querySelector('.snapshot-image')
let picture = ''
if(!localStorage.getItem('artistsItems')){
  localStorage.setItem("artistsItems", JSON.stringify(items));
}
let storedItems = JSON.parse(localStorage.getItem("artistsItems"));

let artistSelect = document.querySelector('.artist-dropdown')
const visitorButton = document.querySelector('.visitor-btn')
const homePage = document.querySelector('.home-page')
const artistPage = document.querySelector('.artist-page')
const artistName = document.querySelector('.artist-name')
const itemsSold = document.querySelector('.items-sold')
const totalIncomeDiv = document.querySelector('.total-income-number')
const navBar = document.querySelector('.nav-bar')
const artistItems = document.querySelector( '.artist-items')
const publishedCheckbox = document.querySelector('.published-checkbox')
const modal = document.querySelector('.mod')
const confirmEdit = document.querySelector('.confirmEdit')
const titleInput = document.querySelector('.title-input')
const descriptionInput = document.querySelector('.description-input')
const typeInput = document.querySelector('.type-input')
const priceInput = document.querySelector('.price-input')
const imageInput = document.querySelector('.image-input')
const visitorNavBarSection = document.querySelector('.visitor-nav-bar-section')
const visitorHomePageSection = document.querySelector('.visitor-home-page-section')
const listingPageRouteButton = document.querySelector('.listing-page-route-button')
const carouselVisitorsPage = document.querySelector('.carousel-visitors-page')
const visitorListingPage = document.querySelector('.visitor-listing-page')
const filterLogo = document.querySelector('.filter-logo')
const visitorFilterPage = document.querySelector('.visitor-filter-page')
const acceptFilter = document.querySelector('.accept-filter')
const cancelFilter = document.querySelector('.cancel-filter')
const filterOption = document.querySelector('.filter-option')
const filterType = document.querySelector('.filter-type')
const auctionLogo = document.querySelector('.auction-logo')
const auctionPage = document.querySelector('.auction-page')
const biddingForm = document.querySelector('.bidding-form');
const biddingValues = document.querySelector('.bidding-values');
const input = document.querySelector('.bid-input');
const timerElement = document.getElementById('timer');
const biddingContainer = document.querySelector('.bidding-container')
const noItemsAuction = document.querySelector('.no-items-auction')
const itemSold = document.querySelector('.item-sold')
const liveAuctioningPrice = document.querySelector('.live-auctioning-price')
const cancelBtn = document.querySelector('.cancel-btn')
const addEditText = document.querySelector('.add-edit-text')
const confirmRemoval = document.querySelector('.confirm-mod')
const cancelRemoval = document.querySelector('.cancel-mod')
const liveAuctioningItem = document.querySelector('.live-auctoning-item')

let storedData = JSON.parse(localStorage.getItem("artistsData"));

let totalIncome = 0
let soldItems = 0
let counter = 1
let editMode = false
let selectedArtist = []
