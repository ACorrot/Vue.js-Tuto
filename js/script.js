Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    }, 
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img style="height: 200px" :src="image" :alt="description">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <a :href="hrefLink">Clique ici</a>

            <p v-if="inStock">In stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
            <p>{{ sale }}</p>
            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>


            <div v-for="(variant, index) in variants" 
                :key="variant.variantID" 
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="variantProduct(index)">
            </div>
        </div>

        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">+</button>
        <button @click="removeToCart" v-if="cart > 0">-</button>

        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            onSale: true,
            description: 'Ceci est la description de ce logo.',
            hrefLink: 'https://www.google.fr',
            details: ["80 cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantID: 1,
                    variantColor: "green",
                    variantImage: './assets/vue-logo.png',
                    variantQuantity: 10
                },
                {
                    variantID: 2,
                    variantColor: "blue",
                    variantImage: './assets/react-logo.png',
                    variantQuantity: 0
                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeToCart() {
            this.cart -= 1
        },
        variantProduct(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product 
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale !'
            } else {
                return this.brand + ' ' + this.product
            }
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
    }
})
