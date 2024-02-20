//Camera
const imagePopup = document.querySelector('.imagePopup')
const snapshot = document.querySelector('.snapshot-items')
const webCamElement = document.querySelector('.webCam')
const canvasElement = document.getElementById('canvas')
const video = document.querySelector('.webCam')
const webcam = new Webcam(webCamElement, 'user', canvasElement)
let href = ''
snapshot.addEventListener('click', (e)=>{ 
  const takeSnapshot = document.createElement('a')
    takeSnapshot.setAttribute('href', '')
    takeSnapshot.classList.add('downloadSnapshot')
    const snapshotIcon = document.createElement('i')
    snapshotIcon.classList.add('fa-solid')
    snapshotIcon.classList.add('fa-camera')
    imagePopup.append(takeSnapshot)
    takeSnapshot.append(snapshotIcon)
    addNewItemSection.classList.remove('active') 
    artistItemPage.style.display = 'none'
    imagePopup.style.display = 'block'
    canvasElement.value = ''
    href = ''
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({video: true}).then((stream) =>{
              video.srcObject = stream
              video.play()
          })
      }
  
takeSnapshot.addEventListener('click', function(e){
  picture = webcam.snap()
  takeSnapshot.href = picture
  href = takeSnapshot.href
  imagePopup.style.display = 'none'
  artistItemPage.style.display = 'none'
  addNewItemSection.classList.add('active')
 
  takeSnapshot.remove()
  snapshotImage.src = picture
  snapshotImage.style.display = 'block'
  webcam.stop()
  imageInput.style.pointerEvents = 'none'
})
})

const errorSpan = document.querySelector('.error-span')
const snapshotP = document.querySelector('.snapshot-p')
const snapshotCamera = document.querySelector('.snapshot-camera')
imageInput.addEventListener('input', (e)=>{
  if(imageInput.value !== ''){
    snapshot.style.pointerEvents = 'none'
    errorSpan.style.display = 'block'
    snapshotP.style.display = 'none'
    snapshotCamera.style.display = 'none'
    snapshot.classList.add('error')
  } else {
    snapshot.style.pointerEvents = 'auto'
    errorSpan.style.display = 'none'
    snapshotP.style.display = 'block'
    snapshotCamera.style.display = 'block'
    snapshot.classList.remove('error')
  }
})



