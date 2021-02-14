//API from https://fakestoreapi.com/
const API = 'https://fakestoreapi.com/';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'products',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            console.log(product.id);
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    }
});