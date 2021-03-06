//API from https://fakestoreapi.com/
const API = 'https://fakestoreapi.com/';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: 'cart',
        catalogUrl: 'products',
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',    
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
            //console.log(product);
            let find = this.cartItems.find(el => el.id === product.id);            
            if(find){
                find.quantity++;
            }else{
                let prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod);
            }
            //console.log(find);
            //console.log(this.products[0].id);
            //let find = this.cartItems.find(el => el.id_product === product.id_product);            
        },
        remove(item) {
            if (item.quantity > 1) {
                item.quantity--;
            }else{
                this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
        },

        filter(){           
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.title));
            console.log('filter');
        },
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.filtered.push(el);
                    this.products.push(el);                    
                }                
            });
        /* this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);                    
                }                
            }); */
    }
});