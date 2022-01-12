import axios from "axios";
import Noty from "noty"

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector("#cartCounter")

function updatecart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'pizza is added to your cart',
            progressBar:false
        }).show()
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'something went wrong',
            progressBar:false
        }).show()
    })
} 

addToCart.forEach( (btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updatecart(pizza)        
    })
})