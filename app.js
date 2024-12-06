const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmY2MDkzYjgyYzVmODQ5MDY5NzgyNDRkOGFlYjNkMCIsIm5iZiI6MTczMzE1ODkwOS43NTEwMDAyLCJzdWIiOiI2NzRkZTdmZDdjMWQ2OThiN2RmODA0Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NipOyBwjc6kucT7YFbOB3NfKJCAZnIHpeLBhcFM3lfc",
  },
};

function fetchTrendingMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    // .then((res) => console.log(res.results))
    .then((res) => displayMovies(res.results))
    .catch((err) => console.error(err));
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;

    movieCard.addEventListener("click", () => openModal(movie));

    function openModal(movie) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
      <div class="modal-container">
       <div class=modal-img>
         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
       </div>
       <div class="modal-text">
         <h2>${movie.title}</h2>
         <p>${movie.overview}</p>
       </div>
      </div>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }
    moviesContainer.appendChild(movieCard);
  });
}

function fetchTrendingTVShows() {
  fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
    .then((res) => res.json())
    .then((res) => displayTVShows(res.results))
    .catch((err) => console.error(err));
}

function displayTVShows(tvShows) {
  const tvShowsContainer = document.getElementById("tv-shows");
  tvShowsContainer.innerHTML = "";
  tvShows.forEach((show) => {
    const tvShowCard = document.createElement("div");
    tvShowCard.className = "tv-show-card";

    tvShowCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
        <h3>${show.name}</h3> 
      `;

    tvShowCard.addEventListener("click", () => openModal(show));

    function openModal(show) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
      <div class="modal-container">
       <div class="modal-img">
         <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
       </div>
       <div class="modal-text">
         <h2>${show.name}</h2>
         <p>${show.overview}</p>
         <p>First Air Date: ${show.first_air_date}</p> 
       </div>
      </div>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }
    tvShowsContainer.appendChild(tvShowCard);
  });
}

// function fetchMoviesVideos() {
//   fetch(
//     "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US",
//     options
//   )
//     .then((res) => res.json())
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err));
// }

document.getElementById("search-bar").addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const movies = document.querySelectorAll(".movie-card");

  movies.forEach((movie) => {
    const title = movie.querySelector("h3").textContent.toLowerCase();
    movie.style.display = title.includes(searchQuery) ? "" : "none";
  });
});

document.getElementById("showtoday").innerHTML = showtoday();
function showtoday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const showtoday = year + "/" + month + "/" + date + " NOW";
  return showtoday;
}

window.addEventListener("load", fetchTrendingMovies);
window.addEventListener("load", fetchTrendingTVShows);
