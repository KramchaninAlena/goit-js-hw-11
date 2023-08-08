import axios from "axios";
import Notiflix from "notiflix";
import 'notiflix/src/notiflix.css'

export class PixabayApi {
    API_KEY = '38631130-27e1bc4ae57544a30c421ce1d';
    BASE_URL = 'https://pixabay.com/api';

    currentPage = 1;
    query = null;
    per_page = 40;
    
    async fetchGallery() {
        try {
            const response = await axios.get(`${this.BASE_URL}/?`, {
                params:{
                    key: this.API_KEY,
                    q: this.query,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    per_page: this.per_page,
                    page: this.currentPage
                }
            
        })
        const dataGallery = response.data
        console.log(dataGallery);
        return dataGallery;
        }catch (error) {
            console.warn(error);
            Notiflix.Notify.failure("Network Error");
        }
    };

    totalImages() {
        const total = this.per_page * this.currentPage;
      return total;
    }
    }