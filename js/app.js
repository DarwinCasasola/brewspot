let allShops = [];

document.addEventListener("DOMContentLoaded", () => {
  const shopListContainer = document.getElementById("shop-list");
  const searchInput = document.getElementById("search-input");

  // Fetch and store shops
  fetch("data/shops.json")
    .then((res) => res.json())
    .then((shops) => {
      allShops = shops;
      renderShops(allShops);
    });

  // Real-time search
  searchInput?.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allShops.filter((shop) => {
      return (
        shop.name.toLowerCase().includes(searchTerm) ||
        shop.neighborhood.toLowerCase().includes(searchTerm)
      );
    });
    renderShops(filtered);
  });

  function renderShops(shops) {
    shopListContainer.innerHTML = ""; // clear previous content

    if (shops.length === 0) {
      shopListContainer.innerHTML =
        "<p class='text-muted'>No matching coffee shops found.</p>";
      return;
    }

    shops.forEach((shop) => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100">
          <img src="images/${shop.image}" class="card-img-top" alt="${shop.name}">
          <div class="card-body">
            <h5 class="card-title">${shop.name}</h5>
            <p class="card-text">Rating: ${shop.rating} ⭐</p>
            <p class="card-text">Neighborhood: ${shop.neighborhood}</p>
            <button class="btn btn-outline-success" onclick="addFavorite(${shop.id})">❤️ Favorite</button>
          </div>
        </div>
      `;

      shopListContainer.appendChild(col);
    });
  }
});

function addFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
  }
}
