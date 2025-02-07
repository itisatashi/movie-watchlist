// http://www.omdbapi.com/?apikey=247cc408&t=Avatar
// http://www.omdbapi.com/?i=tt3896198&apikey=247cc408

const searchButton = document.getElementById("search-button");
const results = document.getElementById("results");

searchButton.addEventListener("click", function () {
    const searchInput = document
        .getElementById("search-input")
        .value.toLowerCase();

    fetch(`http://www.omdbapi.com/?s=${searchInput}&type=movie&apikey=247cc408`)
        .then((res) => res.json())
        .then((data) => {
            if (data.Response === "True") {
                results.innerHTML = "";
                data.Search.forEach((movie) => {
                    render(movie.Title);
                });
            } else {
                results.innerHTML = "";
                const warning = document.createElement("p");
                warning.textContent =
                    "Unable to find what you’re looking for. Please try another search.";
                warning.classList.add("warning");

                results.appendChild(warning);
            }
        });
});

function render(movieName) {
    fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=247cc408`)
        .then((res) => res.json())
        .then((data) => {
            const movie = document.createElement("div");
            movie.classList.add("movie");
            results.appendChild(movie);

            let listMovies = "";

            listMovies += `
            <div class="movie-poster">
                 <img class="poster-pic" src="${data.Poster}" alt="" />
            </div>
            <div class="movie-info">
                <h3 class="movie-title">
                    ${data.Title}
                     <span class="movie-rating">
                        <img
                            class="star-icon"
                            src="rating-icon.png"
                            alt=""
                        />
                             ${data.imdbRating}
                    </span>
                </h3>
                <div class="movie-details">
                    <span class="movie-duration">${data.Runtime}</span>
                    <span class="movie-genre"
                    >${data.Genre}</span
                    >
                    <span class="watchlist-action">
                        <img
                            class="watchlist-icon"
                            src="watchlist-icon.png"
                            alt=""
                        />
                            Watchlist
                    </span>
                </div>
                <p class="movie-description">
                    ${data.Plot}
                </p>
            </div>
            `;

            movie.innerHTML = listMovies;
            movie
                .querySelector(".watchlist-action")
                .addEventListener("click", function () {
                    const movieObj = {
                        Title: data.Title,
                        Poster: data.Poster,
                        imdbRating: data.imdbRating,
                        Runtime: data.Runtime,
                        Genre: data.Genre,
                        Plot: data.Plot,
                    };

                    saveToWatchlist(movieObj);
                });
        });
}

function saveToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const isMovieInWatchlist = watchlist.some(
        (item) => item.Title === movie.Title
    );
    if (!isMovieInWatchlist) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else alert(`This "${movie.Title}" is already in the list!`);
}
