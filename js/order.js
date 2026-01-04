    let cart = {}; 

    function addToCart(name, price) {
        if (cart[name]) {
            cart[name].qty += 1;
        } else {
            cart[name] = { price: price, qty: 1 };
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const itemsContainer = document.getElementById('cart-items-container');
        const countBadge = document.getElementById('sticky-cart-count');
        const totalPriceEl = document.getElementById('cart-total-price');
        
        let html = "";
        let total = 0;
        let count = 0;

        for (let name in cart) {
            let itemTotal = cart[name].price * cart[name].qty;
            total += itemTotal;
            count += cart[name].qty;
            html += `
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    <div>
                        <span class="fw-bold">${name}</span> <br>
                        <small class="text-muted">₹${cart[name].price} x ${cart[name].qty}</small>
                    </div>
                    <span class="fw-bold text-orange">₹${itemTotal}</span>
                </div>
            `;
        }

        if (count === 0) {
            itemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty!</p>';
        } else {
            itemsContainer.innerHTML = html;
        }

        countBadge.innerText = count;
        totalPriceEl.innerText = "₹" + total;
    }

    function sendWhatsApp() {
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const dist = document.getElementById('cust-district').value;
        const addr = document.getElementById('cust-address').value;
        const pin = document.getElementById('cust-pincode').value;

        if (!name || !phone || !addr || Object.keys(cart).length === 0) {
            alert("Please add items and fill all details!");
            return;
        }

        let orderList = "";
        let grandTotal = 0;
        for (let name in cart) {
            let sub = cart[name].price * cart[name].qty;
            grandTotal += sub;
            orderList += `• ${name} (x${cart[name].qty}) - ₹${sub}%0A`;
        }

        const msg = `*NEW ORDER - HYPERGADGET*%0A---------------------------%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*District:* ${dist}%0A*Address:* ${addr}%0A*Pincode:* ${pin}%0A---------------------------%0A*Items:*%0A${orderList}%0A*Total: ₹${grandTotal}*`;
        
        window.open(`https://wa.me/919876543210?text=${msg}`);
    }

