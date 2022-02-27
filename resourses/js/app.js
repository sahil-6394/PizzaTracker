import axios from "axios";
import moment from "moment";
import Noty from "noty"
import initAdmin from "./admin"

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
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'something went wrong',
            progressBar:false
        }).show();
    })
} 

addToCart.forEach( (btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updatecart(pizza)        
    })
})

//remove alert message after x second
const alertmsg = document.querySelector('#success-alert')
if(alertmsg) {
    setTimeout(() => {
        alertmsg.remove()
    }, 2000)
}

//change order status
let statuses = document.querySelectorAll('.status-line')
let hiddenInput = document.querySelector('#hidden')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')  
        status.classList.remove('current')
    })
     let stepCompleted  = true
     statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling)
                status.nextElementSibling.classList.add('current')
        }
     })
}

updateStatus(order)

//Socket
let socket = io()
initAdmin(socket)

//join
// we are one customers orders page pleade join and create private room on given orderid
if(order) {
    socket.emit('join',`order_${order._id}`)
}
let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
    socket.emit('join', 'adminRoom')
}
socket.on('orderUpdated', (data) => {
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    console.log(data)
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar:false
    }).show();
})
//order_order_id name for every private room