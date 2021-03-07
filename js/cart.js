/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  for (let i in cartItems) {
    cartItems[i] = new CartItem(new Product(cartItems[i].product.filePath, cartItems[i].product.name), cartItems[i].quantity);
  }
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tbody = document.querySelector('table tbody');

  // TODO: Iterate over the items in the cart
  for (let i in cart.items) {
    // TODO: Create a TR
    let tr = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    let tdRemove = document.createElement('td');
    let tdName = document.createElement('td');
    let tdQuantity = document.createElement('td');
    tdRemove.innerHTML = '<a href="#" id="'+i+'">X</a>'
    tdName.textContent = cart.items[i].product.name;
    tdQuantity.textContent = cart.items[i].quantity;
    tr.appendChild(tdRemove);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdName);

    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tbody.appendChild(tr);
  }

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  let elementToDelete = event.target.id;
  cart.removeItem(elementToDelete );
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
