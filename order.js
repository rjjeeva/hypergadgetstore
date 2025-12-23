document.addEventListener("DOMContentLoaded", function () {

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwbdyhlUXx8CK9H_X3A9jrpgidktEgU9m2pNuMNsmxO1A4qHvpFOiiumn4Tl4D-e1eB/exec";

  const pid = new URLSearchParams(window.location.search).get("pid");
  document.getElementById("productId").value = pid;

  const orderForm  = document.getElementById("orderForm");
  const paymentBox = document.getElementById("paymentBox");
  const paidBtn    = document.getElementById("paidBtn");

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

const orderId = "ORD" + Date.now();

const data = {
  orderId: orderId,
  productId: pid,
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  phone: document.getElementById("phone").value,
  address: document.getElementById("address").value,
  district: document.getElementById("district").value,
  taluk: document.getElementById("taluk").value,
  post: document.getElementById("post").value,
  pincode: document.getElementById("pincode").value,
  status: "PENDING"
};

// save orderId for paid click
localStorage.setItem("orderId", orderId);


    fetch(SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(res => {
      console.log("Server:", res);

    if (res === "ORDER_SAVED" || res === "SUCCESS") {
  orderForm.classList.add("d-none");
  paymentBox.classList.remove("d-none");

  // optional – smooth scroll
  paymentBox.scrollIntoView({ behavior: "smooth" });
}

    })
    .catch(err => console.error(err));
  });

paidBtn.addEventListener("click", function () {

  const orderId = localStorage.getItem("orderId");
  if (!orderId) {
    alert("Order ID not found");
    return;
  }

  fetch(SCRIPT_URL, {
    method: "POST",
    body: new URLSearchParams({
      orderId: orderId,
      status: "PAID"
    })
  })
  .then(res => res.text())
  .then(res => {
    console.log("PAID response:", res);

    if (res === "ORDER_UPDATED") {
      alert("🎉 Thank you! Payment received successfully");
      localStorage.removeItem("orderId");
      window.location.href = "index.html";
    } else {
      alert("Payment update failed");
    }
  })
  .catch(err => console.error(err));
});

});


