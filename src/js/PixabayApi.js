import axios from "axios";

export class PixabayApi {
    API_KEY = '38631130-27e1bc4ae57544a30c421ce1d';
    BASE_URL = 'https://pixabay.com/api';

    currentPage = 1;
    searchQuery = null;
    per_page = 40;

    // searchParams = new URLSearchParams()

    async fetchGallery() {
        try {
            const response = await axios.get(`${this.BASE_URL}/?`, {
                params:{
                    key: this.API_KEY,
                    q: this.searchQuery,
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
            console.log(error);
        }
    };

    totalImages() {
        const total = this.per_page * this.currentPage;
      return total;
    }
    }