
 let products = [];

const productList = document.getElementById("productList");
const filterPrice = document.getElementById("filter-price");
const filterColor = document.getElementById("filter-color");
const filterBrand = document.getElementById("filter-brand");
const filterName = document.getElementById("filter-name");
const sortSelect = document.getElementById("sort");

let cartCount = 0;

// Fetch products from API
function fetchProductsFromAPI(query = '') {
  fetch(`/api/products/?search=${query}`)
    .then(res => res.json())
    .then(data => {
      // Format price and image if needed
      products = data.map(p => ({
        ...p,
        price: `₱${parseFloat(p.price).toFixed(2)}`,
        image: p.image || staticPath + "default.jpg", // fallback image
        alt: p.alt || p.name,
        quantity: p.quantity || 1
      }));
      filterAndSortProducts();
    });
}

// Render products
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

    // Cart logic
    document.getElementById(`cart-${index}`).addEventListener("click", () => {
      const qty = document.getElementById(`qty-${index}`).value;
      cartCount += parseInt(qty);
      document.getElementById("cart-count").textContent = cartCount;
      alert(`${product.name} added to cart (${qty})`);
    });

    // Rating logic
    const ratingStars = document.getElementById(`rating-${index}`).querySelectorAll("span");
    ratingStars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-star"));
        ratingStars.forEach(s => {
          s.innerHTML = s.getAttribute("data-star") <= rating ? "★" : "☆";
        });
        alert(`You rated ${product.name} ${rating} star(s)!`);
      });
    });
  });
}

// Filter and sort logic
function filterAndSortProducts() {
  let filtered = [...products];

  const priceValue = filterPrice.value;
  filtered = filtered.filter(p => {
    const priceNum = Number(p.price.replace(/₱|,/g, ""));
    if (priceValue === "under200") return priceNum < 200;
    if (priceValue === "200to350") return priceNum >= 200 && priceNum <= 350;
    if (priceValue === "above350") return priceNum > 350;
    return true;
  });

  const colorValue = filterColor.value;
  if (colorValue !== "all") filtered = filtered.filter(p => p.color.toLowerCase() === colorValue);

  const brandValue = filterBrand.value;
  if (brandValue !== "all") filtered = filtered.filter(p => p.brand === brandValue);

  const nameValue = filterName.value.toLowerCase();
  if (nameValue) filtered = filtered.filter(p => p.name.toLowerCase().includes(nameValue));

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
filterName.addEventListener("input", () => fetchProductsFromAPI(filterName.value));
sortSelect.addEventListener("change", filterAndSortProducts);
// ✅ Initial product load
fetchProductsFromAPI();

// ✅ Contact form submission: save data + redirect
function handleRedirect(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const contact = document.getElementById("contact-number").value;
  const location = document.getElementById("contact-location")?.value || "";
  const message = document.getElementById("contact-message").value; // ✅ capture message
  const platform = document.getElementById("platform").value;

  if (!platform) {
    alert("Please select a platform.");
    return;
  }

  // Save contact info + message to backend
  fetch('/api/submit-contact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, contact, location, message }) // ✅ include message
  })
  .then(res => res.json())
  .then(data => {
    console.log("Contact saved:", data.message);
    // Redirect after saving
    window.location.href = platform === "email"
      ? emailMockupUrl
      : `${socialMockupBaseUrl}?platform=${platform}`;
  })
  .catch(error => {
    console.error("Error saving contact:", error);
    alert("Something went wrong while saving your contact info.");
  });
}

// ✅ Customer list display (only if element exists)
if (document.getElementById('customer-list')) {
  fetch('/api/customer/')
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
    })
    .catch(error => console.error('Error fetching customers:', error));
}

// ✅ Customer messages display (only if element exists)
if (document.getElementById('message-list')) {
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
    })
    .catch(error => console.error('Error fetching messages:', error));
}
