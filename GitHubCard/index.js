import axios from 'axios'
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/D2MBingo5')
  .then( response => {
    console.log(response.data.login)
    console.log(response.data.html_url)
    console.log(response)
  })
  .catch( err => {
    console.log(err)
  })
  .finally(() => {console.log('done')})  

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/D2MBingo5')
    .then(res => {
      console.log(res.data)
      const newCard = gitCard(res)
      console.log(newCard)
      return newCard      
    })
    .then(newCard => {
      cards.appendChild(newCard)
    })
    .catch(err => console.log(err))
    .finally(() => console.log('done'))
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'Jie-chelchel',
  'rkshockey',
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];
console.log(followersArray)

followersArray.forEach(item => {
  cardsFromArray(item)
})

function cardsFromArray(un){
 axios.get(`https://api.github.com/users/${un}`)
    .then(res => {
      console.log(res.data)
      const newCard = gitCard(res)
      console.log(newCard)
      return newCard      
    })
    .then(newCard => {
      cards.appendChild(newCard)
    })
    .catch(err => console.log(err))
    .finally(() => console.log('done')) 
}


// function cardsFromArray(array){
//   array.forEach( item => {
//     let un = item.data.login
//     console.log(un)
//   })
//   // const newCard = gitCard()
//   // cards.appendChild(newCard)
//   // return newCard
// }
// cardsFromArray(followersArray)

// `https://api.github.com/users/${un}`

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function gitCard(object){
  const cardContainer = document.createElement('div')

  const gitPfp = document.createElement('img')
  const cardInfo = document.createElement('div')
    const displayName = document.createElement('h3')
    const username = document.createElement('p')
    const location = document.createElement('p')
    const profile = document.createElement('p')
      const gitAddress = document.createElement('a')
    const gitFollowers = document.createElement('p')
    const gitFollowing = document.createElement('p')
    const gitBio = document.createElement('p')
  
  cardContainer.classList.add('card')
  cardInfo.classList.add('card-info')  
  displayName.classList.add('name')
  username.classList.add('username')

  cardContainer.appendChild(gitPfp)
  cardContainer.appendChild(cardInfo)
  cardInfo.appendChild(displayName)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  profile.appendChild(gitAddress)
  cardInfo.appendChild(gitFollowers)
  cardInfo.appendChild(gitFollowing)
  cardInfo.appendChild(gitBio)

  gitPfp.src = object.data.avatar_url
  displayName.textContent = object.data.name
  username.textContent = object.data.login
  location.textContent = object.data.location
  gitAddress.href = object.data.html_url
  gitAddress.textContent = object.data.html_url
  gitFollowers.textContent = `Followers: ${object.data.followers}`
  gitFollowing.textContent = `Following: ${object.data.following}`
  gitBio.textContent = object.data.bio

  return cardContainer
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
