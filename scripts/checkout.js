import { cart, removeCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilis/money.js";
import {deliveryOptions} from "../data/deliveryOptions.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// Function to render the cart items
function renderCart() {
  let checkoutHTML = ``;

  cart.forEach((item) => {
    const productId = item.productId;
    const matchingProduct = products.find((product) => product.id === productId);

    if (matchingProduct) {
      checkoutHTML += `

      <div class="cart-item-container js-cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>

        
        `;
    }
  });

  function deliveryOptionHTML()
  {
    deliveryOptions.forEach((deliveryoption)=>{
      const today = dayjs();
      const deliveryDate = today.add(7,'days');
      const dateString =deliveryDate.format('dddd,MMMM D'));

      
      `
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>`

    })
  }



  document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

  // Attach event listeners to delete buttons after rendering
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      removeCart(productId);
      renderCart(); 
    });
  });
}


renderCart();

