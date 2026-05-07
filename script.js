const productGrid = document.getElementById("productGrid");
const toast = document.getElementById("toast");
let toastTimeoutId;

const formatPrice = (value) =>
	new Intl.NumberFormat("hu-HU", {
		style: "currency",
		currency: "HUF",
		maximumFractionDigits: 0,
	}).format(value);

function showToast (text, type = "info") {
	if (!toast) return;

	clearTimeout(toastTimeoutId);
	toast.textContent = text;
	toast.classList.toggle("error", type === "error");
	toast.classList.add("show");

	toastTimeoutId = setTimeout(() => {
		toast.classList.remove("show");
	}, 2800);
}

function renderProducts (products) {
	productGrid.innerHTML = "";

	products.forEach((product, index) => {
		const inStock = Number(product.keszlet) > 0;
		const card = document.createElement("article");
		card.className = `card ${inStock ? "" : "out-of-stock"}`;
		card.style.animationDelay = `${index * 90}ms`;

		card.innerHTML = `
      <span class="badge ${inStock ? "in" : "out"}">
        ${inStock ? "Készleten" : "Nincs készleten"}
      </span>
      <img src="${product.kep}" alt="${product.nev}" class="product-image">
      <h2 class="product-name">${product.nev}</h2>
      <div class="price">${formatPrice(product.ar)}</div>
      <div class="stock">Készleten: ${product.keszlet} db</div>
      ${
			inStock
				? `<button class="add-to-cart-button action-btn" type="button">
              <svg class="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
              <svg class="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
              <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span class="add-to-cart">Kosárba</span>
              <span class="added-to-cart">Kosárba helyezve</span>
            </button>`
				: `<button class="action-btn notify" type="button">Értesítést kérek</button>`
		}
    `;

		const button = card.querySelector("button");
		button.addEventListener("click", () => {
			showToast(
				inStock
					? `${product.nev} hozzáadva a kosárhoz.`
					: `${product.nev}: értesítési kérés elküldve.`,
			);
		});

		if (inStock) {
			button.addEventListener("click", () => {
				button.classList.add("added");
				setTimeout(() => {
					button.classList.remove("added");
				}, 2000);
			});
		}

		productGrid.appendChild(card);
	});
}

async function loadProducts () {
	try {
		const response = await fetch("products.php");
		if (!response.ok) {
			throw new Error("A termékek betöltése sikertelen.");
		}
		const products = await response.json();
		renderProducts(products);
	} catch (error) {
		showToast(error.message, "error");
	}
}

document.getElementById("exportXmlBtn").addEventListener("click", () => {
	window.location.href = "export.php";
});

loadProducts();
