document.addEventListener("DOMContentLoaded", function () {

  // ✅ CORS-safe Googleusercontent URL
  const SCRIPT_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjthrF4iEhePTF8961yuS23gPT1GuA4X4bjp3d_SIUT8HwtYPRF34jmcYl41Vnhr3Fm__XYwTOSpapO9HCZMx5WHAknwow2Xk1B9HlB4YvIXXReEudyt8S2PS1dlGjk5dNRc5Gzcwk9alza-OmwZExY19Ys25ePxVPJ2EIwBt9cdgL4VY-D5TVCNtTyrmjjxJFsCLZsLSNpHRiVLV9w012i9Pr-lqzYDpJQiQOAQTyiSyhtN9YhfRkzHSiFLFpQbUJJ3VFeG12VNYP7-OamaN1Mp-Qx7A&lib=MfbmalgOekqf1r-n0dWNBbGnEVNxM5_rR";

  fetch(SCRIPT_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (products) {

      console.log("Products from API:", products);

      var html = "";

     products.forEach(function (p) {

  var img = p.image ? p.image.split(",")[0] : "";

  html +=
    '<div class="col-md-4 mb-4">' +
      '<div class="card product-card h-100">' +
        '<img src="' + img + '" class="card-img-top" alt="' + p.name + '">' +
        '<div class="card-body text-center">' +
          '<h5>' + p.name + '</h5>' +
          '<p class="text-muted">' + p.description + '</p>' +
          '<p class="fw-bold">₹' + p.price + '</p>' +
          '<button class="btn btn-warning w-100" ' +
          'onclick="window.location.href=\'order.html?pid=' + p.id + '\'">' +
          'Order Now' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
});


      document.getElementById("productList").innerHTML = html;
    })
    .catch(function (err) {
      console.error("Fetch error:", err);
      document.getElementById("productList").innerHTML =
        "<p class='text-danger text-center'>Failed to load products</p>";
    });

});

