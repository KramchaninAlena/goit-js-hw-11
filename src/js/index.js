import Notiflix from "notiflix";
import { PixabayApi } from "./PixabayApi";
import 'notiflix/src/notiflix.css'
import { createMarkup } from "./createMarkup";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { scrolling } from "./scrolling";


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
    const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    
    searchForm.reset();
    pixabayApi.query = searchQuery;
    pixabayApi.currentPage = 1;

    if(!searchQuery){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    try {
      const arrGallery = await pixabayApi.fetchGallery();
                
      if(!arrGallery.hits.length) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
      };
        Notiflix.Notify.success(`Hooray! We found ${arrGallery.totalHits} images.`);
      
        gallery.innerHTML = createMarkup(arrGallery.hits)
        lightbox.refresh()

        pixabayApi.totalImages()
    if(arrGallery.hits.length < pixabayApi.totalImages()){
      loadMoreBtn.classList.add('is-hidden');
      return
    }
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
    scrolling()

    pixabayApi.totalImages()
    if(pixabayApi.totalImages() >= arrGallery.totalHits){
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      return
    }
  }catch (error) {
    console.log(error);
  }
};


