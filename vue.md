# Vue.js

On va créer, dans le js, un objet de type `Vue`. Exemple :

```js
let app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vue-logo.png',
        description: 'Ceci est la description de ce logo.',
        hrefLink: 'https://www.google.fr',
        inventory: 4,
    }
})

```

Cibler un élément, par ex un id, comme #app
Ensuite, data sera le contenu de cette div, et nous créons une clef, comme ``product`` qui aura pour valeur ``Socks``. Dans le HTML, on ``{{ product }}`` en étant dans #app, et ça affichera la clef.

Pour une image, le src={{test}} ne fonctionne pas. On va créer une clef image et une valeur dans le js, puis en front on va utiliser ``v-bind:src="la clef"``, et bingo.
Note : On peut utiliser ``v-bind:src="le lien"`` ou ``:src="le lien"`` pour faire plus court


Possibilité de faire des conditons, comme :
``inventory: 100``

Et :
```html
<p v-if="inventory > 10">En stock</p>
<p v-else>Rupture</p>
Cela fera apparaître uniquement le "En stock", on peut même rajouter...
<p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock !!!</p>
```
...qui aura pour effet d'afficher que le produit est presque en rupture quand on arrive en-dessous de 10

Si on veut montrer une seule chose, comme le "en stock", on peut utiliser ``v-show`` et passer cet élément en ``true``. S'il est passé en ``false``, il sera display:none;.

Pour le foreach :

``details: ["80 cotton", "20% polyester", "Gender-neutral"]``

```html
<ul>
    <li v-for="detail in details">{{ detail }}</li>
</ul>
```

## Pour des objects :

```js
variants: [
    {
        variantID: 1,
        variantColor: "green"
    },
    {
        variandID: 2,
        variantColor: "red"
    }
]
```

```html
<div v-for="variant in variants" :key="variant.variantID">{{ variant.variantColor }}</div>
```
Le fait de mettre une :key avec le variantID nous permettra d'avoir leur index dans la partie Vue de l'inspecteur.

## Partie event Listeners :

Pour faire un onclick, on peut faire ``v-on:click="la fonction"`` ou alors :
```html
<button @click="addToCart">Add to cart</button>
<div class="cart">
    <p>Cart({{ cart }})</p>
</div>
```

```html
<div v-for="variant in variants" :key="variant.variantID">
    <p @mouseover="variantProduct(variant.variantImage)">{{ variant.variantColor }}</p>
</div>
```
En dehors de la partie ``data`` de Vue, on va faire ceci :

```js
methods: {

    // au clic, fait +1 au compteur <p> qui s'appelle {{ cart }}
    addToCart() {
        this.cart += 1
    },

    // Pour changer l'image en fonction du mot qu'on mouseover
    variantProduct(variantImage) {
        this.image = variantImage
    }
}
```

Il existe même ``@submit``, ``@keyup``, etc

## Classes 

On peut ajouter/modifier une classe d'un élément via Vue :

``:style="{ backgroundColor: variant.variantColor }"``
Appliquer ceci permet d'afficher en tant que background-color les couleurs aux <div> différentes.
On peut utiliser fontSize par exemple pour la font-size.

Autre ex plus poussé : 
```js
styleObject: {
    color: 'red',
    font-size: '17px'
}
```

Si on fait ``:style="styleObject'``, l'élément aura accès à toutes les propriétés de l'object. On peut également faire ``:style="[styleObject, styleObject2]"`` pour plusieurs objects différents

On peut donner des classes à des éléments en fonction de conditions également avec :

``test1: true``,
``test2: false``

Sur le HTML/Template :

``:class="{active: test1, 'danger': test2}"``

L'élément en question n'aura que la classe active vu que celle-ci est true


## Computed properties

Il s'agit de fonctions/méthodes qui ne se contentent pas de stocker une valeur, mais plutôt de retourner des choses.
On met ça à la suite des ``methods:`` par exemple, et dans ``data:`` lui-même.
Exemple :

```js
computed: {
    title() {
        return this.brand + ' ' + this.product
    }
}
```

Dans le HTMl/Template :
```<h1>{{ title }}</h1>```

On peut également faire quelque chose de ce genre :

```js
computed: {
    image() {
        return this.variants[this.selectedVariant].variantImage
    },
}
```

En bref, ça nous permettra de return pas mal de choses en fonction de certains paramètres (si le stock est présent ou non, etc)

## Components

Les components sont très puissants. Ils nous permettent de créer des composants qui eux-même contiennent des composants. Ce sont donc des objects qui sont modulables selon l'envie. Pour en créer un :

```js
Vue.component('nom du component', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }
})
```

On ajoute ensuite la partie 'template', qui viendra s'inscrire dans notre HTML/Template :

```js
Vue.component('nom-du-component', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }, 
    template: `
    <div>
        <nom-du-component :premium="premium"></nom du component>
    </div>
    `
})
```

On crée une balise qui portera le même nom que le component créé, comme par exemple 'product'.
Puis, on retourne dans notre objet ``Vue`` et on inscrit notre ``premium`` à l'intérieur, comme ceci : 

```js
data: {
    premium: true
}
```

On pourra donc vérifier si l'utilisateur est premium ou non. En guise d'autre exemple, nous pouvons créer un component s'insérant dans un autre component, simplement en le créant et en insérant ce component via les balises HTML.