import axios from "axios";

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = null;

// const API_KEY = '38631130-27e1bc4ae57544a30c421ce1d';
// const BASE_URL = 'https://pixabay.com/api';

searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtn);
// loadMoreBtn.classList.add('is-hidden')

 function handleSearchFormSubmit(evt) {
    evt.preventDefault();
    searchQuery = evt.target.firstElementChild.value.trim();
    searchForm.reset()
    
    fetchImages(searchQuery).then(({data}) => gallery.innerHTML = createMarkup(data.hits));
    loadMoreBtn.classList.remove('is-hidden')
};

function handleLoadMoreBtn() {
    currentPage += 1;
    fetchImages(searchQuery, currentPage).then(({data}) => gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)));
}

async function fetchImages (searchQuery, page = 1) {
  try {
    const API_KEY = '38631130-27e1bc4ae57544a30c421ce1d';
    const BASE_URL = 'https://pixabay.com/api';
        
    const response = await axios.get(`${BASE_URL}/?`, {
        params:{
            key: API_KEY,
            q: `${searchQuery}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: `${page}`
        }
    
});
    console.log(response);
    return response;
  }catch (error) {
    console.log(error);
}
};

// function createMarkup(arr){
// return arr.map(({ webformatURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
// <img src="${webformatURL}" alt="${tags}" loading="lazy" />
// <div class="info">
//   <p class="info-item">
//     <b>Likes: ${likes}</b>
//   </p>
//   <p class="info-item">
//     <b>Views: ${views}b>
//   </p>
//   <p class="info-item">
//     <b>Comments: ${comments}</b>
//   </p>
//   <p class="info-item">
//     <b>Downloads: ${downloads}</b>
//   </p>
// </div>
// </div>`
// ).join('')
// }