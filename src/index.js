/**




 - new-ramen form that adds new image and object to div when form is filled out.
 - information does not need to remain after refresh
 - prevent default;

 - update form feature
 - delete ramen feature
 */
//  URLS
//  const url = 'http://localhost:3000';
 const urlRamen = 'http://localhost:3000/ramens'
 const urlId = 'http://localhost:3000/rames/id';
// html elements
// Ramen Displays
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenDetailImg = document.querySelector('.detail-image')
const ramenRatings = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const ramenMenu = document.querySelector('#ramen-menu')
// New Ramen Form
const form = document.getElementById('new-ramen')
const newName = document.querySelector('#new-name')
const restaurant = document.querySelector('#new-restaurant')
const image = document.querySelector('#new-image')
const rating = document.querySelector('#new-rating')
const comment = document.querySelector('#new-comment')
// Update form
const updateForm = document.getElementById('edit-ramen')
const newRating = document.getElementById('update-rating')
const newComment = document.getElementById('update-comment')
// console.log(ramenDetailImg)
// console.log(ramenName)
// console.log(ramenRestaurant)
document.addEventListener('DOMContentLoaded', loadPage);
function loadPage (){
    fetch(urlRamen)
    .then(r=> r.json())
    .then(data => loadRamen(data))
    form.addEventListener('submit', createNewRamen)
    updateForm.addEventListener('submit', handleUpdate)
};
function loadRamen(ramen){
    loadFirstRamen(ramen);
    ramen.forEach(loadRamenImages);
};

function loadFirstRamen (ramen){
    // console.log(ramenDetailImg)
    ramenName.innerText = `${ramen[0].name}` 
    ramenRestaurant.innerText = `${ramen[0].restaurant}`
    ramenDetailImg.src = `${ramen[0].image}`
    ramenRatings.innerText = `${ramen[0].rating}`
    ramenComment.innerText = `${ramen[0].comment}`
};

function loadRamenImages(ramen){
    let i = document.createElement('img')
    i.src = `${ramen.image}`
    i.className = `${ramen.id}`
    // console.log(i)
    ramenMenu.appendChild(i)
    i.addEventListener('click', updateDisplay)
};

function updateDisplay (e){
    let id = e.target.className
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(r => r.json())
    .then((data) => {
        console.log(data)
        ramenName.innerText = `${data.name}` 
        ramenRestaurant.innerText = `${data.restaurant}`
        ramenDetailImg.src = `${data.image}`
        ramenRatings.innerText = `${data.rating}`
        ramenComment.innerText = `${data.comment}`
    })
    console.log(e.target.className)
};

function createNewRamen(e){
    e.preventDefault();
    let i = document.createElement('img')
    i.src = image.value
    ramenMenu.appendChild(i)
    i.addEventListener('click', handleClick)
};

function handleClick(e){
    ramenName.innerText = newName.value 
    ramenRestaurant.innerText = restaurant.value
    ramenDetailImg.src = image.value
    ramenRatings.innerText = rating.value
    ramenComment.innerText = comment.value
};

function handleUpdate(e){
    e.preventDefault();
    ramenRatings.innerText = newRating.value
    ramenComment.innerText = newComment.value
}