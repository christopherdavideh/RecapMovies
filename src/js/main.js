const API_KEY = "6e8832acf5095076e0ad8bbeb008ff9e";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_URL_IMAGE_POSTER = "https://image.tmdb.org/t/p/w342";
const BASE_URL_IMAGE_BACKDROP = "https://image.tmdb.org/t/p/w1280";



async function getTrendingMoviesPreview(media_type){
    /*Uso de fetch() para consumo de API Rest */
    const res = await fetch(`${BASE_URL}/trending/${media_type}/day?api_key=${API_KEY}`);
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {
        let nameClass;
        (media_type === "movie") ? nameClass = "movieList" : nameClass = "serieList";
        const movieList = document.querySelector(`#trendingPreview .trendingPreview-${nameClass}`);
        const movie_container = document.createElement("div");
        movie_container.className = "movie-container";

        const movieImg = document.createElement("img");
        movieImg.className = "movie-img";
        if (movie.media_type === "movie") {
            movieImg.alt = movie.title;
        } else if(movie.media_type === "tv") {
            movieImg.alt = movie.name;
        }
        movieImg.src = `${BASE_URL_IMAGE_POSTER}${movie.poster_path}`;

        movie_container.appendChild(movieImg);
        movieList.appendChild(movie_container)

        movieList.addEventListener('wheel', (event) => {
            event.preventDefault();
            movieList.scrollBy({
                left: event.deltaY < 0 ? -30 : 30,
            });
        });
    });

    //console.log(data);
    //console.log(movies);
}

async function getCategoryMoviesPreview(media_type){
    /*Uso de fetch() para consumo de API Rest */
    const res = await fetch(`${BASE_URL}/genre/${media_type}/list?api_key=${API_KEY}`);
    const data = await res.json();

    const genres = data.genres;
    genres.forEach(genre => {
        let nameClass;
        (media_type === "movie") ? nameClass = "list" : nameClass = "listTV";
        const categoryList = document.querySelector(`#categoriesPreview .categoriesPreview-${nameClass}`);
        const category_container = document.createElement("div");
        category_container.className = "category-container";
        const categoryH3 = document.createElement("h3");
        categoryH3.className = "category-title";
        categoryH3.textContent = genre.name;
        category_container.appendChild(categoryH3);
        categoryList.appendChild(category_container)

        categoryList.addEventListener('wheel', (event) => {
            event.preventDefault();
            categoryList.scrollBy({
                left: event.deltaY < 0 ? -30 : 30,
            });
        });

    });

    console.log(genres);
}

getTrendingMoviesPreview("movie");
getTrendingMoviesPreview("tv");
getCategoryMoviesPreview("movie");
getCategoryMoviesPreview("tv");