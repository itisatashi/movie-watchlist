const results = document.getElementById("results");

function displayMovies() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.length === 0) {
        results.innerHTML = `
            <div class="empty-watchlist">
            <p class="empty-message">Your watchlist is looking a little empty...</p>
            <a href="index.html">
                <p class="add-movies">
                <img class="watchlist-icon" src="watchlist-icon.png" alt="Watchlist Icon">
                Let’s add some movies!
                </p>
            </a>
            </div>
        `;
        return;
    }

    results.innerHTML = "";
    watchlist.forEach((movieData) => {
        const movie = document.createElement("div");
        movie.classList.add("movie");

        movie.innerHTML = `
            <div class="movie-poster">
                 <img class="poster-pic" src="${movieData.Poster}" alt="${movieData.Title}" />
            </div>
            <div class="movie-info">
                <h3 class="movie-title">
                    ${movieData.Title}
                     <span class="movie-rating">
                        <img class="star-icon" src="rating-icon.png" alt="star icon"/>
                             ${movieData.imdbRating}
                    </span>
                </h3>
                <div class="movie-details">
                    <span class="movie-duration">${movieData.Runtime}</span>
                    <span class="movie-genre">${movieData.Genre}</span>
                    <span class="watchlist-action" onclick="removeFromWatchlist('${movieData.Title}')">
                        <img class="watchlist-icon" src="remove-icon.png" alt="Remove"/>
                        Remove
                    </span>
                </div>
                <p class="movie-description">
                    ${movieData.Plot}
                </p>
            </div>
        `;
        results.appendChild(movie);
    });
}

function removeFromWatchlist(title) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter((movie) => movie.Title !== title);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayMovies();
}

displayMovies();
