import { cart, removeCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilis/money.js";

// Function to render the cart items
function renderCart() {
  let checkoutHTML = ``;

  // Iterate over each item in the cart
  cart.forEach((item) => {
    const productId = item.productId;
    const matchingProduct = products.find((product) => product.id === productId);

    if (matchingProduct) {
      checkoutHTML += `
        <div class="cart-item-container js-cart-item-container">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label">${item.quantity}</span></span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
              </div>
            </div>
          </div>
        </div>`;
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


renderCart();