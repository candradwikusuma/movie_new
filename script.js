//todo ajax jquery
// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=99646c26&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movie = result.Search;
//       console.log(movie);
//       let cards = "";
//       movie.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);
//todo ketika tombol detail di click
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=99646c26&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetails(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => console.log(e.responseText),
//         });
//       });
//     },
//     error: (e) => console.log(e.responseText),
//   });
// });

//todo fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=99646c26&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//todo details
//       const buttonDetails = document.querySelectorAll(".modal-detail-button");
//       buttonDetails.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           console.log(imdbid);
//           fetch("http://www.omdbapi.com/?apikey=99646c26&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetails(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

//todo refactoring dan async await
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  console.log(movies);
  updateUI(movies);
});

//todo event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetails(imdbid);
    console.log(movieDetail);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetails(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=99646c26&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}
function updateUIDetail(m) {
  const movieDetail = showMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=99646c26&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}
function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}
function showCards(m) {
  return /*html */ `<div class="col-md-4 my-3">
                          <div class="card">
                          <img src="${m.Poster}" class="card-img-top" />
                          <div class="card-body">
                              <h5 class="card-title">${m.Title}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                              <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                          </div>
                          </div>
                      </div>`;
}

function showMovieDetails(m) {
  return /*html */ `<div class="container-fluid">
                  <div class="row">
                  <div class="col-md-3">
                      <img src="${m.Poster}" class="img-fluid">
                  </div>
                  <div class="col-md">
                      <ul class="list-group">
                          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                          <li class="list-group-item"> <strong>Director: </strong>${m.Director}</li>
                          <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                          <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                          <li class="list-group-item"><strong>Plot: </strong>${m.Plot}</li>
                        </ul>
                  </div>
                  </div>
              </div>`;
}
