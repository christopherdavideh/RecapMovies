const API_KEY = "6e8832acf5095076e0ad8bbeb008ff9e";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_URL_IMAGE_POSTER = "https://image.tmdb.org/t/p/w342";
const BASE_URL_IMAGE_BACKDROP = "https://image.tmdb.org/t/p/w1280";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'aplication/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

function getMovieData (movies, container, media_type = ""){
    //console.log(media_type);
    container.innerHTML="";
    movies.forEach(movie => {
        const movie_container = document.createElement("div");
        movie_container.className = "movie-container";
        const movieImg = document.createElement("img");
        if (movie.media_type) {
            movie_container.addEventListener('click', () => {
                location.hash=`#movie=${movie.id}-${movie.media_type}`;
            });
            movieImg.className = "movie-img";
            (movie.media_type === "movie") ? movieImg.alt = movie.title : movieImg.alt = movie.name;
        } else {
            movie_container.addEventListener('click', () => {
                location.hash=`#movie=${movie.id}-${media_type}`;
            });
            movieImg.className = "movie-img";
            (media_type === "movie") ? movieImg.alt = movie.title : movieImg.alt = movie.name;
        }

        movieImg.src = `${BASE_URL_IMAGE_POSTER}${movie.poster_path}`;

        movie_container.appendChild(movieImg);
        container.appendChild(movie_container);
    });
}

function getCategoryData (genres, container, media_type, light){
    //console.log(media_type);
    container.innerHTML="";
    genres.forEach(genre => {
        const category_container = document.createElement("div");
        category_container.className = "category-container";
        category_container.classList.add(light);
        const categoryH3 = document.createElement("h3");
        categoryH3.className = "category-title";
        categoryH3.textContent = genre.name;
        category_container.appendChild(categoryH3);
        category_container.addEventListener('click', () => {
            location.hash=`#category=${genre.id}-${genre.name}-${media_type}`;
        });
        container.appendChild(category_container)
    });
}

function scrollHorizontal(container){
    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    });
}

async function getTrendingMoviesPreview(media_type){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/trending/${media_type}/day`);

    const movies = data.results;
    if (media_type === "movie") {
        getMovieData(movies, trendingMoviesPreviewList);
        scrollHorizontal(trendingMoviesPreviewList);
    } else{
        getMovieData(movies, trendingTvPreviewList);
        scrollHorizontal(trendingTvPreviewList);
    }

    //console.log(data);
    //console.log(movies);
}

async function getCategoryMoviesPreview(media_type){
    /*Uso de fetch() para consumo de API Rest */
    const res = await fetch(`${BASE_URL}/genre/${media_type}/list?api_key=${API_KEY}`);
    const data = await res.json();

    const genres = data.genres;
    if (media_type === "movie"){
        getCategoryData(genres, categoriesPreviewList, media_type);
        scrollHorizontal(categoriesPreviewList);
    } else {
        getCategoryData(genres, categoriesPreviewListTV, media_type);
        scrollHorizontal(categoriesPreviewListTV);
    }
    // console.log(genres);
}

async function getMoviesByCategory(id, name, media_type){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/discover/${media_type}`,{
        params : {
            with_genres: id,
        },
    });

    const movies = data.results;
    (media_type === "movie")
        ? headerTitle.textContent = `${media_type[0].toUpperCase() + media_type.substring(1)} - ${name}`
        : headerTitle.textContent = `${media_type.toUpperCase()} - ${name}`;

    getMovieData(movies, genericListContainer, media_type);
    console.log(movies);
}

async function getMoviesBySearch(query){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/search/multi`,{
        params : {
            query: query,
        },
    });

    const movies = data.results;
    headerTitle.textContent = `Results: ${query}`;

    getMovieData(movies, genericListContainer);
    
}

async function getTrendingMovies(media_type){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/trending/${media_type}/day`);

    const movies = data.results;
    if (media_type === "movie") {
        getMovieData(movies, genericListContainer);
    } else{
        getMovieData(movies, genericListContainer);
    }

    //console.log(data);
    //console.log(movies);
}

async function getMoviesById(id, media_type){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/${media_type}/${id}`);

    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;
    headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 99.27%, rgba(0, 0, 0, 0) 29.17%),
        url("https://image.tmdb.org/t/p/w1280${data.backdrop_path}")
    `;
    headerSection.style.backgroundSize = "cover";
    headerSection.style.backgroundPosition = "center";
    headerSection.style.backgroundRepeat = "no-repeat";
    const footer = document.querySelector("footer");
    //footer.style.marginTop = "500px"
    getCategoryData(data.genres, movieDetailCategoriesList, media_type, "light")
    if (media_type === "movie") {
        headerTitle.textContent = `${data.title}`;
    } else {
        headerTitle.textContent = `${data.name}`;
        //getMovieData(data.seasons, relatedMoviesContainer, media_type);
    }
    getRelatedMovieById(id, media_type);
}

async function getRelatedMovieById(id, media_type){
    const { data } = await api(`/${media_type}/${id}/similar`);
    const movies = data.results;
    getMovieData(movies, relatedMoviesContainer, media_type);
    scrollHorizontal(relatedMoviesContainer);
    smoothscrollY();
}

