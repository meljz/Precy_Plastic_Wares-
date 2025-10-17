const products = [
  { name: "Mini Wok", price: "₱250.00", image: staticPath + "palengke_image_1.jpg", alt: "Mini Wok", color: "red", brand: "precy", quantity: 1 },
  { name: "Container Bucket (timba)", price: "₱180.00", image: staticPath + "palengke_image_2.jpg", alt: "Container Bucket (timba)", color: "blue", brand: "precy", quantity: 1 },
  { name: "Toilet Brush", price: "₱95.00", image: staticPath + "palengke_image_3.jpg", alt: "Toilet Brush", color: "green", brand: "other", quantity: 1 },
  { name: "Container Bucket (timba)", price: "₱350.00", image: staticPath + "palengke_image_4.jpg", alt: "Container Bucket (timba)", color: "yellow", brand: "precy", quantity: 1 },
  { name: "Jug", price: "₱350.00", image: staticPath + "palengke_image_5.jpg", alt: "Jug", color: "red", brand: "precy", quantity: 1 },
  { name: "Water Dipper", price: "₱350.00", image: staticPath + "palengke_image_6.jpg", alt: "Water Dipper", color: "blue", brand: "precy", quantity: 1 },
  { name: "Foot Doormat", price: "₱350.00", image: staticPath + "palengke_image_7.jpg", alt: "Foot Doormat", color: "green", brand: "other", quantity: 1 },
  { name: "Chicken Feather Brush", price: "₱350.00", image: staticPath + "palengke_image_8.jpg", alt: "Chicken Feather Brush", color: "yellow", brand: "precy", quantity: 1 },
  { name: "Brush", price: "₱350.00", image: staticPath + "palengke_image_9.jpg", alt: "Brush", color: "red", brand: "precy", quantity: 1 },
  { name: "Whisk", price: "₱350.00", image: staticPath + "palengke_image_10.jpg", alt: "Whisk", color: "blue", brand: "precy", quantity: 1 },
  { name: "Drinking Glass", price: "₱350.00", image: staticPath + "palengke_image_11.jpg", alt: "Drinking Glass", color: "green", brand: "other", quantity: 1 },
  { name: "Kawali", price: "₱350.00", image: staticPath + "palengke_image_12.jpg", alt: "Kawali", color: "yellow", brand: "precy", quantity: 1 }
];

const productList = document.getElementById("productList");
const filterPrice = document.getElementById("filter-price");
const filterColor = document.getElementById("filter-color");
const filterBrand = document.getElementById("filter-brand");
const filterName = document.getElementById("filter-name");
const sortSelect = document.getElementById("sort");

// Cart count
let cartCount = 0;

function renderProducts(filteredProducts) {
  productList.innerHTML = "";

  filteredProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.alt}" />
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <p>Color: ${product.color}</p>
      <p>Brand: ${product.brand}</p>
      <label>Quantity: <input type="number" min="1" value="${product.quantity}" id="qty-${index}"></label>
      <button class="btn" id="cart-${index}">Add to Cart</button>
      <div class="rating" id="rating-${index}">
        <span data-star="1">&#9734;</span>
        <span data-star="2">&#9734;</span>
        <span data-star="3">&#9734;</span>
        <span data-star="4">&#9734;</span>
        <span data-star="5">&#9734;</span>
      </div>
      <p>Cart Count: <span id="cart-count">${cartCount}</span></p>
    `;
    productList.appendChild(card);

    // Add to Cart button functionality
    document.getElementById(`cart-${index}`).addEventListener("click", () => {
      const qty = document.getElementById(`qty-${index}`).value;
      cartCount += parseInt(qty);
      document.getElementById("cart-count").textContent = cartCount;
      alert(`${product.name} added to cart (${qty})`);
    });

    // Rating functionality
    const ratingStars = document.getElementById(`rating-${index}`).querySelectorAll("span");
    ratingStars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-star"));
        ratingStars.forEach(s => s.innerHTML = s.getAttribute("data-star") <= rating ? "★" : "☆");
        alert(`You rated ${product.name} ${rating} star(s)!`);
      });
    });
  });
}

function filterAndSortProducts() {
  let filtered = [...products];

  // Price filter
  const priceValue = filterPrice.value;
  filtered = filtered.filter(p => {
    const priceNum = Number(p.price.replace(/₱|,/g, ""));
    if (priceValue === "under200") return priceNum < 200;
    if (priceValue === "200to350") return priceNum >= 200 && priceNum <= 350;
    if (priceValue === "above350") return priceNum > 350;
    return true;
  });

  // Color filter
  const colorValue = filterColor.value;
  if (colorValue !== "all") filtered = filtered.filter(p => p.color === colorValue);

  // Brand filter
  const brandValue = filterBrand.value;
  if (brandValue !== "all") filtered = filtered.filter(p => p.brand === brandValue);

  // Name search
  const nameValue = filterName.value.toLowerCase();
  if (nameValue) filtered = filtered.filter(p => p.name.toLowerCase().includes(nameValue));

  // Sort
  const sortValue = sortSelect.value;
  if (sortValue === "price-asc") filtered.sort((a,b) => Number(a.price.replace(/₱|,/g,"")) - Number(b.price.replace(/₱|,/g,"")));
  else if (sortValue === "price-desc") filtered.sort((a,b) => Number(b.price.replace(/₱|,/g,"")) - Number(a.price.replace(/₱|,/g,"")));
  else if (sortValue === "name-asc") filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (sortValue === "name-desc") filtered.sort((a,b) => b.name.localeCompare(a.name));

  renderProducts(filtered);
}

// Event listeners
filterPrice.addEventListener("change", filterAndSortProducts);
filterColor.addEventListener("change", filterAndSortProducts);
filterBrand.addEventListener("change", filterAndSortProducts);
filterName.addEventListener("input", filterAndSortProducts);
sortSelect.addEventListener("change", filterAndSortProducts);

// Initial render
renderProducts(products);

//script for contact page
 function handleRedirect(event) {
    event.preventDefault();

    const platform = document.getElementById("platform").value;
    if (!platform) {
      alert("Please select a platform.");
      return;
    }

    if (platform === "email") {
      window.location.href = emailMockupUrl;
    } else {
      window.location.href = `${socialMockupBaseUrl}?platform=${platform}`;
    }
  }

  //WILL FETCH AND RENDER DATA's API
  fetch('/api/customers/')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('customer-list');
    data.forEach(customer => {
      container.innerHTML += `
        <div>
          <strong>${customer.name}</strong><br>
          Email: ${customer.email}<br>
          Contact: ${customer.contact_number}<br>
          Location: ${customer.location}<br><br>
        </div>
      `;
    });
  });
  
  //WILL FETCH AND RENDER DATA's API
  fetch('/api/messages/')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('message-list');
    data.forEach(msg => {
      container.innerHTML += `
        <div>
          <strong>${msg.name}</strong> (${msg.email})<br>
          Message: ${msg.message}<br>
          Sent: ${new Date(msg.date_sent).toLocaleString()}<br><br>
        </div>
      `;
    });
  });