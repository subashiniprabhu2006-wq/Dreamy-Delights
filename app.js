// CART ARRAY
let cart = [];

const cartBtn = document.querySelector(".cart");
const productCards = document.querySelectorAll(".product-card");

// CREATE CART POPUP CONTAINER
const cartPopup = document.createElement("div");
cartPopup.classList.add("cart-popup");
document.body.appendChild(cartPopup);

// OPEN/CLOSE CART
cartBtn.addEventListener("click", () => {
    cartPopup.classList.toggle("open");
    renderCart();
});

// AUTO ADD CART BUTTON IF MISSING
productCards.forEach((card) => {
    const name = card.querySelector("h3").innerText;
    const price = parseInt(card.querySelector("p").innerText.replace("₹", ""));
    const img = card.querySelector("img").src;

    let btn = card.querySelector(".add-btn");

    btn.addEventListener("click", () => {
        addToCart(name, price, img);
    });
});

// ADD ITEM
function addToCart(name, price, img) {
    let existing = cart.find(item => item.name == name);

    if (existing) {
        return alert("This product already exists in your cart.");
    } else {
        cart.push({ name, price, qty: 1, img });
    }
    renderCart();
    updateCartBadge();
    saveCart();

}

//Creating a badge for cart

const cartBadge = document.createElement("span");
cartBadge.className = "cart-badge";
cartBadge.textContent = "0";     // start at zero
cartBtn.style.position = "relative"; // ensure badge can be positioned on top
cartBtn.appendChild(cartBadge);
//Updating cart badge
function updateCartBadge() {
    let count = 0;
    cart.forEach(item => count += item.qty);  // total quantity of all items

    if (count > 0) {
        cartBadge.style.display = "inline-block";
        cartBadge.textContent = count;
    } else {
        cartBadge.style.display = "none";
    }
}


// RENDER CART USING DOM
function renderCart() {
    cartPopup.innerHTML = "";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-cart-btn";
    closeBtn.textContent = "✖";
    closeBtn.onclick = () => cartPopup.classList.remove("open");
    cartPopup.appendChild(closeBtn);

    // Title
    const title = document.createElement("h2");
    title.textContent = "Your Cart";
    cartPopup.appendChild(title);

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.qty * item.price;
        total += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        const imgEl = document.createElement("img");
        imgEl.className = "cart-img";
        imgEl.src = item.img;
        itemDiv.appendChild(imgEl);

        const info = document.createElement("div");
        info.className = "cart-info";
        
        const nameEl = document.createElement("strong");
        nameEl.textContent = item.name;
        info.appendChild(nameEl);

        const priceQty = document.createElement("p");
        priceQty.textContent = "₹" + item.price + " × " + item.qty;
        info.appendChild(priceQty);

        const sub = document.createElement("p");
        sub.innerHTML = "Subtotal: <b>₹" + subtotal + "</b>";
        info.appendChild(sub);

        itemDiv.appendChild(info);

        const controls = document.createElement("div");
        controls.className = "cart-controls";

        const minusBtn = document.createElement("button");
        minusBtn.className = "qty-btn";
        minusBtn.textContent = "−";
        minusBtn.onclick = () => changeQty(index, -1);
        controls.appendChild(minusBtn);

        const plusBtn = document.createElement("button");
        plusBtn.className = "qty-btn";
        plusBtn.textContent = "+";
        plusBtn.onclick = () => changeQty(index, 1);
        controls.appendChild(plusBtn);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "🗑";
        removeBtn.onclick = () => removeItem(index);
        controls.appendChild(removeBtn);

        itemDiv.appendChild(controls);
        cartPopup.appendChild(itemDiv);
    });

    const footer = document.createElement("div");
    footer.className = "cart-footer";
    footer.innerHTML = "Total: <b>₹" + total + "</b>";
    cartPopup.appendChild(footer);
}

// CHANGE QUANTITY
function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
        removeItem(index);
        return;
    }

    renderCart();
    updateCartBadge();
    saveCart();

}

// REMOVE ITEM
function removeItem(index) {
    const confirmDelete = confirm(
        'Remove "' + cart[index].name + '" from cart?'
    );

    if (confirmDelete) {
        cart.splice(index, 1);
        renderCart();
        updateCartBadge();
        saveCart();
    }
}


//Local Storage
function saveCart() {
    localStorage.setItem("myCart", JSON.stringify(cart));
}
function loadCart() {
    const storedCart = localStorage.getItem("myCart");

    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart();
        updateCartBadge();

    }
}
loadCart();
const overlay = document.getElementById("overlay");
const loginPopup = document.getElementById("loginPopup");
const signupPopup = document.getElementById("signupPopup");

/* Open Popup (Login or Signup) */
function openPopup(id) {
    overlay.classList.add("show");
    document.getElementById(id).classList.add("show");
}

/* Close all popups */
function closePopup() {
    overlay.classList.remove("show");
    loginPopup.classList.remove("show");
    signupPopup.classList.remove("show");
}

/* Switch Between Login <-> Signup */
function switchPopup(id) {
    loginPopup.classList.remove("show");
    signupPopup.classList.remove("show");
    document.getElementById(id).classList.add("show");
}

/* Password toggle */
function togglePassword(inputId, icon) {
    const field = document.getElementById(inputId);

    if (field.type === "password") {
        field.type = "text";
        icon.textContent = "🙈";
    } else {
        field.type = "password";
        icon.textContent = "👁️";
    }
}
