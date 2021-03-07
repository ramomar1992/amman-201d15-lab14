/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionItem = document.createElement('option');
    let optionText = document.createTextNode(Product.allProducts[i].name);
    optionItem.value = JSON.stringify(Product.allProducts[i]);
    // optionItem.setAttribute('url', Product.allProducts[i].filePath);
    optionItem.appendChild(optionText);
    selectElement.appendChild(optionItem);
    
    
    
  }
  
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  let oldData;
  if (localStorage.getItem('cart')) {
    oldData = JSON.parse(localStorage.getItem('cart'));
  }
  cart.items = oldData;
  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  catalogForm.reset();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let selectedItem = Product.allProducts[document.querySelector('select').selectedIndex];
  // TODO: get the quantity
  let quantity = document.querySelector('input[type="number"]').value;
  // TODO: using those, add one item to the Cart
  cart.addItem(selectedItem, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemsCount = document.getElementById('itemCount');
  itemsCount.textContent = `(${cart.items.length})`;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let optionslist = document.querySelector('select');
  let item = JSON.parse(optionslist.options[optionslist.selectedIndex].value).name;
  let quantity = document.querySelector('input[type="number"]').value;

  // TODO: Add a new element to the cartContents div with that information
  let cartContents = document.getElementById('cartContents');
  let tableRow = document.createElement('tr');
  let nameCell = document.createElement('td');
  let quantityCell = document.createElement('td');
  nameCell.textContent = item;
  quantityCell.textContent = quantity;
  tableRow.appendChild(nameCell);
  tableRow.appendChild(quantityCell);
  if (cartContents.firstChild) {
    cartContents.firstChild.lastChild.appendChild(tableRow);
  } else {
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    let nameTableHead = document.createElement('th');
    nameTableHead.textContent = 'Item';
    let quantityTableHead = document.createElement('th');
    quantityTableHead.textContent = 'Quantity';
    table.appendChild(tableHead);
    tableHead.appendChild(tableHeadRow);
    tableHeadRow.appendChild(nameTableHead);
    tableHeadRow.appendChild(quantityTableHead);
    cartContents.appendChild(table);
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    tableBody.appendChild(tableRow);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
