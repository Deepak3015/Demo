import { cart, removeCart ,updateDeliveryOption} from "../data/cart.js";
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
    const deliveryOptionId = item.deliveryOptionsId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id===deliveryOptionId)
      {deliveryOption=option
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');



    if (matchingProduct) {
      checkoutHTML += `

      <div class="cart-item-container js-cart-item-container">
      <div class="delivery-date">
        Delivery date:${dateString}
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
        
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
        ${deliveryOptionHTML(matchingProduct.id,productId)}
        </div>
      </div>
    </div>

        
        `;
    }
  });

 

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

function deliveryOptionHTML(matchingProduct,cartItem) {
  let deliveryOptionHTML =``
  deliveryOptions.forEach((deliveryoption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryoption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const pricestring = deliveryoption.priceCents === 0
    ? 'FREE'
    :`${formatCurrency(deliveryoption.priceCents)}-`;
    const ischecked = deliveryoption.id === cartItem.deliveryOptionId;
    deliveryOptionHTML+= `
        <div class="delivery-option js-delivery-option">
          <input type="radio" ${ischecked?'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct}">
          <div>
            <div class="delivery-option-date">
              ${dateString}  <!-- Replace with dynamic date -->
            </div>
            <div class="delivery-option-price">
              $${pricestring} Shipping
            </div>
          </div>
        </div>
        
    `;
  });
  return deliveryOptionHTML;

}
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    updateDeliveryOption();
  }
  )
})



renderCart();

