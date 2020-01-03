
/*DOM VARIABLES*/

const btn = document.querySelector('.mobile-menu__trigger-container');
const dropdownContent = document.querySelector('.dropdown-content');
const searchInputTriggerBtn = document.querySelector('.search-input__trigger');
const inputSearch = document.querySelector('.site-nav_profile-list__search-input');

/*API VARIABLES*/
const API_KEY = '82c9bb31ceb4540d53b131656bd30ec9';
const URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US
              &sort_by=popularity.desc&first_air_date.gte=2017&page=${getRandomPage()}
              &vote_average.gte=8&include_null_first_air_dates=false`;


const pg = ['G', 'PG', 'PG-13', 'PG-16'];

getRandomPg();
function getRandomPg() {
  const agePg = document.querySelectorAll('.overlay-info__container-pg-info');
  for (let i = 0; i < agePg.length; i++) {
    agePg[i].textContent = pg[Math.floor(Math.random() * pg.length)];
  }
}

function getRandomPage() {
  return Math.floor(Math.random() * 20);
}

async function getData() {
  let movieResults;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

renderTitle();

async function renderTitle() {
  const backgroundImg = document.querySelectorAll('.netflix-video__background-img');

  const movieResults = await getData();
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';
  for (let i = 0; i < backgroundImg.length; i++) {
    backgroundImg[i].src = `${baseImgUrl}${movieResults.results[i].poster_path}`;
  }
}



searchInputTriggerBtn.addEventListener('click', function () {
  inputSearch.classList.toggle('show-element');
});

btn.addEventListener('click', function () {
  dropdownContent.classList.toggle('flex');
},
  false
);


/*firebase*/


// const logoutBtn = document.querySelector('#logout');

// logoutBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut().then(() => {
//     console.log('user log out')
//   })
// });