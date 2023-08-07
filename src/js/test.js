import Notiflix from "notiflix";
import { PixabayApi } from "./PixabayApi";
import 'notiflix/src/notiflix.css'
import { createMarkup } from "./createMarkup";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayApi = new PixabayApi();
let lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  
});

searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtn);
loadMoreBtn.classList.add('is-hidden');

 async function handleSearchFormSubmit (evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    
    searchForm.reset();
    pixabayApi.searchQuery = searchQuery;
    pixabayApi.currentPage = 1;

    if(!searchQuery){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    try {
      const arrGallery = await pixabayApi.fetchGallery();
      Notiflix.Notify.success(`Hooray! We found ${arrGallery.totalHits} images.`);
           
      if(!arrGallery.hits.length) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
      };

     gallery.innerHTML = createMarkup(arrGallery.hits)
    lightbox.refresh()
    loadMoreBtn.classList.remove('is-hidden');
  }catch (error) {
    console.log(error);
  }
};


 async function handleLoadMoreBtn() {
  try {
    pixabayApi.currentPage += 1;
    const arrGallery = await pixabayApi.fetchGallery()
    
    gallery.insertAdjacentHTML('beforeend', createMarkup(arrGallery.hits))
    lightbox.refresh()
    pixabayApi.totalImages()
    console.log(arrGallery.totalHits);
    if(pixabayApi.totalImages() >= arrGallery.totalHits){
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return
    }
  }catch (error) {
    console.log(error);
  }
};


 