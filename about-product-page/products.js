const productList = document.getElementById('product-list');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');

let cartData = [];

const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      h4>${product.title}</h4>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
};

const addToCart = (id, title, price) => {
  const existingProduct = cartData.find(item => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cartData.push({ id, title, price, quantity: 1 });
  }
  updateCart();
};

const updateCart = () => {
  cartItems.innerHTML = '';
  let total = 0;

  cartData.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.title} x${item.quantity}</span>
      <div>
        <button onclick="incrementItem(${item.id})">+</button>
        <button onclick="decrementItem(${item.id})">-</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  totalPriceEl.textContent = total.toFixed(2);
};

const incrementItem = (id) => {
  const product = cartData.find(item => item.id === id);
  if (product) product.quantity += 1;
  updateCart();
};

const decrementItem = (id) => {
  const product = cartData.find(item => item.id === id);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
  } else {
    cartData = cartData.filter(item => item.id !== id);
  }
  updateCart();
};

const removeItem = (id) => {
  cartData = cartData.filter(item => item.id !== id);
  updateCart();
};

viewCartBtn.addEventListener('click', () => {
  cart.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
});

fetchProducts();
