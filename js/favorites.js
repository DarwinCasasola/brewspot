document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-list");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = `<p class="text-muted">You haven’t favorited any coffee shops yet.</p>`;
      return;
    }
  
    fetch("data/shops.json")
      .then((res) => res.json())
      .then((shops) => {
        const favoriteShops = shops.filter(shop => favorites.includes(shop.id));
        favoriteShops.forEach(shop => {
          const col = document.createElement("div");
          col.className = "col-md-4";
  
          col.innerHTML = `
            <div class="card h-100">
              <img src="images/${shop.image}" class="card-img-top" alt="${shop.name}">
              <div class="card-body">
                <h5 class="card-title">${shop.name}</h5>
                <p class="card-text">Rating: ${shop.rating} ⭐</p>
                <p class="card-text">Neighborhood: ${shop.neighborhood}</p>
                <button class="btn btn-outline-danger" onclick="removeFavorite(${shop.id})">🗑 Remove</button>
              </div>
            </div>
          `;
  
          favoritesContainer.appendChild(col);
        });
      });
  });
  
  function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload(); // reload to update list
  }
  