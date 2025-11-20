let cart = [];

// Ajouter un item au panier
function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCartCount();
    renderCartItems();
}

// Met à jour le compteur du bouton flottant
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cart-count").innerText = count;
}

// Ouvre le bottom sheet
function openCart() {
    document.getElementById("cart-sheet").style.bottom = "0";
    renderCartItems();
}

// Ferme le bottom sheet
function closeCart() {
    document.getElementById("cart-sheet").style.bottom = "-100%";
}

// Affiche les items dans le panier
function renderCartItems() {
    let container = document.getElementById("cart-items");
    container.innerHTML = "";

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span style="font-weight:600; max-width:40%">${item.name}</span>

            <div class="qty-controls">
                <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="increaseQty(${index})">+</button>
            </div>

            <span>${item.price * item.qty} FCFA</span>
        `;

        container.appendChild(div);
    });

    updateTotal();
}

// Augmente quantité
function increaseQty(index) {
    cart[index].qty++;
    updateCartCount();
    renderCartItems();
}

// Diminue quantité
function decreaseQty(index) {
    cart[index].qty--;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCartCount();
    renderCartItems();
}

// Met à jour le total
function updateTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById("cart-total").innerText = total.toLocaleString();
}

// Envoi WhatsApp
function sendWhatsapp() {
    if (cart.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    let message = "Bonjour, je souhaiterais commander :\n\n";

    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} — ${item.price * item.qty} FCFA\n`;
    });

    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    message += `\nTotal : ${total.toLocaleString()} FCFA\n\nMerci !`;

    const phone = "2250716699999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.location.href = url;
}
