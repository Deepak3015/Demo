export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionsId:'1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionsId:'2'
  },
];
function saveToStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);
  
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId:'1'
    });
  }
  saveToStorage()
}

export function removeCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

function updateDeliveryOption(productId,deliveryOptionId)
{
  let matchingItem;
  cart.forEach((cartItem)=>{
    if (productId === cartItem){
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionsId =deliveryOptionId;
  saveToStorage();
}
