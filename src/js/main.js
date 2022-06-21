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

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }
    
    return movies;
}
  
function likeMovie(movie) {
    // movie.id
    const likedMovies = likedMoviesList();

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}



/* Lazy loading*/
let options = (container) => {
    const config = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.3
    }
    return config;
};

//const target = document.querySelector('.movie-img');

const loadImage = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            //console.log("entrada", entry);
            /*entry.target.setAttribute('src', entry.target.dataset.img);
            entry.target.setAttribute('alt', entry.target.dataset.alt);*/
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};
/*--------------------*/



function getMovieData (movies, container, media_type = "", page=1){
    //console.log();
    if (page === 1) {
        container.innerHTML="";
    }
    const observer = new IntersectionObserver(loadImage, options(container));
    //console.log(movies);
    movies.forEach(movie => {
        const movie_container = document.createElement("div");
        movie_container.className = "movie-container";
        const movieImg = document.createElement("img");
        movieImg.className = "movie-img";
        //console.log(movie);
        if (movie.media_type) {
            movieImg.addEventListener('click', () => {
                location.hash=`#movie=${movie.id}-${movie.media_type}`;
            });
            (movie.media_type === "movie") ? movieImg.setAttribute('alt', movie.title) : movieImg.setAttribute('alt', movie.name);
        } else {
            movieImg.addEventListener('click', () => {
                location.hash=`#movie=${movie.id}-${media_type}`;
            });
            (media_type === "movie") ? movieImg.setAttribute('alt', movie.title) : movieImg.setAttribute('alt', movie.name);
        }

        //movieImg.src = `${BASE_URL_IMAGE_POSTER}${movie.poster_path}`;
        //console.log("img", movie.poster_path)
        if (movie.poster_path === null || movie.poster_path === undefined) {
            movieImg.setAttribute('src', `./src/img/default_movie.jpg`);
        } else {
            movieImg.setAttribute('src', `${BASE_URL_IMAGE_POSTER}${movie.poster_path}`);

        }
        movie_container.appendChild(movieImg);
        if (container.className === "genericList-container__div"){
            const card_movie = document.createElement('div');
            card_movie.classList.add('movie-body');
            const card_title = document.createElement('p');
            card_title.classList.add('movie-body-title');
            const favorite = document.createElement("span");
            favorite.classList.add('movie-favorite');
            likedMoviesList()[movie.id] && favorite.classList.add('liked');
            favorite.addEventListener('click', () => {
                favorite.classList.toggle('liked');
                if (location.hash.startsWith("#category=")){
                    const [, url] = location.hash.split("=");
                    const [, , type] = url.split("-");
                    if (!movie.media_type) {
                        movie.media_type = type;
                    }

                }
                likeMovie(movie);
            });
            let release_date;
            let first_air_date;
            (movie.release_date) ? release_date = movie.release_date.slice(0,4) : release_date = "";
            (movie.first_air_date) ? first_air_date = movie.first_air_date.slice(0,4) : first_air_date = "";

            if (movie.media_type) {
                (movie.media_type === "movie")
                    ? card_title.innerHTML = `<b>${movie.title}</b><br><small>${release_date}</small>`
                    : card_title.innerHTML = `<b>${movie.name}</b><br><small>${first_air_date}</small>`;
            } else {
                (media_type === "movie")
                    ? card_title.innerHTML = `<b>${movie.title}</b><br><small>${release_date}</small>`
                    : card_title.innerHTML = `<b>${movie.name}</b><br><small>${first_air_date}</small>`;
            }
            //observer.observe(favorite);
            card_movie.appendChild(card_title);
            card_movie.appendChild(favorite);
            movie_container.appendChild(card_movie);
        }
        observer.observe(movie_container);

        container.appendChild(movie_container);

    });

    /*if (container.className === "genericList-container__div") {
        const movieAppear = document.querySelectorAll('.movie-container .movie-img');
        if(movieAppear.length>= 20 &&  movies.page < movies.total_pages){
            //console.log(movies.total_pages - 1);
            let lastMovie = movieAppear[movieAppear.length-1];
            //console.log(lastMovie);
            paginated.observe(lastMovie);
        }
    }*/
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
            //console.log(location.hash);
            /*if (location.hash.startsWith("#movie=")) {
                location.hash=`#category=${genre.id}-${genre.name}-${media_type}`;
                setTimeout(function(){
                    location.reload();
                }, 100);
            } else {*/
                location.hash=`#category=${genre.id}-${genre.name}-${media_type}`;
            //}
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
    const { data } = await api(`/trending/${media_type}/day`, {
        params: {
            language: languageApi,
        }
    });

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
    const res = await fetch(`${BASE_URL}/genre/${media_type}/list?api_key=${API_KEY}&language=${languageApi}`);
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

async function getMoviesByCategory(id, name, media_type, page){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/discover/${media_type}`,{
        params : {
            with_genres: id,
            page: page,
            language: languageApi,
        },
    });

    const movies = data.results;
    maxpage = data.total_pages;
    //console.log(data);
    (media_type === "movie")
        ? headerTitle.textContent = `${media_type[0].toUpperCase() + media_type.substring(1)} - ${name}`
        : headerTitle.textContent = `${media_type.toUpperCase()} - ${name}`;

    getMovieData(movies, genericListContainer, media_type, page);
    //getMovieData(movies, genericListContainer, media_type, data.total_pages);
    //console.log(data, data.total_pages);
}

async function getMoviesByFavorite(){
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);
    getMovieData(moviesArray, genericListContainer);
    //console.log(data, data.total_pages);
}

async function getMoviesBySearch(query, page){
    /*Uso de axios() para consumo de API Rest */
    //console.log(query);
    const { data } = await api(`/search/multi`,{
        params : {
            language: languageApi,
            query: query,
            page: page,
        },
    });

    const movies = data.results;
    maxpage = data.total_pages;
    
    //console.log("search", data);
    headerTitle.textContent = `Results: ${query}`;

    getMovieData(movies, genericListContainer, "", page);
    
}

/*async function getTrendingMovies(media_type){
    //Uso de axios() para consumo de API Rest
    const { data } = await api(`/trending/${media_type}/day`);

    const movies = data.results;
    if (media_type === "movie") {
        getMovieData(movies, genericListContainer);
    } else{
        getMovieData(movies, genericListContainer);
    }

    //console.log(data);
    //console.log(movies);
}*/



async function getTrendingMovies(media_type, page){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    //Uso de axios() para consumo de API Rest 
    const { data } = await api(`/trending/${media_type}/day`, {
        params : {
            page: page,
            language: languageApi,
        }
    });
    const movies = data.results;
    maxpage = data.total_pages;
    //console.log(media_type, data);
    getMovieData(movies, genericListContainer, media_type, page);
}

async function getMoviesById(id, media_type){
    /*Uso de axios() para consumo de API Rest */
    const { data } = await api(`/${media_type}/${id}`, {
        params: {
            language: languageApi,
        }
    });

    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;
    if (data.backdrop_path === null || data.backdrop_path ===undefined) {
        headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 99.27%, rgba(0, 0, 0, 0) 29.17%),
        url("./src/img/default_movie.jpg")
    `;
    } else {
        headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 99.27%, rgba(0, 0, 0, 0) 29.17%),
        url("https://image.tmdb.org/t/p/w1280${data.backdrop_path}")
    `;
    }
    headerSection.style.backgroundSize = "cover";
    headerSection.style.backgroundPosition = "center";
    headerSection.style.backgroundRepeat = "no-repeat";
    const footer = document.querySelector("footer");
    //footer.style.marginTop = "500px"
    getCategoryData(data.genres, movieDetailCategoriesList, media_type, "light")
    headerTitle.textContent = "";
    if (media_type === "movie") {
        headerTitle.textContent = `${data.title}`;
    } else {
        headerTitle.textContent = `${data.name}`;
        //getMovieData(movies.seasons, relatedMoviesContainer, media_type);
    }
    getRelatedMovieById(id, media_type);
}

async function getRelatedMovieById(id, media_type){
    const { data } = await api(`/${media_type}/${id}/similar`,{
        params: {
            language: languageApi
        }
    });
    const movies = data.results;
    getMovieData(movies, relatedMoviesContainer, media_type);
    scrollHorizontal(relatedMoviesContainer);
    smoothscrollY();
}


